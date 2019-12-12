import {Command, flags} from '@oclif/command'

import {getUserInfo} from '../auth/getUserInfo'
import {newUserInfo} from '../auth/newUserInfo'
import {UserInfo} from '../constants/types'
// import {getAppName} from '../inputs/getAppName'
import {getEmail} from '../inputs/getEmail'
import {getFlowSpec} from '../inputs/getFlowSpec'
// import {getNewModeratorName} from '../inputs/getNewModeratorName'
// import {getNewStackName} from '../inputs/getNewStackName'
import {isRequired} from '../inputs/isRequired'
// import {buildStackFromTemplate} from '../stacks/buildStackFromTemplate'
import {modifyStackFromSpec} from '../stacks/modifyStackFromSpec'

const fs = require('fs-extra') // @ts-ignore

export default class Dataspec extends Command {
  static description = "Spins up a fully functional backend from a provided data spec in yaml format. The stored json can then be used to generate front end code using the command 'makeCode'."

  static examples = [
    '$ nostack dataspec -u franky -s tempstack, -e franky@gmail.com -j ~/temp/stack.json -t appFlow.yaml',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    jsonPath: flags.string({char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.'}),
    stack: flags.string({char: 's', description: 'stack'}),
    template: flags.string({char: 't', description: 'data spec to create or modify a stack'}),
    // flag with a value (-n, --name=VALUE)
    user: flags.string({char: 'u', description: 'moderator for stack'}),
    email: flags.string({char: 'e', description: 'email to be used by sample users'}),
    addedSuffix: flags.string({char: 'x', description: 'added suffix for sample instances generated'}),
    // flag with no value (-f, --force)
  }

  // static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Dataspec)

    const jsonPath = flags.jsonPath || isRequired('json', 'spinstack', '-j')
    const stack = flags.stack || isRequired('stack', 'spinstack', '-s')
    const user = flags.user || isRequired('user', 'spinstack', '-u')

    const flowSpec = await getFlowSpec(flags.template) || ''
    if (!flowSpec) isRequired('flowSpec', 'spinstack', '-t')

    const email = await getEmail(flags.email)
    if (!email) isRequired('email', 'quickstarter', '-e')

    const addedSuffix = flags.addedSuffix || ''

    let userInfo: UserInfo = newUserInfo(user)
    userInfo.stack = stack
    userInfo = await getUserInfo(userInfo)

    const json = await modifyStackFromSpec(flowSpec, userInfo, email, addedSuffix)

    if (json === undefined) {
      console.log('Try calling that request again.  Your user had to be logged in.')
      return
    }

    await fs.outputJson(`${jsonPath}`, JSON.parse(json), (err: any) => {
      if (err) {
        // @ts-ignore`
        throw new Error(`Error writing the stack file ${jsonPath}: ${err}`)
      }
    })

    this.log(`The stack ${stack} has been modified.
    The file ${jsonPath} contains some information about it.`)

    // this.log(`json produced: ${JSON.stringify(JSON.parse(json), null, 2) }`)
  }
}
