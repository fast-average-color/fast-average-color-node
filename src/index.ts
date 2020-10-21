import { createCanvas, loadImage } from 'canvas';
import FastAverageColor from 'fast-average-color';

const fac = new FastAverageColor();

export async function getAverageColor(filename: string | Buffer, options?: IFastAverageColorOptions): Promise<IFastAverageColorRgba> {
    const image = await loadImage(filename);
    const { width, height } = image;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, width, height);

    return fac.getColorFromArray4(imageData.data, options);
}
