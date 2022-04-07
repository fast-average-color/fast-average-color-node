# [Fast Average Color](https://github.com/fast-average-color/fast-average-color/) for Node.js
[![NPM version](https://img.shields.io/npm/v/fast-average-color-node.svg)](https://www.npmjs.com/package/fast-average-color-node)
[![NPM Downloads](https://img.shields.io/npm/dm/fast-average-color-node.svg?style=flat)](https://www.npmjs.org/package/fast-average-color-node)

A simple library that calculates the average color of any images for Node.js.

## Install
`npm i save fast-average-color-node`

## Using
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
};

printAverageColor();
```

## API
### `getAverageColor(filename, options)`

#### Parameters
```js
/**
 * @param {string | Buffer} [filename] filename, url, Buffer or data64 string
 * @param {Object} [options]
 * @param {number[]}  [options.defaultColor=[0, 0, 0, 0]]
 * @param {number[]}  [options.ignoredColor] [red (0-255), green (0-255), blue (0-255), alpha (0-255)]
 * @param {string} [options.mode="speed"] "precision" or "speed"
 * @param {string} [options.algorithm="sqrt"] "simple", "sqrt" or "dominant"
 * @param {number} [options.step=1]
 * @param {number} [options.left=0]
 * @param {number} [options.top=0]
 * @param {number} [options.width=width of resource]
 * @param {number} [options.height=height of resource]
 * @param {boolean} [options.silent] Disable error output via console.error
 */
```

### Return value
The promise with value.

```js
/**
 * @param {Object} [color]
 * @param {string} [color.rgb]
 * @param {string} [color.rgba]
 * @param {string} [color.hex]
 * @param {string} [color.hexa]
 * @param {boolean} [color.isDark]
 * @param {boolean} [color.isLight]
 * @param {number[]} [color.value]
 * @param {Error} [color.error]
 */
```

## [License](LICENSE)
MIT License

## Links
- [fast-average-color](https://github.com/fast-average-color/fast-average-color/)

