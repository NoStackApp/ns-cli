export const liveServer = 'https://api.matchlynx.com/graphql'

export const associationTypes = {
  MULTIPLE: 'multiple',
  SINGLE_REQUIRED: 'singleRequired',
}

export const dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
}

export const boilerPlateTypes = {
  CREATION_ROOT_TYPE: 'creation_root',
  CREATION_NON_ROOT: 'creation',
  MULTIPLE_STRING: `${associationTypes.MULTIPLE}${dataTypes.STRING}`,
  MULTIPLE_ROOT: `${associationTypes.MULTIPLE}${dataTypes.STRING}Root`,
  SINGLE_STRING: `${associationTypes.SINGLE_REQUIRED}${dataTypes.STRING}`,
  SINGLE_ROOT: `${associationTypes.SINGLE_REQUIRED}${dataTypes.STRING}Root`,
  SINGLE_BOOLEAN: `${associationTypes.SINGLE_REQUIRED}${dataTypes.BOOLEAN}`,
}

export const boilerPlates = {
  [boilerPlateTypes.CREATION_ROOT_TYPE]: 'genericCreationFormRootType',
  [boilerPlateTypes.CREATION_NON_ROOT]: 'genericCreationFormNonRoot',
  [boilerPlateTypes.MULTIPLE_STRING]: 'genericPluralNonRoot',
  [boilerPlateTypes.MULTIPLE_ROOT]: 'genericPluralRootType',
  [boilerPlateTypes.SINGLE_ROOT]: 'genericSingularString',
  [boilerPlateTypes.SINGLE_STRING]: 'genericSingularStringNonRoot',
  [boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingularBoolean',
}

export const boilerplateDir = `${__dirname}/../../resources/boilerplates`
// console.log(`boilerplateDir =${boilerplateDir}`)
