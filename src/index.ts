import sharp from 'sharp';
import { FastAverageColor } from 'fast-average-color';
import type { FastAverageColorOptions, FastAverageColorResult } from './types.js';

export type {
    FastAverageColorRgb,
    FastAverageColorRgba,
    FastAverageColorRgbaWithThreshold,
    FastAverageColorIgnoredColor,
    FastAverageColorOptions,
    FastAverageColorResult,
} from './types.js';

const fac = new FastAverageColor();

const MAX_SIZE = 100;

function prepareSizeAndPosition(originalSize: { width: number; height: number; }, options: FastAverageColorOptions) {
    const srcWidth = options.width ?? originalSize.width;
    const srcHeight = options.height ?? originalSize.height;

    let destWidth = srcWidth;
    let destHeight = srcHeight;

    if (options.mode === 'precision') {
        return {
            srcWidth,
            srcHeight,
            destWidth,
            destHeight
        };
    }

    let factor;

    if (srcWidth > srcHeight) {
        factor = srcWidth / srcHeight;
        destWidth = MAX_SIZE;
        destHeight = Math.max(1, Math.round(destWidth / factor));
    } else {
        factor = srcHeight / srcWidth;
        destHeight = MAX_SIZE;
        destWidth = Math.max(1, Math.round(destHeight / factor));
    }

    if (destWidth > srcWidth || destHeight > srcHeight) {
        destWidth = srcWidth;
        destHeight = srcHeight;
    }

    return {
        srcWidth,
        srcHeight,
        destWidth,
        destHeight
    };
}

export async function getAverageColor(resource: string | Buffer, options: FastAverageColorOptions = {}): Promise<FastAverageColorResult> {
    let input = resource;

    if (typeof resource === 'string') {
        const base64 = resource.split(/^data:image\/.*?;base64,/)[1];

        if (base64) {
            input = Buffer.from(base64, 'base64');
        } else if (resource.search(/^https?:\/\//) !== -1) {
            const response = await fetch(resource);
            const arrayBuffer = await response.arrayBuffer();
            input = Buffer.from(arrayBuffer);
        }
    }

    const left = options.left ?? 0;
    const top = options.top ?? 0;

    let pipe = sharp(input);

    const metadata = await pipe.metadata();

    if (metadata.width && metadata.height) {
        const size = prepareSizeAndPosition({
            width: metadata.width,
            height: metadata.height,
        }, options);

        pipe = pipe.extract({
            left,
            top,
            width: size.srcWidth,
            height: size.srcHeight,
        }).resize(size.destWidth, size.destHeight);
    }

    const buffer = await pipe.ensureAlpha().raw().toBuffer();
    return fac.prepareResult(fac.getColorFromArray4(buffer, options));
}
