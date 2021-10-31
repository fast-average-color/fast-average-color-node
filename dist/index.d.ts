/// <reference types="node" />
import { FastAverageColorOptions, FastAverageColorResult } from 'fast-average-color';
export declare function getAverageColor(filename: string | Buffer, options?: FastAverageColorOptions): Promise<FastAverageColorResult>;
