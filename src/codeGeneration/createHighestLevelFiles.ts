import {noNameError} from '../commands/makecode'
import {associationTypes, boilerplateDir} from '../constants'
import {StackInfo} from '../constants/types'
import {pluralName, singularName} from '../tools/inflections'

import {appDir, compDir, srcDir} from './createTopProjectDirs'
import {generateFromBoilerPlate} from './generateFromBoilerPlate'

const fs = require('fs-extra')

export async function createHighestLevelFiles(currentStack: StackInfo, appName: string, userClass: string) {
  // const boilerPlateDir = `${boilerplateDir}/codeGeneration/boilerplates`

  // shell.cp()

  // NavBar
  let options = {
    files: '',
    from: [
      /__AppName__/g
    ],
    to: [
      appName
    ]
  }

  await fs.outputJson(`${appDir}/docs/stack.json`, currentStack, (err: any) => {
    if (err) {
      // @ts-ignore
      throw new Error(console.error(err))
    }
  })

  await generateFromBoilerPlate(`${boilerplateDir}/NavBar.js`, `${compDir}/NavBar/index.js`, options)

  // DeleteInstanceMenu
  await fs.copy(`${boilerplateDir}/DeleteInstanceMenu.js`, `${compDir}/DeleteInstanceMenu/index.js`)

  // EditInstanceForm
  await fs.copy(`${boilerplateDir}/EditInstanceForm.js`, `${compDir}/EditInstanceForm/index.js`)

  // client file
  await fs.copy(`${boilerplateDir}/client.js`, `${srcDir}/client/index.js`)

  // flattenData file
  await fs.copy(`${boilerplateDir}/flattenData.js`, `${srcDir}/flattenData/index.js`)

  // index.js
  await fs.copy(`${boilerplateDir}/index.js`, `${srcDir}/index.js`)

  // App
  if (!currentStack.userClasses[userClass]) {
    const err = (new noNameError())
    err.message = `template contains no userClass '${userClass}'`
    throw(err)
  }

  const source: string = currentStack.userClasses[userClass].topSource
  if (!source) {
    const err = (new noNameError())
    err.message = 'template contains no sources'
    throw(err)
  }

  const highestLevel = 'highestLevel'
  const sourceInfo = currentStack.sources[source]
  const highestLevelList = sourceInfo.selectedTree[highestLevel]
  // console.log(`highestLevelList for ${source}=${JSON.stringify(highestLevelList)}`)

  let topComponentType: string = sourceInfo.root
  let topComponent = singularName(topComponentType)
  const topComponentSetting = `${userClass}Id={ currentUser.id }`

  if (highestLevelList.length === 1) {
    topComponentType = highestLevelList[0]
    topComponent = pluralName(topComponentType)
    // topComponentSetting = `${userClass}Id={ currentUser.id }`
  }

  // console.log(`topComponentType for ${source}=${topComponentType}`)

  // todo: remove this
  if (!topComponentType) {
    const err = (new noNameError())
    err.message = `source ${source} contains no selected items`
    throw(err)
  }

  if (currentStack.types[topComponentType].sources[source].assnType === associationTypes.SINGLE_REQUIRED) {
    topComponent = singularName(topComponentType)
  }
  /*
"constraints": {"toDoSource":
 {"constraintType": "ID", "type": "project", "value": "currentProjectId"}},

   loop and for every constraint:
   if value=__currentUser__
      topComponentSetting += ' userId={ currentUser.id }'
    if type==="ID"

      topComponentSetting += ' ${type}Id={ ${value} }'
    else
      topComponentSetting += ' ${type}Value={ ${value} }'
   */
  options = {
    files: '',
    from: [
      /__SourceName__/g,
      /__TopComponentName__/g,
      /__TopComponentPropSetting__/g,
    ],
    to: [
      singularName(source),
      topComponent,
      topComponentSetting,
    ]
  }

  await generateFromBoilerPlate(`${boilerplateDir}/App.js`, `${srcDir}/App.js`, options)

  // config
  // const configText = await createConfigFile(currentStack, appDir)
  // // console.log(`configText=${configText}`)
  // fs.outputFile(`${srcDir}/config/index.js`, configText)

  // options = {files: '', from: [], to: []}
  // await generateFromBoilerPlate(`${boilerplateDir}/config.js`, `${srcDir}/config/index.js`, options)
}
