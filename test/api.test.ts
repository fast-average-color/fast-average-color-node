import { getAverageColor } from '../src/index';
import { readFileSync } from 'fs';

describe('API', () => {
    const imagePath = './test/images/';

    const sunflowerImage = `${imagePath}sunflower.jpg`;
    const sunflowerAverageColor = [193, 183, 128, 255];

    const fruitsImage = `${imagePath}fruits.png`;
    const fruitsBase64 = `${imagePath}fruits.base64`;
    const fruitsAverageColor = [244, 145, 11, 255];

    it('getAverageColor(), file', async() => {
        const result = await getAverageColor(sunflowerImage);

        expect(result.value).toStrictEqual(sunflowerAverageColor);
    });

    it('getAverageColor(), unknown file', async() => {
        expect.assertions(1);

        try {
            await getAverageColor('./unknown_file');
        } catch (e) {
            expect(e.code).toEqual('ENOENT');
        }
    });

    it('getAverageColor(), Buffer', async() => {
        const buffer = readFileSync(sunflowerImage);
        const result = await getAverageColor(buffer);

        expect(result.value).toStrictEqual(sunflowerAverageColor);
    });

    it('getAverageColor(), data64', async() => {
        const data64 = readFileSync(fruitsBase64, 'utf8');
        const result64 = await getAverageColor(data64);
        expect(result64.value).toStrictEqual(fruitsAverageColor);

        const result = await getAverageColor(fruitsImage);
        expect(result.value).toStrictEqual(fruitsAverageColor);
    });

    it('getAverageColor(), options: left, top, width, height', async() => {
        const result1 = await getAverageColor(fruitsImage, { left: 0, top: 0, width: 100, height: 100 });
        expect(result1.value).toStrictEqual([
            248,
            231,
            21,
            255,
        ]);

        const result2 = await getAverageColor(fruitsImage, { left: 133, top: 0, width: 100, height: 100 });
        expect(result2.value).toStrictEqual([
            255,
            133,
            0,
            255
        ]);

        const result3 = await getAverageColor(fruitsImage, { left: 450, top: 0, width: 50, height: 100 });
        expect(result3.value).toStrictEqual([
            250,
            30,
            3,
            255
        ]);
    });
});
