# iso.js

WORK IN PROGRESS...

A library for isometric graphics using [three.js](https://github.com/mrdoob/three.js/).

TODO INCLUDE LOGO (spell out ISO with cubes)
<img align="right" src="doc/subpagelist.png">

A library for isometric graphics using three.js.

[Project Page](https://grant.github.io/iso.js)

## Usage

```hs
npm install iso.js --save
```

TODO
...short code snippet...
...pretty hello world image...

#### Browserify

You can use [browserify](http://browserify.org/) to bundle this library with your code.

```js
import {Cube, Camera} from Iso;
// TODO
```

## Documentation

See [examples/](examples/) for documented code.

The main components are `Iso`, `Cube`. Additional components include `Color`, `Renderer`.

#### `Iso` - An Isometric World
- `Iso.DEBUG`:`boolean` - Turn on debugging visuals (XYZ axes, Grid, Light)
- `Iso.add(object)`
- `Iso.clear()` - Remove all objects from the world

##### `Iso.Cube(width, height, depth)`
- `Cube.position(x, y, z)`
- `Cube.color(color:Iso.Color)`
- `Cube.opacity(opacity)`

##### `Iso.Camera` - The global isometric perspective camera for this world.
- `Camera.zoom(zoomLevel)`
- `Camera.pan(x, y)`

##### `Iso.Renderer` - The world renderer.
- `Renderer.SHADOWS_ENABLED`:`boolean` - Turn on shadows

## Build

*iso.js* uses Babel and Browserify for build tools. Run the file watcher and flow typechecker:

```sh
npm install
npm run watch # watches and builds npm version
npm run watch-browser # watches and builds packaged browser version
```

This will generate `build/` files and log type mistakes to the console.

## Similar libraries
- https://github.com/jdan/isomer
- https://github.com/nosir/obelisk.js

The key differences between these libraries and *iso.js* are:
- **Performance** (WebGL)
- **3D effects** such as lights, shadows, and camera angles.
- **Extensibility**

## Contribute!

Please send pull requests! There are many features I would love to see. <3
