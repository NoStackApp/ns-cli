export const liveServer = 'https://api.matchlynx.com/graphql'

export const associationTypes = {
  MULTIPLE: 'multiple',
  SINGLE_REQUIRED: 'singleRequired',
}

export const dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  GROUPING: 'grouping',
}

export const nodeTypes = {
  NONROOT: 'nonRoot',
  ROOT: 'Root',
  PROPERTY: 'Property',
}

export const boilerPlateTypes = {
  CREATION_ROOT: `creation${dataTypes.STRING}${nodeTypes.ROOT}`,
  CREATION_NON_ROOT: `creation${dataTypes.STRING}${nodeTypes.NONROOT}`,
  CREATION_ROOT_GROUPING: `creation${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  CREATION_NON_ROOT_GROUPING: `creation${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  MULTIPLE_NON_ROOT: `${associationTypes.MULTIPLE}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  MULTIPLE_ROOT: `${associationTypes.MULTIPLE}${dataTypes.STRING}${nodeTypes.ROOT}`,
  SINGLE_NON_ROOT: `${associationTypes.SINGLE_REQUIRED}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  SINGLE_ROOT: `${associationTypes.SINGLE_REQUIRED}${dataTypes.STRING}${nodeTypes.ROOT}`,
  MULTIPLE_NON_ROOT_GROUPING: `${associationTypes.MULTIPLE}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  MULTIPLE_ROOT_GROUPING: `${associationTypes.MULTIPLE}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  SINGLE_NON_ROOT_GROUPING: `${associationTypes.SINGLE_REQUIRED}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  SINGLE_ROOT_GROUPING: `${associationTypes.SINGLE_REQUIRED}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  SINGLE_BOOLEAN: `${associationTypes.SINGLE_REQUIRED}${dataTypes.BOOLEAN}${nodeTypes.PROPERTY}`,
  SINGLE_NUMBER: `${associationTypes.SINGLE_REQUIRED}${dataTypes.NUMBER}${nodeTypes.PROPERTY}`,
  SINGLE_PROPERTY: `${associationTypes.SINGLE_REQUIRED}${dataTypes.STRING}${nodeTypes.PROPERTY}`,
}

export const boilerPlates = {
  [boilerPlateTypes.CREATION_ROOT]: 'genericCreationFormRoot',
  [boilerPlateTypes.CREATION_NON_ROOT]: 'genericCreationFormNonRoot',
  [boilerPlateTypes.CREATION_ROOT_GROUPING]: 'genericCreationFormRootGrouping',
  [boilerPlateTypes.CREATION_NON_ROOT_GROUPING]: 'genericCreationFormNonRootGrouping',
  [boilerPlateTypes.MULTIPLE_NON_ROOT]: 'genericMultipleNonRoot',
  [boilerPlateTypes.MULTIPLE_ROOT]: 'genericMultipleRoot',
  [boilerPlateTypes.SINGLE_ROOT]: 'genericSingle',
  [boilerPlateTypes.SINGLE_NON_ROOT]: 'genericSingleNonRoot',
  [boilerPlateTypes.MULTIPLE_NON_ROOT_GROUPING]: 'genericMultipleNonRootGrouping',
  [boilerPlateTypes.MULTIPLE_ROOT_GROUPING]: 'genericMultipleRootGrouping',
  [boilerPlateTypes.SINGLE_ROOT_GROUPING]: 'genericSingleGrouping',
  [boilerPlateTypes.SINGLE_NON_ROOT_GROUPING]: 'genericSingleNonRootGrouping',
  [boilerPlateTypes.SINGLE_PROPERTY]: 'genericSingleProperty',
  [boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingleBoolean',
  [boilerPlateTypes.SINGLE_NUMBER]: 'genericSingleNumber',
}

export const boilerplateDir = `${__dirname}/../../resources/boilerplates`
// console.log(`boilerplateDir =${boilerplateDir}`)
