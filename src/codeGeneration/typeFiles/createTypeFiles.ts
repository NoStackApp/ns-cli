import {associationTypes, BoilerPlateInfoType, dataTypes, formTypes, nodeTypes, unitTypes} from '../../constants'
import {SourceInfo, Sources, StackInfo} from '../../constants/types'

import {generateTypeFile} from './generateTypeFile'

async function generateFilesForType(
  currentStack: StackInfo,
  type: string,
  source: string,
  selectionRoot: string,
  root: string,
  sourceInfo: SourceInfo,
  highestLevel: string,
) {
  const typeInfo = currentStack.types[type]
  const typeSourceInfo = typeInfo.sources[source]
  const {assnType, sourceUnit} = typeSourceInfo
  let {nodeType} = typeSourceInfo
  let {dataType} = typeInfo

  if (selectionRoot === type) nodeType = nodeTypes.ROOT

  let formType = formTypes.SINGLE_INSTANCE

  if (type === root && type !== sourceInfo.selectedTree[highestLevel][0]) {
    console.log(`${type} is root for ${source}`)
    // this is the root, being used as the highest level component even though
    // it is not selected.  Therefore, it must be treated as a grouping in order to
    // show a list of true highest level components.
    formType = formTypes.SINGLE_INSTANCE
    dataType = dataTypes.GROUPING
    nodeType = nodeTypes.ROOT
  }

  const boilerPlateInfo: BoilerPlateInfoType = {
    formType,
    dataType,
    nodeType,
  }
  // console.log(`*** typeName=${typeName}, assnType=${assnType}, nodeType=${nodeType}`)

  if (sourceUnit) {
    const selectionBoilerPlateInfo: BoilerPlateInfoType = {
      formType: formTypes.SELECTION,
      dataType,
      nodeType: nodeTypes.SELECTABLE,
    }
    await generateTypeFile(type, sourceUnit, selectionBoilerPlateInfo, currentStack)
  }

  await generateTypeFile(type, source, boilerPlateInfo, currentStack)

  // console.log(`assnType=${assnType}`)
  if (assnType !== associationTypes.SINGLE_REQUIRED) {
    // console.log('assnType === associationTypes.MULTIPLE is true!')
    const creationBoilerPlateInfo = {
      formType: formTypes.CREATION,
      dataType,
      nodeType,
    }
    await generateTypeFile(type, source, creationBoilerPlateInfo, currentStack)

    const singularBoilerPlateInfo = {
      formType: formTypes.LIST,
      dataType,
      nodeType,
    }
    await generateTypeFile(type, source, singularBoilerPlateInfo, currentStack)
  }
}

export async function createTypeFiles(sources: Sources, userClass: string, currentStack: StackInfo) {
  const sourceKeys = Object.keys(sources)

  let i
  for (i = 0; i < sourceKeys.length; i++) {
    const source = sourceKeys[i]
    const sourceInfo = sources[source]
    const {owner} = sourceInfo
    // console.log(`source=${source}, userClass=${userClass}`)
    if (owner !== userClass) continue

    try {
      const highestLevel = 'highestLevel'
      const selectedTree = {...sourceInfo.selectedTree}
      const highestLevelList = selectedTree[highestLevel]
      let selectionRoot = highestLevelList[0]
      const root = sourceInfo.root
      if (highestLevelList.length > 1) {
        selectedTree[root] = highestLevelList
        sourceInfo.selectedTree[root] = highestLevelList
        selectionRoot = root
      }
      delete selectedTree[highestLevel]

      // console.log(`source ${source} sourceInfo.unitType=${sourceInfo.unitType}`)
      if (sourceInfo.unitType === unitTypes.DATA_SOURCE) continue

      const types = Object.keys(selectedTree)

      let j
      for (j = 0; j < types.length; j++) {
        const type = types[j]
        // console.log(`*** typeName=${typeName}`)
        // eslint-disable-next-line no-await-in-loop
        await generateFilesForType(currentStack, type, source, selectionRoot, root, sourceInfo, highestLevel)
      }
    } catch (sourceCreationError) {
      throw new Error(`error creating source ${source}: ${sourceCreationError}`)
    }
  }
}
