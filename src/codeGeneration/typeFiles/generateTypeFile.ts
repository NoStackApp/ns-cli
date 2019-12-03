// import {string} from '@oclif/command/lib/flags'
// import {Replacement} from 'tslint'

import {boilerplateDir, BoilerPlateInfoType, boilerPlates} from '../../constants'
import {StackInfo} from '../../constants/types'
import {singularName} from '../../tools/inflections'
import {createReplacementOptions, ReplacementOptions} from '../createReplacementOptions'
import {compDir} from '../createTopProjectDirs'
import {generateFromBoilerPlate} from '../generateFromBoilerPlate'
import {makeDirs} from '../makeDirs'

import {boilerPlateToDir} from './boilderPlateToDir'

const boilerPlateFromInfo = (boilerPlateInfo: BoilerPlateInfoType) =>
  boilerPlates[boilerPlateInfo.formType + boilerPlateInfo.dataType + boilerPlateInfo.nodeType]

export async function generateTypeFile(type: string, source: string, boilerPlateInfo: BoilerPlateInfoType, currentStack: StackInfo) {
  console.log(`in generateTypeFile, type=${type}, boilerPlateInfo=${JSON.stringify(boilerPlateInfo)}`)
  // const parentType = currentStack.types[type].sources[source].parentType
  const boilerPlate = boilerPlateFromInfo(boilerPlateInfo)
  console.log(`in generateTypeFile, type=${type}, boilerPlate=${boilerPlate}`)
  const dir = boilerPlateToDir(type, boilerPlateInfo.formType)
  console.log(`in generateTypeFile, dir=${dir}`)
  // if (boilerPlate !== boilerPlates[associationTypes.MULTIPLE]) {
  //   dir = singularName(type)
  // }

  const path = `${compDir}/${singularName(source)}/${dir}`
  const dirList = [
    path
  ]

  console.log(`before createReplacementOptions(${type}, ${source})`)
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
