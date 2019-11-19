import {Command, flags} from '@oclif/command'

import {getUserInfo} from '../auth/getUserInfo'
import {newUserInfo} from '../auth/newUserInfo'
import {UserInfo} from '../constants/types'
import {buildStackFromTemplate} from '../stacks/buildStackFromTemplate'
import {isRequired} from '../inputs/isRequired'

const fs = require('fs-extra') // @ts-ignore

export default class Spinstack extends Command {
  static description = "Spins up a fully functional backend from a provided template.  The same template can then be used to generate front end code using the command 'makeCode'."

  static flags = {
    help: flags.help({char: 'h'}),
    appName: flags.string({char: 'a', description: 'application name'}),
    stack: flags.string({char: 's', description: 'stack'}),
    template: flags.string({char: 't', description: 'template from which to spin up a stack'}),
    // flag with a value (-n, --name=VALUE)
    user: flags.string({char: 'u', description: 'moderator for stack'}),
    email: flags.string({char: 'e', description: 'email to be used by sample users'}),
    addedSuffix: flags.string({char: 'x', description: 'added suffix for sample instances generated'}),
    // flag with no value (-f, --force)
  }

  // static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Spinstack)
    const appName = flags.appName || isRequired('appName', 'spinstack', '-a')
    const user = flags.user || isRequired('user', 'spinstack', '-u')
    const template = flags.template || isRequired('template', 'spinstack', '-t')
    const stack = flags.stack || isRequired('stack', 'spinstack', '-s')
    const email = flags.email || isRequired('email', 'spinstack', '-e')
    const addedSuffix = flags.addedSuffix || ''

    let userInfo: UserInfo = newUserInfo(user)
    userInfo.stack = stack
    // console.log(`in spinstack, userInfo:${JSON.stringify(userInfo)}`)
    userInfo = await getUserInfo(userInfo)
    // console.log(`in spinstack after getUserInfo, userInfo:${JSON.stringify(userInfo)}`)

    const json = await buildStackFromTemplate(template, userInfo, email, addedSuffix)
    // console.log(`JSON TO OUTPUT... ${JSON.stringify(json)}`)

    if (json === undefined) {
      console.log('Try calling that request again.  Your user had to be logged in.')
      return
    }

    await fs.outputJson(`${appName}/stack.json`, JSON.parse(json), (err: any) => {
      if (err) {
        // @ts-ignore`
        throw new Error(`Error writing the stack file ${appName}/stack.json: ${err}`)
      }
    })

    this.log(`The stack ${stack} has been generated.
    The file ${appName}/stack.json contains some information about it.`)

    // this.log(`json produced: ${JSON.stringify(JSON.parse(json), null, 2) }`)
  }
}
