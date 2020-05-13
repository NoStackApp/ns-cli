import {NoNameError} from '../commands/makecode'
import {associationTypes, boilerplateDir} from '../constants'
import {StackInfo} from '../constants/types'
import {allCaps, pluralName, singularName} from '../tools/inflections'

import {srcDir} from './createTopProjectDirs'

const fs = require('fs-extra')
const Handlebars = require('handlebars')

export async function generateAppFile(currentStack: StackInfo, userClass: string) {
  // App
  if (!currentStack.userClasses[userClass]) {
    const err = (new NoNameError())
    err.message = `template contains no userClass '${userClass}'`
    throw (err)
  }

  const source: string = currentStack.userClasses[userClass].topSource
  if (!source) {
    const err = (new NoNameError())
    err.message = 'template contains no sources'
    throw (err)
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

  // todo: remove this
  if (!topComponentType) {
    const err = (new NoNameError())
    err.message = `source ${source} contains no selected items`
    throw (err)
  }

  if (currentStack.types[topComponentType].sources[source].assnType === associationTypes.SINGLE_REQUIRED) {
    topComponent = singularName(topComponentType)
  }

  const appFile = Handlebars.compile(await fs.readFile(`${boilerplateDir}/App.js`, 'utf-8'))

  const appFileContents = appFile({
    sourceName: singularName(source),
    topComponentName: topComponent,
    topComponentPropSetting: topComponentSetting,
    userTypeId: `TYPE_${allCaps(userClass)}_ID`,
  })

  // console.log(appFileContents)
  await fs.outputFile(`${srcDir}/App.js`, appFileContents)
}
