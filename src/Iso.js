import Camera from './Camera';
import Scene from './Scene';
import Cube from './Cube';
import Renderer from './Renderer';
import OrbitControls from './OrbitControls';
import DebugStats from './DebugStats'
import THREE from 'three';

export default class Iso {
  static DEBUG = false;
  static Camera = Camera;
  static Cube = Cube;
  static Scene = Scene;
  static Renderer = Renderer;
  static Color = THREE.Color;

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
      z: 10,
      zoom: 6,
    }, this.container);
    camera.threeCamera.lookAt(scene.threeScene.position);

    // Render Debug Stats
    if (Iso.DEBUG) {
      var stats = new DebugStats(this.container);
      stats.render();
    }

    // Render
    Renderer.render(scene, camera, this.container);

    // Enable Orbit Controls
    var controls = new OrbitControls(camera.threeCamera, Renderer.renderDomElement);
    controls.addEventListener('change', () => {
      Renderer.render(scene, camera, this.container);
    });
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxPolarAngle = Math.PI / 2;
  }
}

// Export globally for browserify
window.Iso = Iso;
