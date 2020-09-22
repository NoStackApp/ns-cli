'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
exports.storeAddedCode = void 0
// const findInFiles = require('find-in-files')
const regExAddedCodeSection_1 = require('../constants/regExAddedCodeSection')
const fs = require('fs-extra')
const readdir = require('@mrmlnc/readdir-enhanced')
// const recursive = require('recursive-readdir')
// const regEx = /(\/\/|{\/\*) np__added_start unit: (\w*), comp: (\w*), loc: (\w*)( \*\/\}\n|\n)((.|\n)*?)(\/\/|{\/\*) np__added_end/g
exports.storeAddedCode = async rootDir => {
  const compsDir = rootDir + '/src/components/'
  const docsDir = rootDir + '/docs/'
  const addedCodeJsonFile = docsDir + 'addedCode.json'
  const existsComponents = await fs.pathExists(compsDir)
  if (!existsComponents)
    return
  const files = readdir.sync(compsDir, {deep: true, filter: '**/*.js'})
  // console.log(`files: ${JSON.stringify(files, null, 2)}`)
  const addedCode = {}
  let i
  for (i = 0; i < files.length; i++) {
    const file = compsDir + files[i]
    const fileText = await fs.readFile(file, 'utf-8')
    // console.log(`fileText: ${fileText}`)
    let match
    while (match = regExAddedCodeSection_1.regExAddedCodeSection.exec(fileText)) {
      // if (!output[match[1]])
      const unit = match[2]
      const component = match[3]
      const location = match[4]
      // const firstLineEnding = match[5]
      let contents = match[6]
      if (!contents || contents === '')
        contents = ' '
      // console.log(`match found: unit: ${unit} component: ${component} location: ${location} contents: ${contents}`)
      // console.log(`match found: unit: ${unit} component: ${component} location: ${location}`)
      if (!addedCode[unit])
        addedCode[unit] = {}
      if (!addedCode[unit][component])
        addedCode[unit][component] = {}
      addedCode[unit][component][location] = contents
    }
  }
  // console.log(`addedCode: ${JSON.stringify(addedCode, null, 2)}`)
  try {
    await fs.writeJson(addedCodeJsonFile, addedCode)
  } catch (err) {
    throw err
  }
}
