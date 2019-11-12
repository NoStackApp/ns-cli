// import {string} from '@oclif/command/lib/flags'
// import {Replacement} from 'tslint'

import {boilerplateDir, boilerPlateInfoType, boilerPlates, boilerPlateTypes, dataTypes, formTypes} from '../constants'
import {StackInfo} from '../constants/types'
import {pluralName, singularName} from '../tools/inflections'

import {createReplacementOptions, ReplacementOptions} from './createReplacementOptions'
import {compDir} from './createTopProjectDirs'
import {generateFromBoilerPlate} from './generateFromBoilerPlate'
import {makeDirs} from './makeDirs'

// interface DescendantInfo {
//   descendant: string,
//   associationType: string,
//   source: string,
// }
//
// const getDescendants = (type: string, source: string, currentStack: StackInfo, descendants: DescendantInfo[]) => {
//   let children = {...currentStack.sources[source].tree[type]}
//   const connectedSource: string = currentStack.sources[source].connections[type]
//
//   Object.keys(children).map(
//     child => {
//       descendants.push({
//         descendant: child,
//         associationType: children[child],
//         source,
//       })
//       getDescendants(child, source, currentStack, descendants)
//     }
//   )
//   if (connectedSource) getDescendants(type, connectedSource, currentStack, descendants)
//
// }

const boilerPlateToDir = (type: string, formType: string) => {
  const mappingObject = {
    [formTypes.SINGLE_INSTANCE]: singularName(type),
    [formTypes.CREATION]: singularName(type) + 'CreationForm',
    [formTypes.LIST]: pluralName(type),
  }
  return mappingObject[formType]
}

const boilerPlateFromInfo = (boilerPlateInfo: boilerPlateInfoType) =>
  boilerPlates[boilerPlateInfo.formType + boilerPlateInfo.dataType + boilerPlateInfo.nodeType]

export async function createTypeFile(type: string, source: string, boilerPlateInfo: boilerPlateInfoType, currentStack: StackInfo) {
  // console.log(`in createTypeFile, type=${type}, boilerPlateType=${boilerPlateType}`)
  // const parentType = currentStack.types[type].sources[source].parentType
  const boilerPlate = boilerPlateFromInfo(boilerPlateInfo)
  console.log(`in createTypeFile, type=${type}, boilerPlate=${boilerPlate}`)
  const dir = boilerPlateToDir(type, boilerPlateInfo.formType)
  // console.log(`in createTypeFile, dir=${dir}`)
  // if (boilerPlate !== boilerPlates[associationTypes.MULTIPLE]) {
  //   dir = singularName(type)
  // }

  const path = `${compDir}/${singularName(source)}/${dir}`
  const dirList = [
    path
  ]

  // console.log(`before createReplacementOptions(${type}, ${source})`)
  const options: ReplacementOptions = createReplacementOptions(type, source, currentStack)
  // const options: ReplacementOptions = createReplacementOptions(type, source, boilerPlate, currentStack)

  // console.log(`options is: ${JSON.stringify(options)}`)
  await makeDirs(dirList)

  try {
    await generateFromBoilerPlate(`${boilerplateDir}/${boilerPlate}.js`, `${path}/index.js`, options)
    // console.log('success creating file')
  } catch (err) {
    console.error(err)
    throw new Error(`error with generateFromBoilerPlate: ${err}`)
  }
}
