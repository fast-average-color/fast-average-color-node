import { getAverageColor } from '../src/index';
import { readFileSync } from 'fs';

describe('API', () => {
    const IMAGE_PATH = './test/images/';

    const SUNFLOWER_IMAGE = `${IMAGE_PATH}sunflower.jpg`;
    const SUNFLOWER_AVERAGE_COLOR = [193, 183, 128, 255];

    const FRUITS_IMAGE = `${IMAGE_PATH}fruits.png`;
    const FRUITS_BASE64 = `${IMAGE_PATH}fruits.base64`;
    const FRUITS_AVERAGE_COLOR = [244, 145, 11, 255];

    it('getAverageColor(), file', async() => {
        const result = await getAverageColor(SUNFLOWER_IMAGE);

        expect(result).toStrictEqual(SUNFLOWER_AVERAGE_COLOR);
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
        const buffer = readFileSync(SUNFLOWER_IMAGE);
        const result = await getAverageColor(buffer);

        expect(result).toStrictEqual(SUNFLOWER_AVERAGE_COLOR);
    });

    it('getAverageColor(), data64', async() => {
        const data64 = readFileSync(FRUITS_BASE64, 'utf8');
        const result64 = await getAverageColor(data64);
        expect(result64).toStrictEqual(FRUITS_AVERAGE_COLOR);

        const result = await getAverageColor(FRUITS_IMAGE);
        expect(result).toStrictEqual(FRUITS_AVERAGE_COLOR);
    });
});
