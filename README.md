# 🍏🍊🍅 [Fast Average Color](https://github.com/fast-average-color/fast-average-color/) for Node.js
[![NPM version](https://img.shields.io/npm/v/fast-average-color-node.svg)](https://www.npmjs.com/package/fast-average-color-node)
[![NPM Downloads](https://img.shields.io/npm/dm/fast-average-color-node.svg?style=flat)](https://www.npmjs.org/package/fast-average-color-node)
[![install size](https://packagephobia.com/badge?p=fast-average-color-node)](https://packagephobia.com/result?p=fast-average-color-node)

A simple library that calculates the average color of images in Node.js.

## Supported formats
- `jpeg`
- `png`
- `webp`
- `gif`
- `svg`

## Input sources
- File path
- HTTP or HTTPS URL
- `Buffer` containing image data
- Base64-encoded data URL, such as `data:image/png;base64,...` (not a raw base64 string)

## Install
Requires Node.js 20.9.0 or later.

`npm i --save fast-average-color-node`

## Usage
Starting with v4, this package is ESM-only. Use `import` in an `.mjs` file
or set `"type": "module"` in your project's `package.json`.

For CommonJS projects, use dynamic `import()` inside an async function:

```js
async function printAverageColor() {
    const { getAverageColor } = await import('fast-average-color-node');
    console.log(await getAverageColor('./image.png'));
}

printAverageColor();
```

`require('fast-average-color-node')` is no longer supported.

### ESM examples
```js
import { getAverageColor } from 'fast-average-color-node';

getAverageColor('./image.png').then(color => {
    console.log(color);
});
```
or
```js
import { getAverageColor } from 'fast-average-color-node';

async function printAverageColor() {
    const color = await getAverageColor('./image.png');
    console.log(color);
}

printAverageColor();
```

## API
TypeScript types are available from the package without requiring the DOM library:

```ts
import { getAverageColor, type FastAverageColorOptions } from 'fast-average-color-node';

const options: FastAverageColorOptions = { mode: 'precision' };
const color = await getAverageColor('./image.png', options);
```

### `getAverageColor(resource, options)`

#### Parameters
```js
/**
 * @param {string | Buffer} resource File path, HTTP(S) URL, image Buffer or base64-encoded data URL
 * @param {Object} [options]
 * @param {number[]} [options.defaultColor=[0, 0, 0, 0]] Fallback RGBA color when no pixels contribute to the result
 * @param {number[] | number[][]} [options.ignoredColor] RGB, RGBA or RGBA + threshold; a single color or an array of colors
 * @param {string} [options.mode="speed"] "speed" resizes large regions; "precision" uses the original resolution
 * @param {string} [options.algorithm="sqrt"] "simple", "sqrt" or "dominant"
 * @param {number} [options.step=1] Pixel sampling interval; must be a positive safe integer
 * @param {number} [options.left=0] Left offset of the region in pixels
 * @param {number} [options.top=0] Top offset of the region in pixels
 * @param {number} [options.width] Region width in pixels; defaults to the full image width
 * @param {number} [options.height] Region height in pixels; defaults to the full image height
 * @param {number} [options.dominantDivider=24] Color grouping divisor for the "dominant" algorithm
 */
```

RGBA arrays use values from 0 to 255 for all four channels, including alpha.
`ignoredColor` also accepts `[red, green, blue, alpha, threshold]` to match a
range of channel values. An RGB entry also excludes all non-opaque pixels.

The selected region must fit within the image. When setting `left` or `top`,
also set `width` or `height` as needed: their defaults do not shrink to account
for the offset.

The inherited `silent` option has no effect in this Node.js wrapper.

### Return value
A Promise that resolves to a color result with the following properties:

```js
/**
 * @typedef {Object} ColorResult
 * @property {string} rgb CSS rgb() color
 * @property {string} rgba CSS rgba() color with alpha from 0 to 1
 * @property {string} hex Hex color in #rrggbb format
 * @property {string} hexa Hex color in #rrggbbaa format
 * @property {boolean} isDark Whether the color is dark
 * @property {boolean} isLight Whether the color is light
 * @property {number[]} value [red, green, blue, alpha], each from 0 to 255
 */
```

Image loading, decoding and processing errors reject the Promise. Handle them
with `try/catch` when using `await`, or with `.catch()`. They are not returned in
`color.error`; that inherited property is `undefined` on successful results.
`defaultColor` does not replace error handling.

## [License](LICENSE)
MIT License

## Links
- [fast-average-color](https://github.com/fast-average-color/fast-average-color/)

## Friends
- [Check device online](https://checkdevice.online/?from=github-fac-node)
