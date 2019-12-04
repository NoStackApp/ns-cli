import {Command, flags} from '@oclif/command'

import {createNoStackApp} from '../apps/createNoStackApp'
import {getAppName} from '../inputs/getAppName'
import {getBaseApp} from '../inputs/getBaseApp'
import {isRequired} from '../inputs/isRequired'

// import {createNoStackApp} from '../apps/createNoStackApp'

export default class Newapp extends Command {
  static description = 'create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.'

  static flags = {
    help: flags.help({char: 'h'}),
    appName: flags.string({char: 'a', description: 'name of application'}),
    baseApp: flags.string({char: 'b', description: 'directory of the base app to copy. If it does not exist, it is created.'}),
  }

  // static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Newapp)
    const appName = await getAppName(flags.appName) || ''
    if (!appName) isRequired('appName', 'newapp', '-a')
    let baseApp = flags.baseApp || ''
    if (baseApp.length > 0) baseApp = await getBaseApp(baseApp)

    const newAppTasks = await createNoStackApp(appName, baseApp)
    await newAppTasks.run().catch((err: any) => {
      console.error(err)
    })
    // shell.exec(`/home/yisrael/projects/ns-cli/bin/create-no-stack-app "${appDir}"`)

  }
}
