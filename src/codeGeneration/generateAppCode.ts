import {StackInfo} from '../constants/types'

import {createConfigFile} from './createConfigFile'
import {createHighestLevelFiles} from './createHighestLevelFiles'
import {createQueryFile} from './createQueryFile'
import {createTopProjectDirs, srcDir} from './createTopProjectDirs'
import {generateAppTypeFiles} from './typeFiles/generateAppTypeFiles'

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

  try {
    await createTopProjectDirs(currentStack, appDir)
  } catch (err) {
    throw new Error('error in creating top project directories')
  }

  // console.log(`appDir=${appDir}`)
  const appName = appNameFromPath(appDir)
  const configText = await createConfigFile(currentStack, appName)
  // console.log(`configText=${configText}`)
  fs.outputFile(`${srcDir}/config/index.js`, configText)

  try {
    await createHighestLevelFiles(currentStack, appDir, userClass)
  } catch (err) {
    throw new Error('error in creating highest level files')
  }

  const sources = currentStack.sources

  // mapObject

  try {
    await Promise.all(Object.keys(sources).map(async source => {
      await createQueryFile(currentStack, source)
    }))
  } catch (err) {
    throw new Error('error in creating top project directories')
  }

  try {
    await generateAppTypeFiles(sources, userClass, currentStack)
  } catch (err) {
    throw new Error('error in creating app component files')
  }
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
      },
    },
    {
      title: 'Make Git Commit',
      task: async () => {
        try {
          await execa(
            'git',
            ['-C', appDir, 'add', '.'],
          )
        } catch (err) {
          console.log(`git error when adding changed files.  Perhaps your generated code didn't change?: ${err}`)
          return
        }

        try {
          await execa(
            'git',
            ['-C', appDir, 'commit', '-m', 'generated no-stack code using make-code :tada:'],
          )
        } catch (err) {
          console.log(`git error when attempting to commit the generation of code.  Perhaps your generated code didn't change? ${err}`)
        }
      },
    },
  ])

  return tasks
}
