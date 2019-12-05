import {Command, flags} from '@oclif/command'

import {createNoStackApp} from '../apps/createNoStackApp'
import {generateAppCode} from '../codeGeneration/generateAppCode'
import {UserInfo} from '../constants/types'
import {getAppDir} from '../inputs/getAppDir'
import {getBaseApp} from '../inputs/getBaseApp'
import {getEmail} from '../inputs/getEmail'
import {getFlowSpec} from '../inputs/getFlowSpec'
import {getLicenseId} from '../inputs/getLicenseId'
import {getNewModeratorName} from '../inputs/getNewModeratorName'
import {getPassword} from '../inputs/getPassword'
import {getNewStackName} from '../inputs/getNewStackName'
import {isRequired} from '../inputs/isRequired'
import {buildStackFromTemplate} from '../stacks/buildStackFromTemplate'
import {createStackAndModerator} from '../stacks/create-stack-and-moderator'
import {errorMessage} from '../tools/errorMessage'

const fs = require('fs-extra')
const Listr = require('listr')

export default class Quickstarter extends Command {
  static description = 'Creates a new moderator and stack.  Also logs in the moderator locally.'

  static examples = [
    '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$ -a ~/temp/myapp -b ~/temp/baseApp -j ~/temp/stack.json -t appFlow.txt -l ABC$$123 -c buyer',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    appDir: flags.string({char: 'a', description: 'path and directory of application'}),
    stack: flags.string({char: 's', description: 'stack'}),
    template: flags.string({char: 't', description: 'app flow spec from which to spin up a stack'}),
    licenseId: flags.string({char: 'l', description: 'license id for the organization of the user'}),
    user: flags.string({char: 'u', description: 'moderator to create'}),
    email: flags.string({char: 'e', description: 'moderator email'}),
    password: flags.string({char: 'w', description: 'moderator password'}),
    userClass: flags.string({char: 'c', description: 'userClass for which to generate an app'}),
    jsonPath: flags.string({char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.'}),
    baseApp: flags.string({char: 'b', description: 'path and directory of the base app to copy.'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Quickstarter)

    let baseApp = flags.baseApp || ''
    if (baseApp.length > 0) baseApp = await getBaseApp(baseApp)

    const jsonPath = flags.jsonPath || isRequired('json', 'quickstarter', '-j')

    const email = await getEmail(flags.email)
    if (!email) isRequired('email', 'quickstarter', '-e')

    const stack = await getNewStackName(flags.stack)
    if (!stack) isRequired('stack', 'quickstarter', '-s')

    const user = await getNewModeratorName(flags.user)
    if (!user) isRequired('user', 'quickstarter', '-u')

    const appDir = await getAppDir(flags.appDir) || ''
    if (!appDir) isRequired('appDir', 'quickstarter', '-a')

    const flowSpec = await getFlowSpec(flags.template) || ''
    if (!flowSpec) isRequired('flowSpec', 'quickstarter', '-t')

    const licenseId = await getLicenseId(flags.licenseId)
    if (!licenseId) isRequired('licenseId', 'quickstarter', '-l')

    const password = await getPassword(flags.password)
    if (!password) isRequired('password', 'quickstarter', '-w')

    const userClass = flags.userClass || isRequired('userClass', 'quickstarter', '-c')

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

    // console.log(`userInfo:${JSON.stringify(userInfo)}`)

    const newAppTasks = await createNoStackApp(appDir, baseApp)
    const newStackTasks = await createStackAndModerator(userInfo)
    const generateAppTasks = await generateAppCode(appDir, userClass, jsonPath)

    // @ts-ignore
    const tasks = new Listr([
      {
        title: 'Create a Base NoStack App',
        task: async () => newAppTasks
      },
      {
        title: 'Create an Empty Stack',
        task: async () => newStackTasks
      },
      {
        title: 'Build Stack from Template',
        task: async () => {
          // const json = await buildStackFromTemplate_1.buildStackFromTemplate(template, userInfo, email, addedSuffix);
          // await fs.outputJson(`${appDir}/stack.json`, JSON.parse(json), (err) => {
          //   if (err) {
          //     // @ts-ignore
          //     throw new Error(console.error(err));
          //   }
          // });
          //
          const json = await buildStackFromTemplate(flowSpec, userInfo, email, '')
          await fs.outputJson(jsonPath, JSON.parse(json))

          const isStackFile = await fs.pathExists(jsonPath)

          if (!isStackFile) {
            throw new Error(errorMessage('stack file was not generated on the front end.'))
          }

        }
      },
      {
        title: 'Generate Front End Code',
        task: async () => generateAppTasks,
      },
      // const json = await buildStackFromTemplate(template, userInfo, email, addedSuffix)
    ])

    await tasks.run().catch((err: any) => {
      console.error(err)
    })

    if (args.file) {
      this.log(`you input --file: ${args.file}`)
    }
  }
}
