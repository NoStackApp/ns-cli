import { boilerPlateInfoType } from '../constants';
import { StackInfo } from '../constants/types';
export declare function createTypeFile(type: string, source: string, boilerPlateInfo: boilerPlateInfoType, currentStack: StackInfo): Promise<void>;
