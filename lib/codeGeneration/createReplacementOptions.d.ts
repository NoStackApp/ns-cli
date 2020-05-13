import {StackInfo} from '../constants/types'
export interface ReplacementOptions {
    files: string;
    from: RegExp[];
    to: string[];
}
export declare const createReplacementOptions: (type: string, source: string, currentStack: StackInfo) => ReplacementOptions
