import {Command, flags} from '@oclif/command'

import {getUserInfo} from '../auth/getUserInfo'
import {newUserInfo} from '../auth/newUserInfo'
import {UserInfo} from '../constants/types'
import {isRequired} from '../inputs/isRequired'
import {deleteStackAndModerator} from '../stacks/delete-stack-and-moderator'

export default class Deletestack extends Command {
  static description = 'Deletes a moderator and stack.  Must be called by the moderator.'

  static examples = [
    '$ nostack deletestack -u mod -s tempstack',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    stack: flags.string({char: 's', description: 'stack'}),
    user: flags.string({char: 'u', description: 'moderator to delete'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(Deletestack)
    const stack = flags.stack || isRequired('stack', 'deletestack', '-s')
    const user = flags.user || isRequired('user', 'deletestack', '-u')

    let userInfo: UserInfo = newUserInfo(user)
    userInfo.stack = stack
    userInfo = await getUserInfo(userInfo)

    // console.log(`userInfo:${JSON.stringify(userInfo)}`)

    const deleteStackTasks = await deleteStackAndModerator(userInfo)
    await deleteStackTasks.run().catch((err: any) => {
      throw new Error(err)
    })
    console.log(`The stack ${stack} and its moderator ${user} have been deleted.`)
  }
}
