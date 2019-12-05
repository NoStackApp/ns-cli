import {StackInfo} from '../constants/types'

import {createConfigFile} from './createConfigFile'
import {createHighestLevelFiles} from './createHighestLevelFiles'
import {createQueryFile} from './createQueryFile'
import {createTopProjectDirs, srcDir} from './createTopProjectDirs'
import {createTypeFiles} from './typeFiles/createTypeFiles'

const execa = require('execa')
const fs = require('fs-extra')
const Listr = require('listr')
const path = require('path')

export const appNameFromPath = (appDir: string) => {
  if (appDir === '.') return path.basename(path.resolve())
  return path.basename(appDir) // appDir.match(/([^\/]*)\/*$/)![1].substring(2)
}

export async function generateCodeFiles(appDir: string, userClass: string, jsonPath: string) {
  // console.log(`stacklocation=${appDir}/stack.json`)
  const currentStack: StackInfo = await fs.readJSON(jsonPath) // await generateJSON.bind(this)(template, appDir)
  // console.log(`currentStack=${currentStack}`)
  await createTopProjectDirs(currentStack, appDir)
  console.log(`appDir=${appDir}`)
  const appName = appNameFromPath(appDir)
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

export async function generateAppCode(appDir: string, userClass: string, jsonPath: string) {
  const tasks = new Listr([
    {
      title: 'Generate the Code Files',
      task: async () => {
        try {
          await generateCodeFiles(appDir, userClass, jsonPath)
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
            ['-C', appDir, 'add', '.']
          )
        } catch (err) {
          console.log(`git error when adding changed files.  Perhaps your generated code didn't change?: ${err}`)
          return
        }

        try {
          await execa(
            'git',
            ['-C', appDir, 'commit', '-m', 'generated no-stack code :tada:']
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
