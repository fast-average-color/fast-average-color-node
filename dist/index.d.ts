/// <reference types="node" />
import { IFastAverageColorOptions, IFastAverageColorResult } from 'fast-average-color';
export declare function getAverageColor(filename: string | Buffer, options?: IFastAverageColorOptions): Promise<IFastAverageColorResult>;
