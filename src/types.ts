export type FastAverageColorRgb = [number, number, number];
export type FastAverageColorRgba = [number, number, number, number];
export type FastAverageColorRgbaWithThreshold = [number, number, number, number, number];

export type FastAverageColorIgnoredColor =
    | FastAverageColorRgb
    | FastAverageColorRgba
    | FastAverageColorRgbaWithThreshold
    | Array<FastAverageColorRgb | FastAverageColorRgba | FastAverageColorRgbaWithThreshold>;

export interface FastAverageColorOptions {
    defaultColor?: FastAverageColorRgba;
    ignoredColor?: FastAverageColorIgnoredColor;
    mode?: 'precision' | 'speed';
    algorithm?: 'simple' | 'sqrt' | 'dominant';
    /** Positive safe integer specifying the pixel sampling interval. Defaults to 1. */
    step?: number;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    /** @deprecated Has no effect in the Node.js implementation. */
    silent?: boolean;
    /** @deprecated Has no effect in the Node.js implementation. */
    crossOrigin?: string;
    dominantDivider?: number;
}

export interface FastAverageColorResult {
    rgb: string;
    rgba: string;
    hex: string;
    hexa: string;
    value: FastAverageColorRgba;
    isDark: boolean;
    isLight: boolean;
    error?: Error;
}
