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

  firstRender = true;
  camera = null;

  /**
   * Create a new Iso world.
   * @param container The DOMNode container.
   */
  constructor(container) {
    this.container = container;

    // Setup camera
    this.camera = new Iso.Camera({
      x: 10,
      z: 10,
      zoom: 6,
    }, this.container);
  }

  render(scene:Scene) {
    this.camera.threeCamera.lookAt(scene.threeScene.position);

    // Render Debug Stats
    if (Iso.DEBUG) {
      var stats = new DebugStats(this.container);
      stats.render();
    }

    // Render
    Renderer.render(scene, this.camera, this.container);

    if (this.firstRender) {
      this.firstRender = false;

      // Enable Orbit Controls
      var controls = new OrbitControls(this.camera.threeCamera, Renderer.renderDomElement);
      controls.addEventListener('change', () => {
        Renderer.render(scene, this.camera, this.container);
      });
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.maxPolarAngle = Math.PI / 2;
    }
  }
}

// Export globally for browserify
window.Iso = Iso;
