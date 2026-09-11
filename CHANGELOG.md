# v4.0.0
- Breaking: requires Node.js 20.9.0 or later, matching sharp 0.35.4.
- Breaking: the package is now ESM-only. Replace `require()` with `import` or dynamic `import()`.
- Added package exports for the ESM entry point and TypeScript declarations. Import the package by name; internal subpaths are no longer exported.
- Added public Node.js types without DOM dependencies.
- Fixed raw Buffer handling to respect byte offsets and lengths.
- Improved speed mode for narrow images by allowing the resized short side to be one pixel.

# v3.3.0
- Updated deps in package.json

# v3.2.0
- Updated deps in package.json

# v3.1.0
- Removed node-fetch package in deps

# v3.0.0
- Updated sharp v0.33.2
- Drop support for Node.js 14 and 16

# v2.7.0
- Updated deps in package.json

# v2.6.0
- Updated deps in package.json

# v2.5.0
- Updated deps in package.json

# v2.4.0
- Updated deps in package.json

# v2.3.0
- Updated deps in package.json

# v2.2.0
- Added support for absolute urls
- Updated deps in package.json

# v2.1.0
Updated deps in package.json

# v2.0.0
- `canvas` replaced with `sharp` package for Apple M1 support.
- Added support for `mode` option. `mode: 'speed'` by default.

# v1.0.3
Fixes for typings.

# v1.0.2
Fixes for options: left, top, width and height #1.

# v1.0.1
Fixes for typings.
