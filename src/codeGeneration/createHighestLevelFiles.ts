import {boilerplateDir} from '../constants'
import {StackInfo} from '../constants/types'

import {compDir, srcDir} from './createTopProjectDirs'
import {appNameFromPath} from './generateAppCode'
import {generateAppFile} from './generateAppFile'

const fs = require('fs-extra')
const Handlebars = require('handlebars')

export async function createHighestLevelFiles(currentStack: StackInfo, appDir: string, userClass: string) {
  // DeleteInstanceMenu
  await fs.copy(`${boilerplateDir}/DeleteInstanceMenu.js`, `${compDir}/DeleteInstanceMenu/index.js`)

  // EditInstanceForm
  await fs.copy(`${boilerplateDir}/EditInstanceForm.js`, `${compDir}/EditInstanceForm/index.js`)

  // AuthTabs
  await fs.copy(`${boilerplateDir}/AuthTabs.js`, `${compDir}/AuthTabs/index.js`)

  // client file
  await fs.copy(`${boilerplateDir}/client.js`, `${srcDir}/client/index.js`)

  // flattenData file
  await fs.copy(`${boilerplateDir}/flattenData.js`, `${srcDir}/flattenData/index.js`)

  // index.js
  await fs.copy(`${boilerplateDir}/index.js`, `${srcDir}/index.js`)

  // NavBar
  const navBar = Handlebars.compile(await fs.readFile(`${boilerplateDir}/NavBar.js`, 'utf-8'))
  await fs.outputFile(`${compDir}/NavBar/index.js`, navBar({appName: appNameFromPath(appDir)}))

  // App file
  await generateAppFile(currentStack, userClass)

  // store stack meta data
  await fs.outputJson(`${appDir}/docs/stack.json`, currentStack)
}
