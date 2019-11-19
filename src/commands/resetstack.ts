import {Command, flags} from '@oclif/command'

import {getUserInfo} from '../auth/getUserInfo'
import {newUserInfo} from '../auth/newUserInfo'
import {UserInfo} from '../constants/types'
import {resetStackCall} from '../stacks/resetStackCall'
import {isRequired} from '../inputs/isRequired'

export default class Resetstack extends Command {
  static description = 'Resets the stack, meaning that the moderator remains and the stack is completely empty.  ' +
    "Essentially returns the status to before 'spinstack'.  WARNING: this is not reversable and will remove EVERYTHING, including your users!!!!"

  static flags = {
    help: flags.help({char: 'h'}),
    stack: flags.string({char: 's', description: 'stack'}),
    user: flags.string({char: 'u', description: 'moderator for stack'}),
  }

  async run() {
    const {flags} = this.parse(Resetstack)
    const user = flags.user || isRequired('user', 'resetstack', '-u')
    const stack = flags.stack || isRequired('stack', 'resetstack', '-s')

    let userInfo: UserInfo = newUserInfo(user)
    userInfo.stack = stack
    // console.log(`in resetstack, userInfo:${JSON.stringify(userInfo)}`)
    userInfo = await getUserInfo(userInfo)
    // console.log(`in resetstack after getUserInfo, userInfo:${JSON.stringify(userInfo)}`)

    const isReset = await resetStackCall(userInfo)

    if (isReset) {
      this.log(`The stack ${stack} has been reset.`)
    }
  }
}
