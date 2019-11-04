const errorEx = require('error-ex')

import {Command, flags} from '@oclif/command'

import {generateAppCode, generateCodeFiles} from '../codeGeneration/generateAppCode'

export const noNameError = errorEx('noNameError')

export default class Makecode extends Command {
  static description = 'generates a starter app from a json provided by NoStack'

  static flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    appName: flags.string({char: 'a', description: 'application name'}),
    help: flags.help({char: 'h'}),
    force: flags.boolean({char: 'f'}),
  }

  static args = []

  async run() {
    // const {args, flags} = this.parse(Makecode)
    const {flags} = this.parse(Makecode)

    // const template = flags.template || ''
    const appName = flags.appName || ''

    if (appName === '') {
      this.log("no application name provided.  You must specify an app name with the flag '-a' or '-appName'")
      return
    }

    // await generateCodeFiles(appName)  // temp, to debug
    // try {
    await generateCodeFiles(appName)
    // } catch (err) {
    //   console.log(`error when attempting to generate the code: ${err}`)
    //   throw new Error(`code generation error: ${err}`)
    // }
    const generateAppTasks = await generateAppCode(appName)
    await generateAppTasks.run().catch((err: any) => {
      console.error(err)
    })
  }
}
