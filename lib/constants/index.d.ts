export declare const liveServer = 'https://api.matchlynx.com/graphql'
export declare const associationTypes: {
    MULTIPLE: string;
    SINGLE_REQUIRED: string;
    SELECTABLE: string;
}
export declare const dataTypes: {
    STRING: string;
    BOOLEAN: string;
    NUMBER: string;
    GROUPING: string;
}
export declare const nodeTypes: {
    NONROOT: string;
    ROOT: string;
    PROPERTY: string;
    SELECTABLE: string;
}
export declare const formTypes: {
    CREATION: string;
    SINGLE_INSTANCE: string;
    LIST: string;
    SELECTION: string;
}
export declare const unitTypes: {
    INTERACTIVE: string;
    DATA_SOURCE: string;
}
export interface BoilerPlateInfoType {
    formType: string;
    dataType: string;
    nodeType: string;
}
export declare const boilerPlateTypes: {
    CREATION_ROOT: string;
    CREATION_NON_ROOT: string;
    CREATION_SELECTABLE: string;
    CREATION_ROOT_GROUPING: string;
    CREATION_NON_ROOT_GROUPING: string;
    MULTIPLE_NON_ROOT: string;
    MULTIPLE_SELECTABLE: string;
    MULTIPLE_ROOT: string;
    MULTIPLE_NON_ROOT_GROUPING: string;
    MULTIPLE_ROOT_GROUPING: string;
    SINGLE_NON_ROOT: string;
    SINGLE_SELECTABLE: string;
    SINGLE_ROOT: string;
    SINGLE_NON_ROOT_GROUPING: string;
    SINGLE_ROOT_GROUPING: string;
    SINGLE_BOOLEAN: string;
    SINGLE_NUMBER: string;
    SINGLE_PROPERTY: string;
    SELECTION: string;
}
export declare const boilerPlates: {
    [x: string]: string;
}
export declare const boilerplateDir: string
