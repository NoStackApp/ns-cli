const errorEx = require('error-ex')
const fs = require('fs-extra')

import {Command, flags} from '@oclif/command'

import {generateAppCode} from '../codeGeneration/generateAppCode'
import {StackInfo} from '../constants/types'
import {isRequired} from '../tools/isRequired'

export const noNameError = errorEx('noNameError')

export default class Makecode extends Command {
  static description = 'generates a starter app from a json provided by NoStack'

  static flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    userClass: flags.string({char: 'c', description: 'user class for which to generate an app'}),
    appName: flags.string({char: 'a', description: 'application name'}),
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    // const {args, flags} = this.parse(Makecode)
    const {flags} = this.parse(Makecode)

    // const template = flags.template || ''
    const appName = flags.appName || isRequired('appName', 'makecode', 'a')
    let userClass = flags.userClass

    if (!userClass) {
      const stack: StackInfo = await fs.readJSON(`${appName}/stack.json`)
      const userClasses = stack.userClasses
      const userClassNames = Object.keys(userClasses)
      if (userClassNames.length !== 1) {
        this.log(`error calling makecode: you did not specify a user class with '--userClass' or '-c'.
        Your options for user classes in the stack of this app are:\n\t\t${userClassNames.join('\n\t\t')}`)
        process.exit(1)
      }
      userClass = userClassNames[0]
      // this.log(`userClass has been set to ${userClass}`)
    }
    // this.log(`userClass is ${userClass}`)

    // await generateCodeFiles(appName)  // temp, to debug
    // try {
    // await generateCodeFiles(appName)
    // await generateCodeFiles(appName, userClass)
    // } catch (err) {
    //   console.log(`error when attempting to generate the code: ${err}`)
    //   throw new Error(`code generation error: ${err}`)
    // }
    const generateAppTasks = await generateAppCode(appName, userClass)
    await generateAppTasks.run().catch((err: any) => {
      console.error(err)
    })
  }
}
