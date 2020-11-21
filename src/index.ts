import { createCanvas, loadImage } from 'canvas';
import FastAverageColor from 'fast-average-color';

const fac = new FastAverageColor();

export async function getAverageColor(filename: string | Buffer, options?: IFastAverageColorOptions): Promise<IFastAverageColorResult> {
    const image = await loadImage(filename);

    const naturalWidth = image.width;
    const naturalHeight = image.height;

    const canvas = createCanvas(naturalWidth, naturalHeight);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    const left = options?.left ?? 0;
    const top = options?.top ?? 0;
    const width = options?.width ?? naturalWidth;
    const height = options?.height ?? naturalHeight;

    const imageData = context.getImageData(left, top, width, height);

    return fac.prepareResult(fac.getColorFromArray4(imageData.data, options));
}
