import { BoilerPlateInfoType } from '../../constants';
import { StackInfo } from '../../constants/types';
export declare function generateTypeFile(type: string, source: string, boilerPlateInfo: BoilerPlateInfoType, currentStack: StackInfo): Promise<void>;
