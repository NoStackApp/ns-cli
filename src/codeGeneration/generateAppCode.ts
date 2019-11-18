import {StackInfo} from '../constants/types'

import {createConfigFile} from './createConfigFile'
import {createHighestLevelFiles} from './createHighestLevelFiles'
import {createQueryFile} from './createQueryFile'
import {createTopProjectDirs, srcDir} from './createTopProjectDirs'
import {createTypeFiles} from './typeFiles/createTypeFiles'

const execa = require('execa')
const fs = require('fs-extra')
const Listr = require('listr')

export async function generateCodeFiles(appName: string, userClass: string) {
  // console.log(`stacklocation=${appName}/stack.json`)
  const currentStack: StackInfo = await fs.readJSON(`${appName}/stack.json`) // await generateJSON.bind(this)(template, appName)
  // console.log(`currentStack=${currentStack}`)
  await createTopProjectDirs(currentStack, appName)

  const configText = await createConfigFile(currentStack, appName)
  // console.log(`configText=${configText}`)
  fs.outputFile(`${srcDir}/config/index.js`, configText)

  // this.log(JSON.stringify(currentStack, null, 2))
  await createHighestLevelFiles(currentStack, appName, userClass)

  const sources = currentStack.sources

  //mapObject

  await Promise.all(Object.keys(sources).map(async source => {
    await createQueryFile(currentStack, source)
  }))

  await createTypeFiles(sources, userClass, currentStack)
}

export async function generateAppCode(appName: string, userClass: string) {
  const tasks = new Listr([
    {
      title: 'Generate the Code Files',
      task: async () => {
        try {
          await generateCodeFiles(appName, userClass)
        } catch (err) {
          console.log(`git error when attempting to generate the code: ${err}`)
          throw new Error(err)
        }
        return
      }
    },
    {
      title: 'Make First Git Commit',
      task: async () => {
        try {
          await execa(
            'git',
            ['-C', appName, 'add', '.']
          )
        } catch (err) {
          console.log(`git error when adding changed files.  Perhaps your generated code didn't change?: ${err}`)
          return
        }

        try {
          await execa(
            'git',
            ['-C', appName, 'commit', '-m', 'generated no-stack code :tada:']
          )
        } catch (err) {
          console.log(`git error when attempting to commit the generation of code.  Perhaps your generated code didn't change? ${err}`)
          return
        }
      },
    },
  ])

  return tasks

}
