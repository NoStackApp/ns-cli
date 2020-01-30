// const findInFiles = require('find-in-files')
// import {AddedCode} from '../constants/types'
//
// const fs = require('fs-extra')
// const readdir = require('@mrmlnc/readdir-enhanced')
// const regexReplace = require('regex-replace')

// const recursive = require('recursive-readdir')

                                      //rootDir: string
import chalk from 'chalk'
import * as path from 'path'
import execa = require('execa')

export const insertAddedCode = async (appDir: string) => {
  const baseDir = path.resolve(process.cwd(), appDir)
  const gruntDir = path.resolve(__dirname, '../..')
  await execa(
    `${gruntDir}/node_modules/.bin/grunt`,
    ['--appDir=' + baseDir, `--base=${gruntDir}`]
  ).catch(
    (error: any) => {
      throw new Error(`${chalk.red('error inserting added code.')} Here is the error reported:\n${error}`)
    }
  )

  // console.log(`gruntDir=${gruntDir}`)
}
