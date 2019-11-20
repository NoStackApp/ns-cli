export declare const promptTypes: {
    TEXT: string;
    NUMBER: string;
    PASSWORD: string;
};
export declare const promptUser: (paramName: string, promptType: string, message: string, testValue: Function) => Promise<any>;
