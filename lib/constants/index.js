"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveServer = 'https://api.matchlynx.com/graphql';
exports.associationTypes = {
    MULTIPLE: 'multiple',
    SINGLE_REQUIRED: 'singleRequired',
};
exports.dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
};

exports.nodeTypes = {
  NONROOT: 'nonRoot',
  ROOT: 'Root',
  PROPERTY: 'Property',
};

exports.boilerPlateTypes = {
  CREATION_ROOT_TYPE: 'creation_root',
  CREATION_NON_ROOT: 'creation',
  MULTIPLE_STRING: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
  MULTIPLE_ROOT: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
  SINGLE_STRING: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
  SINGLE_ROOT: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
  SINGLE_BOOLEAN: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.BOOLEAN}${exports.nodeTypes.PROPERTY}`,
  SINGLE_PROPERTY: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}${exports.nodeTypes.PROPERTY}`,
};
exports.boilerPlates = {
  [exports.boilerPlateTypes.CREATION_ROOT_TYPE]: 'genericCreationFormRootType',
  [exports.boilerPlateTypes.CREATION_NON_ROOT]: 'genericCreationFormNonRoot',
  [exports.boilerPlateTypes.MULTIPLE_STRING]: 'genericPluralNonRoot',
  [exports.boilerPlateTypes.MULTIPLE_ROOT]: 'genericPluralRootType',
  [exports.boilerPlateTypes.SINGLE_ROOT]: 'genericSingularString',
  [exports.boilerPlateTypes.SINGLE_STRING]: 'genericSingularStringNonRoot',
  [exports.boilerPlateTypes.SINGLE_PROPERTY]: 'genericSingularStringProperty',
  [exports.boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingularBoolean',
};
exports.boilerplateDir = `${__dirname}/../../resources/boilerplates`;
// console.log(`boilerplateDir =${boilerplateDir}`)
