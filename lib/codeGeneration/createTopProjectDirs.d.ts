import {StackInfo} from '../constants/types'
declare let appDir: string
declare let srcDir: string
declare let compDir: string
declare let sourcePropsDir: string
export declare function createTopProjectDirs(currentStack: StackInfo, appDir: string): Promise<void>;
export {sourcePropsDir}
export {compDir}
export {srcDir}
export {appDir}
