import {
    getAverageColor,
    type FastAverageColorOptions,
    type FastAverageColorResult,
    type FastAverageColorRgba,
} from 'fast-average-color-node';

const options: FastAverageColorOptions = {
    mode: 'precision',
    algorithm: 'dominant',
    defaultColor: [0, 0, 0, 0],
    ignoredColor: [[0, 0, 0], [255, 255, 255, 255, 10]],
    step: 1,
    dominantDivider: 24,
};

async function checkTypes(resource: Buffer): Promise<FastAverageColorRgba> {
    const color: FastAverageColorResult = await getAverageColor(resource, options);

    return color.value;
}

void checkTypes;

// @ts-expect-error Only supported algorithms should be accepted.
getAverageColor(Buffer.alloc(0), { algorithm: 'unknown' });
