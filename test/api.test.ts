import { readFileSync } from 'fs';
import { getAverageColor } from '../src/index';

describe('API', () => {
    const fruitsSpeedAverageColor = [231, 147, 49, 255];
    const fruitsPrecisionAverageColor = [232, 148, 50, 255];

    const imagePath = './test/images/';
    const fruitsUrl = 'https://github.com/fast-average-color/fast-average-color-node/raw/main/test/images/fruits.png';
    const fruitsImage = `${imagePath}fruits.png`;
    const fruitsBase64 = `${imagePath}fruits.base64`;

    it('getAverageColor(), file', async() => {
        const result = await getAverageColor(fruitsImage);

        expect(result.value).toStrictEqual(fruitsSpeedAverageColor);
    });

    it('getAverageColor(), data64', async() => {
        const data64 = readFileSync(fruitsBase64, 'utf8');
        const result64 = await getAverageColor(data64);
        expect(result64.value).toStrictEqual(fruitsSpeedAverageColor);
    });

    it('getAverageColor(), absolute url', async() => {
        const result64 = await getAverageColor(fruitsUrl);
        expect(result64.value).toStrictEqual(fruitsSpeedAverageColor);
    });

    it('getAverageColor(), file, mode: precision', async() => {
        const result = await getAverageColor(fruitsImage, { mode: 'precision' });

        expect(result.value).toStrictEqual(fruitsPrecisionAverageColor);
    });

    it('getAverageColor(), unknown file', async() => {
        expect.assertions(1);

        try {
            await getAverageColor('./unknown_file');
        } catch (e) {
            expect((e as Error).message).toEqual('Input file is missing: ./unknown_file');
        }
    });

    it('getAverageColor(), Buffer', async() => {
        const buffer = readFileSync(fruitsImage);
        const result = await getAverageColor(buffer);

        expect(result.value).toStrictEqual(fruitsSpeedAverageColor);
    });

    it('getAverageColor(), Buffer, mode: precision', async() => {
        const buffer = readFileSync(fruitsImage);
        const result = await getAverageColor(buffer, { mode: 'precision' });

        expect(result.value).toStrictEqual(fruitsPrecisionAverageColor);
    });

    it('getAverageColor(), options: left, top, width, height', async() => {
        const result1 = await getAverageColor(fruitsImage, { left: 0, top: 0, width: 100, height: 100 });
        expect(result1.value).toStrictEqual([
            248,
            225,
            53,
            255,
        ]);

        const result2 = await getAverageColor(fruitsImage, { left: 133, top: 0, width: 100, height: 100 });
        expect(result2.value).toStrictEqual([
            240,
            139,
            51,
            255,
        ]);

        const result3 = await getAverageColor(fruitsImage, { left: 450, top: 0, width: 50, height: 100 });
        expect(result3.value).toStrictEqual([
            229,
            68,
            50,
            255
        ]);
    });
});
