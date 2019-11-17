"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveServer = 'https://api.matchlynx.com/graphql';
exports.associationTypes = {
    MULTIPLE: 'multiple',
    SINGLE_REQUIRED: 'singleRequired',
    SELECTABLE: 'selectable',
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
    SELECTABLE: 'selectable',
};
exports.formTypes = {
    CREATION: 'creation',
    SINGLE_INSTANCE: 'single',
    LIST: 'list',
    SELECTION: 'selection'
};
exports.unitTypes = {
    INTERACTIVE: 'interactive',
    DATA_SOURCE: 'dataSource',
};
exports.boilerPlateTypes = {
    CREATION_ROOT: `${exports.formTypes.CREATION}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
    CREATION_NON_ROOT: `${exports.formTypes.CREATION}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
    CREATION_SELECTABLE: `${exports.formTypes.CREATION}${exports.dataTypes.STRING}${exports.nodeTypes.SELECTABLE}`,
    CREATION_ROOT_GROUPING: `${exports.formTypes.CREATION}${exports.dataTypes.GROUPING}${exports.nodeTypes.ROOT}`,
    CREATION_NON_ROOT_GROUPING: `${exports.formTypes.CREATION}${exports.dataTypes.GROUPING}${exports.nodeTypes.NONROOT}`,
    MULTIPLE_NON_ROOT: `${exports.formTypes.LIST}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
    MULTIPLE_SELECTABLE: `${exports.formTypes.LIST}${exports.dataTypes.STRING}${exports.nodeTypes.SELECTABLE}`,
    MULTIPLE_ROOT: `${exports.formTypes.LIST}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
    MULTIPLE_NON_ROOT_GROUPING: `${exports.formTypes.LIST}${exports.dataTypes.GROUPING}${exports.nodeTypes.NONROOT}`,
    MULTIPLE_ROOT_GROUPING: `${exports.formTypes.LIST}${exports.dataTypes.GROUPING}${exports.nodeTypes.ROOT}`,
    SINGLE_NON_ROOT: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.STRING}${exports.nodeTypes.NONROOT}`,
    SINGLE_SELECTABLE: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.STRING}${exports.nodeTypes.SELECTABLE}`,
    SINGLE_ROOT: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.STRING}${exports.nodeTypes.ROOT}`,
    SINGLE_NON_ROOT_GROUPING: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.GROUPING}${exports.nodeTypes.NONROOT}`,
    SINGLE_ROOT_GROUPING: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.GROUPING}${exports.nodeTypes.ROOT}`,
    SINGLE_BOOLEAN: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.BOOLEAN}${exports.nodeTypes.PROPERTY}`,
    SINGLE_NUMBER: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.NUMBER}${exports.nodeTypes.PROPERTY}`,
    SINGLE_PROPERTY: `${exports.formTypes.SINGLE_INSTANCE}${exports.dataTypes.STRING}${exports.nodeTypes.PROPERTY}`,
    SELECTION: `${exports.formTypes.SELECTION}${exports.dataTypes.STRING}${exports.nodeTypes.SELECTABLE}`,
};
exports.boilerPlates = {
    [exports.boilerPlateTypes.CREATION_ROOT]: 'genericCreationFormRoot',
    [exports.boilerPlateTypes.CREATION_NON_ROOT]: 'genericCreationFormNonRoot',
    [exports.boilerPlateTypes.CREATION_SELECTABLE]: 'genericCreationFormSelectable',
    [exports.boilerPlateTypes.CREATION_ROOT_GROUPING]: 'genericCreationFormRootGrouping',
    [exports.boilerPlateTypes.CREATION_NON_ROOT_GROUPING]: 'genericCreationFormNonRootGrouping',
    [exports.boilerPlateTypes.MULTIPLE_NON_ROOT]: 'genericMultipleNonRoot',
    [exports.boilerPlateTypes.MULTIPLE_SELECTABLE]: 'genericMultipleSelectable',
    [exports.boilerPlateTypes.MULTIPLE_ROOT]: 'genericMultipleRoot',
    [exports.boilerPlateTypes.SINGLE_ROOT]: 'genericSingle',
    [exports.boilerPlateTypes.SINGLE_NON_ROOT]: 'genericSingleNonRoot',
    [exports.boilerPlateTypes.SINGLE_SELECTABLE]: 'genericSingleSelectable',
    [exports.boilerPlateTypes.MULTIPLE_NON_ROOT_GROUPING]: 'genericMultipleNonRootGrouping',
    [exports.boilerPlateTypes.MULTIPLE_ROOT_GROUPING]: 'genericMultipleRootGrouping',
    [exports.boilerPlateTypes.SINGLE_ROOT_GROUPING]: 'genericSingleRootGrouping',
    [exports.boilerPlateTypes.SINGLE_NON_ROOT_GROUPING]: 'genericSingleNonRootGrouping',
    [exports.boilerPlateTypes.SINGLE_PROPERTY]: 'genericSingleProperty',
    [exports.boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingleBoolean',
    [exports.boilerPlateTypes.SINGLE_NUMBER]: 'genericSingleNumberProperty',
    [exports.boilerPlateTypes.SELECTION]: 'genericSelection',
};
exports.boilerplateDir = `${__dirname}/../../resources/boilerplates`;
// console.log(`boilerplateDir =${boilerplateDir}`)
