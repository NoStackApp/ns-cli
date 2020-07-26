// const findInFiles = require('find-in-files')
// import {AddedCode} from '../constants/types'
//
// const fs = require('fs-extra')
// const readdir = require('@mrmlnc/readdir-enhanced')
// const regexReplace = require('regex-replace')

// const recursive = require('recursive-readdir')

// rootDir: string
import chalk from 'chalk'
import execa = require('execa')
import * as path from 'path'

const fs = require('fs-extra')

export const insertAddedCode = async (appDir: string) => {
  const baseDir = path.resolve(process.cwd(), appDir)
  const gruntDir = path.resolve(__dirname, '../..')
  const docsDir = appDir + '/docs/'
  const addedCodeJsonFile = docsDir + 'addedCode.json'

  // console.log(`gruntDir=${gruntDir}`)
  // console.log(`appDir=${baseDir}`)
  // console.log(`addedCodeJsonFile=${addedCodeJsonFile}`)

  const existsComponents = await fs.pathExists(addedCodeJsonFile)
  // console.log(`existsComponents=${existsComponents}`)

  let addedCode = {}
  if (!existsComponents) {
    fs.writeJson(addedCodeJsonFile, addedCode)
    return
  }

  addedCode = await fs.readJson(addedCodeJsonFile)
  // console.log(`addedCode=${JSON.stringify(addedCode, null, 1)}`)
  if (Object.keys(addedCode).length === 0) {
    // no added code to add
    return
  }
  await execa(
    `${gruntDir}/node_modules/.bin/grunt`,
    ['--appDir=' + baseDir, `--base=${gruntDir}`],
  ).catch(
    (error: any) => {
      throw new Error(`${chalk.red('error inserting added code.')} Here is the error reported:\n${error}`)
    },
  )
}
