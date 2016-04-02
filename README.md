# iso
## A library for rendering isometric graphics

An isometric project graphics library using three.js's orthographic camera

See examples

```sh
npm install iso3d --save
```

## Usage

```js
import {Cube, Camera} from Iso;
...
```

## Documentation

### Iso.Camera
The global camera for this scene.
#### Camera.zoom(zoomLevel)
#### Camera.position(x, y)
### Iso.Cube(width, height, depth, [options])
- options
  - color


## Build

Run the file watcher and flow typechecker:

```
npm install
npm run watch
```

This will generate `build/` files and log type mistakes to the console. 

## Similar libraries
- https://github.com/jdan/isomer
- https://github.com/nosir/obelisk.js
