import Camera from './Camera';
import Scene from './Scene';
import Cube from './Cube';
import Renderer from './Renderer';
import OrbitControls from './OrbitControls';

export default class Iso {
  static DEBUG = false;
  static Camera = Camera;
  static Cube = Cube;
  static Scene = Scene;

  /**
   * Create a new Iso world.
   * @param container The DOMNode container.
   */
  constructor(container) {
    this.container = container;
  }

  render(scene:Scene) {
    // Setup camera
    var camera = new Iso.Camera({
      x: 10,
      y: 10,
      zoom: 10,
    }, this.container);
    camera.threeCamera.lookAt(scene.threeScene.position);

    // Render
    Renderer.render(scene, camera, this.container);

    // Enable Orbit Controls
    var controls = new OrbitControls(camera.threeCamera, Renderer.renderDomElement);
    controls.addEventListener('change', () => {
      Renderer.render(scene, camera, this.container);
    });
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
  }
}

// Export globally for browserify
window.Iso = Iso;
