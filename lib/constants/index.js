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
  GROUPING: 'grouping',
};

exports.nodeTypes = {
  NONROOT: 'nonRoot',
  ROOT: 'Root',
  PROPERTY: 'Property',
};

exports.boilerPlateTypes = {
  CREATION_ROOT: `creation${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
  CREATION_NON_ROOT: `creation${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
  CREATION_ROOT_GROUPING: `creation${exports.dataTypes.GROUPING}${exports.nodeTypes.ROOT}`,
  CREATION_NON_ROOT_GROUPING: `creation${exports.dataTypes.GROUPING}${exports.nodeTypes.NONROOT}`,
  MULTIPLE_NON_ROOT: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
  MULTIPLE_ROOT: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
  SINGLE_NON_ROOT: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
  SINGLE_ROOT: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
  MULTIPLE_NON_ROOT_GROUPING: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.GROUPING}${exports.nodeTypes.NONROOT}`,
  MULTIPLE_ROOT_GROUPING: `${exports.associationTypes.MULTIPLE}${exports.dataTypes.GROUPING}${exports.nodeTypes.ROOT}`,
  SINGLE_NON_ROOT_GROUPING: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.GROUPING}${exports.nodeTypes.NONROOT}`,
  SINGLE_ROOT_GROUPING: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.GROUPING}${exports.nodeTypes.ROOT}`,
  SINGLE_BOOLEAN: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.BOOLEAN}${exports.nodeTypes.PROPERTY}`,
  SINGLE_NUMBER: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.NUMBER}${exports.nodeTypes.PROPERTY}`,
  SINGLE_PROPERTY: `${exports.associationTypes.SINGLE_REQUIRED}${exports.dataTypes.STRING}${exports.nodeTypes.PROPERTY}`,
};

exports.boilerPlates = {
  [exports.boilerPlateTypes.CREATION_ROOT]: 'genericCreationFormRoot',
  [exports.boilerPlateTypes.CREATION_NON_ROOT]: 'genericCreationFormNonRoot',
  [exports.boilerPlateTypes.CREATION_ROOT_GROUPING]: 'genericCreationFormRootGrouping',
  [exports.boilerPlateTypes.CREATION_NON_ROOT_GROUPING]: 'genericCreationFormNonRootGrouping',
  [exports.boilerPlateTypes.MULTIPLE_NON_ROOT]: 'genericMultipleNonRoot',
  [exports.boilerPlateTypes.MULTIPLE_ROOT]: 'genericMultipleRoot',
  [exports.boilerPlateTypes.SINGLE_ROOT]: 'genericSingle',
  [exports.boilerPlateTypes.SINGLE_NON_ROOT]: 'genericSingleNonRoot',
  [exports.boilerPlateTypes.MULTIPLE_NON_ROOT_GROUPING]: 'genericMultipleNonRootGrouping',
  [exports.boilerPlateTypes.MULTIPLE_ROOT_GROUPING]: 'genericMultipleRootGrouping',
  [exports.boilerPlateTypes.SINGLE_ROOT_GROUPING]: 'genericSingleGrouping',
  [exports.boilerPlateTypes.SINGLE_NON_ROOT_GROUPING]: 'genericSingleNonRootGrouping',
  [exports.boilerPlateTypes.SINGLE_PROPERTY]: 'genericSingleProperty',
  [exports.boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingleBoolean',
  [exports.boilerPlateTypes.SINGLE_NUMBER]: 'genericSingleNumber',
};

exports.boilerplateDir = `${__dirname}/../../resources/boilerplates`;
// console.log(`boilerplateDir =${boilerplateDir}`)
