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
    var _a, _b, _c, _d;
    const image = await canvas_1.loadImage(filename);
    const naturalWidth = image.width;
    const naturalHeight = image.height;
    const canvas = canvas_1.createCanvas(naturalWidth, naturalHeight);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const left = (_a = options === null || options === void 0 ? void 0 : options.left) !== null && _a !== void 0 ? _a : 0;
    const top = (_b = options === null || options === void 0 ? void 0 : options.top) !== null && _b !== void 0 ? _b : 0;
    const width = (_c = options === null || options === void 0 ? void 0 : options.width) !== null && _c !== void 0 ? _c : naturalWidth;
    const height = (_d = options === null || options === void 0 ? void 0 : options.height) !== null && _d !== void 0 ? _d : naturalHeight;
    const imageData = context.getImageData(left, top, width, height);
    return fac.prepareResult(fac.getColorFromArray4(imageData.data, options));
}
exports.getAverageColor = getAverageColor;
