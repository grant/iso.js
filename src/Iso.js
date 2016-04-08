import Camera from './Camera';
import Scene from './Scene';
import Cube from './Cube';
import Renderer from './Renderer';
import DebugStats from './DebugStats'
import THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

export default class Iso {
  static DEBUG = false;
  static Camera = Camera;
  static Cube = Cube;
  static Renderer = Renderer;
  static Color = THREE.Color;

  container = null;
  firstRender = true;
  scene = null;

  /**
   * Create a new Iso world.
   * @param container The DOMNode container.
   */
  constructor(container:HTMLElement) {
    this.container = container;
    this.scene = new Scene(container);
  }

  /**
   * Adds an object to the scene
   * @param object The Iso Cube
   * @returns {Iso}
   */
  add(object):Iso {
    this.scene.add(object);
    return this;
  }

  /**
   * Clears the scene from all objects
   * @returns {Iso}
   */
  clear():Iso {
    this.scene.clear();
    return this;
  }

  render() {
    let scene = this.scene;
    let camera = scene.camera;
    camera.threeCamera.lookAt(scene.threeScene.position);

    // Render Debug Stats
    if (Iso.DEBUG) {
      var stats = new DebugStats(this.container);
      stats.render();
    }

    // Render
    Renderer.render(scene, this.container);

    if (this.firstRender) {
      this.firstRender = false;

      // Enable Orbit Controls
      var controls = new OrbitControls(scene.camera.threeCamera, Renderer.renderDomElement);
      controls.addEventListener('change', () => {
        Renderer.render(scene, this.container);
      });
      controls.enableZoom = true;
      controls.enablePan = true;
      //controls.maxPolarAngle = Math.PI / 2;
    }
  }

  /**
   * World resize callback
   *
   * Currently doesn't work. :(
   *
   * <pre>
   * window.addEventListener('resize', function() {
   *   world.resize();
   * });
   * </pre>
   */
  resize() {
    this.scene.resize();
    Renderer.resize(this.container);
    this.render();
  }
}

// Export globally for browserify
if (!!window) {
  window.Iso = Iso;
}
