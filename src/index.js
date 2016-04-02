import Camera from './Camera';
import Scene from './Scene';
import Cube from './Cube';
import Renderer from './Renderer';

const Iso = {
  Camera,
  Cube,
  Scene,
  render: Renderer.render,
};
Object.freeze(Iso);


// Export globally for browserify
window.Iso = Iso;
