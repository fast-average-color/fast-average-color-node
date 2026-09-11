import { jest } from '@jest/globals';
import sharp from 'sharp';
import { getAverageColor } from 'fast-average-color-node';

describe('Image processing', () => {
    it('uses only the bytes within the raw output Buffer', async() => {
        const input = await sharp({
            create: { width: 1, height: 1, channels: 3, background: 'red' },
        }).png().toBuffer();

        const storage = Buffer.alloc(12);
        storage.set([0, 0, 255, 255, 255, 0, 0, 255, 0, 255, 0, 255]);
        const pixel = storage.subarray(4, 8);

        // Model a valid sliced Buffer returned by sharp's no-argument overload.
        const bufferOutput: { toBuffer(): Promise<Buffer> } = sharp.prototype;
        const toBuffer = jest.spyOn(bufferOutput, 'toBuffer').mockResolvedValueOnce(pixel);

        try {
            const result = await getAverageColor(input);
            expect(result.value).toStrictEqual([255, 0, 0, 255]);
        } finally {
            toBuffer.mockRestore();
        }
    });

    it.each<[number, number, 'speed' | 'precision', number, number]>([
        [2000, 20, 'speed', 100, 1],
        [20, 2000, 'speed', 1, 100],
        [2000, 1, 'speed', 100, 1],
        [1, 2000, 'speed', 1, 100],
        [2, 1, 'speed', 2, 1],
        [2000, 20, 'precision', 2000, 20],
    ])('resizes %i x %i in %s mode to %i x %i', async(width, height, mode, outputWidth, outputHeight) => {
        const input = await sharp({
            create: { width, height, channels: 3, background: 'red' },
        }).png().toBuffer();
        const resize = jest.spyOn(sharp.prototype, 'resize');

        try {
            const result = await getAverageColor(input, { mode });
            expect(result.value).toStrictEqual([255, 0, 0, 255]);
            expect(resize).toHaveBeenCalledWith(outputWidth, outputHeight);
        } finally {
            resize.mockRestore();
        }
    });
});
