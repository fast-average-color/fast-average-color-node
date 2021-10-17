import sharp from 'sharp';
import { default as FastAverageColor, IFastAverageColorOptions, IFastAverageColorResult } from 'fast-average-color';

const fac = new FastAverageColor();

const MIN_SIZE = 10;
const MAX_SIZE = 100;

function prepareSizeAndPosition(originalSize: { width: number; height: number; }, options: IFastAverageColorOptions) {
    const srcLeft = options.left ?? 0;
    const srcTop = options.top ?? 0;
    const srcWidth = options.width ?? originalSize.width;
    const srcHeight = options.height ?? originalSize.height;

    let destWidth = srcWidth;
    let destHeight = srcHeight;

    if (options.mode === 'precision') {
        return {
            srcLeft,
            srcTop,
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
        destHeight = Math.round(destWidth / factor);
    } else {
        factor = srcHeight / srcWidth;
        destHeight = MAX_SIZE;
        destWidth = Math.round(destHeight / factor);
    }

    if (
        destWidth > srcWidth || destHeight > srcHeight ||
        destWidth < MIN_SIZE || destHeight < MIN_SIZE
    ) {
        destWidth = srcWidth;
        destHeight = srcHeight;
    }

    return {
        srcLeft,
        srcTop,
        srcWidth,
        srcHeight,
        destWidth,
        destHeight
    };
}

export async function getAverageColor(filename: string | Buffer, options: IFastAverageColorOptions = {}): Promise<IFastAverageColorResult> {
    let input = filename;

    if (typeof filename === 'string') {
        const base64 = filename.split(/^data:image\/.*?;base64,/)[1];

        if (base64) {
            input = Buffer.from(base64, 'base64');
        }
    }

    const left = options.left ?? 0;
    const top = options.top ?? 0;

    let pipe = await sharp(input);

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
    const pixelArray = new Uint8Array(buffer.buffer);

    return fac.prepareResult(fac.getColorFromArray4(pixelArray, options));
}
