import {Command, flags} from '@oclif/command'

import {UserInfo} from '../constants/types'
// import {createModerator} from '../stacks/createModerator'
import {quickStartForModerator} from '../stacks/quickStartForModerator'
import {isRequired} from '../tools/isRequired'

export default class Quickstarter extends Command {
  static description = 'Creates a new moderator and stack.  Also logs in the moderator locally.'

  static examples = [
    '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    stack: flags.string({char: 's', description: 'stack'}),
    licenseId: flags.string({char: 'l', description: 'license id for the organization of the user'}),
    user: flags.string({char: 'u', description: 'moderator to create'}),
    email: flags.string({char: 'e', description: 'moderator email'}),
    password: flags.string({char: 'w', description: 'moderator password'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Quickstarter)
    const stack = flags.stack || isRequired('stack')
    const user = flags.user || isRequired('user')
    const password = flags.password || isRequired('password')
    const email = flags.email || isRequired('email')
    const licenseId = flags.licenseId || isRequired('licenseId')

    let userInfo: UserInfo = {
      name: user,
      stack,
      password,
      email,
      licenseId,
      stackId: '',
      refreshToken: '',
      accessToken: '',
      id: '',
    }

    console.log(`userInfo:${JSON.stringify(userInfo)}`)
    await quickStartForModerator(userInfo)

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
