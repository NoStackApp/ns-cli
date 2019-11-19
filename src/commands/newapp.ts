import {Command, flags} from '@oclif/command'

import {createNoStackApp} from '../apps/createNoStackApp'
import {getAppName} from '../inputs/getAppName'
import {isRequired} from '../inputs/isRequired'

// import {createNoStackApp} from '../apps/createNoStackApp'

export default class Newapp extends Command {
  static description = 'create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    appName: flags.string({char: 'a', description: 'name of application'}),
    baseApp: flags.string({char: 'b', description: 'directory of the base app to copy. If it does not exist, it is created.'}),
    // stack: flags.string({char: 'a', description: 'name of stack'}),
    // user: flags.string({char: 'u', description: 'moderator to create'}),
    // email: flags.string({char: 'e', description: 'moderator email'}),
    // password: flags.string({char: 'w', description: 'moderator password'}),

  }

  // static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Newapp)
    const appName = await getAppName(flags.appName) || ''
    const baseApp = flags.baseApp || ''

    const newAppTasks = await createNoStackApp(appName, baseApp)
    await newAppTasks.run().catch((err: any) => {
      console.error(err)
    })
    // shell.exec(`/home/yisrael/projects/ns-cli/bin/create-no-stack-app "${appName}"`)

  }
}
