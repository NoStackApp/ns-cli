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

export const formTypes = {
  CREATION: 'creation',
  SINGLE_INSTANCE: 'single',
  LIST: 'list',
}

export const boilerPlateTypes = {
  CREATION_ROOT: `${formTypes.CREATION}${dataTypes.STRING}${nodeTypes.ROOT}`,
  CREATION_NON_ROOT: `${formTypes.CREATION}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  CREATION_ROOT_GROUPING: `${formTypes.CREATION}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  CREATION_NON_ROOT_GROUPING: `${formTypes.CREATION}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  MULTIPLE_NON_ROOT: `${formTypes.LIST}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  MULTIPLE_ROOT: `${formTypes.LIST}${dataTypes.STRING}${nodeTypes.ROOT}`,
  MULTIPLE_NON_ROOT_GROUPING: `${formTypes.LIST}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  MULTIPLE_ROOT_GROUPING: `${formTypes.LIST}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  SINGLE_NON_ROOT: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  SINGLE_ROOT: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.ROOT}`,
  SINGLE_NON_ROOT_GROUPING: `${formTypes.SINGLE_INSTANCE}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  SINGLE_ROOT_GROUPING: `${formTypes.SINGLE_INSTANCE}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  SINGLE_BOOLEAN: `${formTypes.SINGLE_INSTANCE}${dataTypes.BOOLEAN}${nodeTypes.PROPERTY}`,
  SINGLE_NUMBER: `${formTypes.SINGLE_INSTANCE}${dataTypes.NUMBER}${nodeTypes.PROPERTY}`,
  SINGLE_PROPERTY: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.PROPERTY}`,
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
  [boilerPlateTypes.SINGLE_ROOT_GROUPING]: 'genericSingleRootGrouping',
  [boilerPlateTypes.SINGLE_NON_ROOT_GROUPING]: 'genericSingleNonRootGrouping',
  [boilerPlateTypes.SINGLE_PROPERTY]: 'genericSingleProperty',
  [boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingleBoolean',
  [boilerPlateTypes.SINGLE_NUMBER]: 'genericSingleNumberProperty',
}

export const boilerplateDir = `${__dirname}/../../resources/boilerplates`
// console.log(`boilerplateDir =${boilerplateDir}`)
