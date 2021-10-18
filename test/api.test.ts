import { readFileSync } from 'fs';
import { getAverageColor } from '../src/index';

describe('API', () => {
    const sunflowerSpeedAverageColor = [192, 183, 127, 255];
    const sunflowerPrecisionAverageColor = [193, 183, 127, 255];

    const imagePath = './test/images/';
    const sunflowerImage = `${imagePath}sunflower.jpg`;
    const sunflowerBase64 = `${imagePath}sunflower.base64`;
    const fruitsImage = `${imagePath}fruits.png`;

    it('getAverageColor(), file', async() => {
        const result = await getAverageColor(sunflowerImage);

        expect(result.value).toStrictEqual(sunflowerSpeedAverageColor);
    });

    it('getAverageColor(), data64', async() => {
        const data64 = readFileSync(sunflowerBase64, 'utf8');
        const result64 = await getAverageColor(data64);
        expect(result64.value).toStrictEqual(sunflowerSpeedAverageColor);
    });

    it('getAverageColor(), file, mode: precision', async() => {
        const result = await getAverageColor(sunflowerImage, { mode: 'precision' });

        expect(result.value).toStrictEqual(sunflowerPrecisionAverageColor);
    });

    it('getAverageColor(), unknown file', async() => {
        expect.assertions(1);

        try {
            await getAverageColor('./unknown_file');
        } catch (e) {
            expect((e as Error).message).toEqual('Input file is missing');
        }
    });

    it('getAverageColor(), Buffer', async() => {
        const buffer = readFileSync(sunflowerImage);
        const result = await getAverageColor(buffer);

        expect(result.value).toStrictEqual(sunflowerSpeedAverageColor);
    });

    it('getAverageColor(), Buffer, mode: precision', async() => {
        const buffer = readFileSync(sunflowerImage);
        const result = await getAverageColor(buffer, { mode: 'precision' });

        expect(result.value).toStrictEqual(sunflowerPrecisionAverageColor);
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
