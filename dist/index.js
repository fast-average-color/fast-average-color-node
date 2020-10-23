"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageColor = void 0;
const canvas_1 = require("canvas");
const fast_average_color_1 = __importDefault(require("fast-average-color"));
const fac = new fast_average_color_1.default();
async function getAverageColor(filename, options) {
    const image = await canvas_1.loadImage(filename);
    const { width, height } = image;
    const canvas = canvas_1.createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);
    return fac.prepareResult(fac.getColorFromArray4(imageData.data, options));
}
exports.getAverageColor = getAverageColor;
