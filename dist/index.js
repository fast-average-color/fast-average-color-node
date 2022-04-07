"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageColor = void 0;
const sharp_1 = __importDefault(require("sharp"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const fast_average_color_1 = __importDefault(require("fast-average-color"));
const fac = new fast_average_color_1.default();
const MIN_SIZE = 10;
const MAX_SIZE = 100;
function prepareSizeAndPosition(originalSize, options) {
    var _a, _b, _c, _d;
    const srcLeft = (_a = options.left) !== null && _a !== void 0 ? _a : 0;
    const srcTop = (_b = options.top) !== null && _b !== void 0 ? _b : 0;
    const srcWidth = (_c = options.width) !== null && _c !== void 0 ? _c : originalSize.width;
    const srcHeight = (_d = options.height) !== null && _d !== void 0 ? _d : originalSize.height;
    let destWidth = srcWidth;
    let destHeight = srcHeight;
    if (options.mode === 'precision') {
        return {
            srcLeft,
            srcTop,
            srcWidth,
            srcHeight,
            destWidth,
            destHeight
        };
    }
    let factor;
    if (srcWidth > srcHeight) {
        factor = srcWidth / srcHeight;
        destWidth = MAX_SIZE;
        destHeight = Math.round(destWidth / factor);
    }
    else {
        factor = srcHeight / srcWidth;
        destHeight = MAX_SIZE;
        destWidth = Math.round(destHeight / factor);
    }
    if (destWidth > srcWidth || destHeight > srcHeight ||
        destWidth < MIN_SIZE || destHeight < MIN_SIZE) {
        destWidth = srcWidth;
        destHeight = srcHeight;
    }
    return {
        srcLeft,
        srcTop,
        srcWidth,
        srcHeight,
        destWidth,
        destHeight
    };
}
async function getAverageColor(resource, options = {}) {
    var _a, _b;
    let input = resource;
    if (typeof resource === 'string') {
        const base64 = resource.split(/^data:image\/.*?;base64,/)[1];
        if (base64) {
            input = Buffer.from(base64, 'base64');
        }
        else if (resource.search(/^https?:\/\//) !== -1) {
            const response = await (0, node_fetch_1.default)(resource);
            const arrayBuffer = await response.arrayBuffer();
            input = Buffer.from(arrayBuffer);
        }
    }
    const left = (_a = options.left) !== null && _a !== void 0 ? _a : 0;
    const top = (_b = options.top) !== null && _b !== void 0 ? _b : 0;
    let pipe = await (0, sharp_1.default)(input);
    const metadata = await pipe.metadata();
    if (metadata.width && metadata.height) {
        const size = prepareSizeAndPosition({
            width: metadata.width,
            height: metadata.height,
        }, options);
        pipe = pipe.extract({
            left,
            top,
            width: size.srcWidth,
            height: size.srcHeight,
        }).resize(size.destWidth, size.destHeight);
    }
    const buffer = await pipe.ensureAlpha().raw().toBuffer();
    const pixelArray = new Uint8Array(buffer.buffer);
    return fac.prepareResult(fac.getColorFromArray4(pixelArray, options));
}
exports.getAverageColor = getAverageColor;
