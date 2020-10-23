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
});
