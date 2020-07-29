const errorEx = require('error-ex')
const fs = require('fs-extra')

import {Command, flags} from '@oclif/command'

import {generateAppCode} from '../codeGeneration/generateAppCode'
import {insertAddedCode} from '../codeGeneration/insertAddedCode'
import {storeAddedCode} from '../codeGeneration/storeAddedCode'
import {StackInfo} from '../constants/types'
// import {getAppName} from '../inputs/getAppName'
import {isRequired} from '../inputs/isRequired'

export const NoNameError = errorEx('noNameError')

export default class Makecode extends Command {
  static description = 'generates a starter app from a json provided by NoStack'

  static examples = [
    '$ nostack makecode -a ~/temp/myapp -j ~/temp/stack.json -c buyer',
  ]

  static flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    userClass: flags.string({char: 'c', description: 'user class for which to generate an app'}),
    appDir: flags.string({char: 'a', description: 'application directory'}),
    jsonPath: flags.string({char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.'}),
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    // const {args, flags} = this.parse(Makecode)
    const {flags} = this.parse(Makecode)

    const appDir = flags.appDir || isRequired('appDir', 'makecode', 'a')
    const jsonPath = flags.jsonPath || isRequired('jsonPath', 'makecode', '-j')
    let userClass = flags.userClass

    if (!userClass) {
      const stack: StackInfo = await fs.readJSON(jsonPath)
      const userClasses = stack.userClasses
      const userClassNames = Object.keys(userClasses)
      if (userClassNames.length !== 1) {
        const errMessage = `error calling makecode: you did not specify a user class with '--userClass' or '-c'.
        Your options for user classes in the stack of this app are:\n\t\t${userClassNames.join('\n\t\t')}`
        this.log(errMessage)
        throw new Error(errMessage)
      }
      userClass = userClassNames[0]
      // this.log(`userClass has been set to ${userClass}`)
    }

    // store added code before generating new code.
    await storeAddedCode(appDir)

    const generateAppTasks = await generateAppCode(appDir, userClass, jsonPath)
    await generateAppTasks.run().catch((err: any) => {
      console.error(err)
    })

    console.log(`about to insertAddedCode(${appDir})`)
    await insertAddedCode(appDir)
  }
}
