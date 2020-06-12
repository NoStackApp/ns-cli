import {ActionTypeDescriptionList} from './types'

export const liveServer = 'https://api.matchlynx.com/graphql'

export const associationTypes = {
  MULTIPLE: 'multiple',
  SINGLE_REQUIRED: 'singleRequired',
  SELECTABLE: 'selectable',
  // VIEWABLE: 'viewable',
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
  SELECTABLE: 'selectable',
}

export const formTypes = {
  CREATION: 'creation',
  SINGLE_INSTANCE: 'single',
  LIST: 'list',
  SELECTION: 'selection',
}

export const unitTypes = {
  INTERACTIVE: 'interactive',
  DATA_SOURCE: 'dataSource',
}

export interface BoilerPlateInfoType {
  formType: string;
  dataType: string;
  nodeType: string;
}

export const boilerPlateTypes = {
  CREATION_ROOT: `${formTypes.CREATION}${dataTypes.STRING}${nodeTypes.ROOT}`,
  CREATION_NON_ROOT: `${formTypes.CREATION}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  CREATION_SELECTABLE: `${formTypes.CREATION}${dataTypes.STRING}${nodeTypes.SELECTABLE}`,
  CREATION_ROOT_GROUPING: `${formTypes.CREATION}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  CREATION_NON_ROOT_GROUPING: `${formTypes.CREATION}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  MULTIPLE_NON_ROOT: `${formTypes.LIST}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  MULTIPLE_SELECTABLE: `${formTypes.LIST}${dataTypes.STRING}${nodeTypes.SELECTABLE}`,
  MULTIPLE_ROOT: `${formTypes.LIST}${dataTypes.STRING}${nodeTypes.ROOT}`,
  MULTIPLE_NON_ROOT_GROUPING: `${formTypes.LIST}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  MULTIPLE_ROOT_GROUPING: `${formTypes.LIST}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  SINGLE_NON_ROOT: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.NONROOT}`,
  SINGLE_SELECTABLE: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.SELECTABLE}`,
  SINGLE_ROOT: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.ROOT}`,
  SINGLE_NON_ROOT_GROUPING: `${formTypes.SINGLE_INSTANCE}${dataTypes.GROUPING}${nodeTypes.NONROOT}`,
  SINGLE_ROOT_GROUPING: `${formTypes.SINGLE_INSTANCE}${dataTypes.GROUPING}${nodeTypes.ROOT}`,
  SINGLE_BOOLEAN: `${formTypes.SINGLE_INSTANCE}${dataTypes.BOOLEAN}${nodeTypes.PROPERTY}`,
  SINGLE_NUMBER: `${formTypes.SINGLE_INSTANCE}${dataTypes.NUMBER}${nodeTypes.PROPERTY}`,
  SINGLE_PROPERTY: `${formTypes.SINGLE_INSTANCE}${dataTypes.STRING}${nodeTypes.PROPERTY}`,
  SELECTION: `${formTypes.SELECTION}${dataTypes.STRING}${nodeTypes.SELECTABLE}`,
}

export const boilerPlates = {
  [boilerPlateTypes.CREATION_ROOT]: 'genericCreationFormRoot',
  [boilerPlateTypes.CREATION_NON_ROOT]: 'genericCreationFormNonRoot',
  [boilerPlateTypes.CREATION_SELECTABLE]: 'genericCreationFormSelectable',
  [boilerPlateTypes.CREATION_ROOT_GROUPING]: 'genericCreationFormRootGrouping',
  [boilerPlateTypes.CREATION_NON_ROOT_GROUPING]: 'genericCreationFormNonRootGrouping',
  [boilerPlateTypes.MULTIPLE_NON_ROOT]: 'genericMultipleNonRoot',
  [boilerPlateTypes.MULTIPLE_SELECTABLE]: 'genericMultipleSelectable',
  [boilerPlateTypes.MULTIPLE_ROOT]: 'genericMultipleRoot',
  [boilerPlateTypes.SINGLE_ROOT]: 'genericSingle',
  [boilerPlateTypes.SINGLE_NON_ROOT]: 'genericSingleNonRoot',
  [boilerPlateTypes.SINGLE_SELECTABLE]: 'genericSingleSelectable',
  [boilerPlateTypes.MULTIPLE_NON_ROOT_GROUPING]: 'genericMultipleNonRootGrouping',
  [boilerPlateTypes.MULTIPLE_ROOT_GROUPING]: 'genericMultipleRootGrouping',
  [boilerPlateTypes.SINGLE_ROOT_GROUPING]: 'genericSingleRootGrouping',
  [boilerPlateTypes.SINGLE_NON_ROOT_GROUPING]: 'genericSingleNonRootGrouping',
  [boilerPlateTypes.SINGLE_PROPERTY]: 'genericSingleProperty',
  [boilerPlateTypes.SINGLE_BOOLEAN]: 'genericSingleBoolean',
  [boilerPlateTypes.SINGLE_NUMBER]: 'genericSingleNumberProperty',
  [boilerPlateTypes.SELECTION]: 'genericSelection',
}

export const boilerplateDir = `${__dirname}/../../resources/boilerplates`
// console.log(`boilerplateDir =${boilerplateDir}`)

export const actionTypes = {
  UPLOAD: 'UPLOAD',
  APPROVE_UPLOAD: 'APPROVE_UPLOAD',
  CONTACT: 'CONTACT',
  INVITE: 'INVITE',
  ACCEPT_INVITATION: 'ACCEPT_INVITATION',
  FIRST_LOGIN: 'FIRST_LOGIN',
  RESPOND: 'RESPOND',
  NOTIFY: 'NOTIFY',
  FOLLOW: 'FOLLOW',
  PAY: 'PAY',
  BUY: 'BUY',
  RENT: 'RENT',
  POST: 'POST',
  REQUEST_NEW_PASSWORD: 'REQUEST_NEW_PASSWORD',
  SET_PASSWORD: 'SET_PASSWORD',
  LOGIN: 'LOGIN',
  REFRESH_USER_TOKEN: 'REFRESH_USER_TOKEN',
  VERIFY_USER_TOKEN: 'VERIFY_USER_TOKEN',
  CREATE_INSTANCE:'CREATE_INSTANCE',
  CREATE_INSTANCE_WITHOUT_PARENT: 'CREATE_INSTANCE_WITHOUT_PARENT',
  CREATE_PUBLIC_INSTANCE: 'CREATE_PUBLIC_INSTANCE',
  ADD_INSTANCE_ASSN: 'ADD_INSTANCE_ASSN',
  CALL_EXTERNAL_API: 'CALL_EXTERNAL_API',
  UPDATE_INSTANCE_ASSN:'UPDATE_INSTANCE_ASSN',
  DELETE_INSTANCE_ASSN:'DELETE_INSTANCE_ASSN',

  // the following are supported in the Execute mutation
  UPDATE_INSTANCE:'UPDATE_INSTANCE',
  CREATE_INSTANCE_WITH_UNOWNED_PARENT: 'CREATE_INSTANCE_WITH_UNOWNED_PARENT',
  SUBMIT_FORM:'SUBMIT_FORM',
  DELETE_INSTANCE:'DELETE_INSTANCE',
}
export const actionTypeDescriptions: ActionTypeDescriptionList = {
  [actionTypes.CREATE_INSTANCE]: 'create a new instance.  Params: parentInstanceId, value',
  [actionTypes.UPDATE_INSTANCE]: 'updates value of existing instance.  Params: instanceId, value',
  [actionTypes.DELETE_INSTANCE]: 'deletes an existing instance',
  [actionTypes.ADD_INSTANCE_ASSN]: 'associates two existing instances.  Params: parentInstanceid, childInstanceId',
  [actionTypes.UPDATE_INSTANCE_ASSN]: 'deletes a current instance assn and creates a new',
  [actionTypes.DELETE_INSTANCE_ASSN]: 'deletes a current instance assn',
}
