import THREE from 'three';
import Mesh from './Mesh';
import Iso from './Iso';

export default class Scene {
  threeScene = new THREE.Scene();
  camera = null;

  constructor(container:HTMLElement) {
    // Fog
    this.threeScene.fog = new THREE.FogExp2(0x000000, 5);

    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.threeScene.add(this.ambientLight);

    // Directional light
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-30, 40, 20);

    light.castShadow = true;
    light.shadow.mapSize = new THREE.Vector2(50, 50);
    var size = 50;
    light.shadow.camera.left = -size;
    light.shadow.camera.right = size;
    light.shadow.camera.top = -size;
    light.shadow.camera.bottom = size;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 100;

    this.threeScene.add(light);

    // light helper
    if (Iso.DEBUG) {
      this.threeScene.add(new THREE.DirectionalLightHelper(light, 0));
      this.threeScene.add(new THREE.CameraHelper(light.shadow.camera));
    }

    // axes
    if (Iso.DEBUG) {
      this.threeScene.add(new THREE.AxisHelper(40));
    }

    // grid
    if (Iso.DEBUG) {
      let geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
      let material = new THREE.MeshBasicMaterial({
        wireframe: true,
        opacity: 0.5,
        transparent: true,
      });
      let grid = new THREE.Mesh(geometry, material);
      grid.rotation.order = 'YXZ';
      grid.rotation.y = -Math.PI / 2;
      grid.rotation.x = -Math.PI / 2;
      this.threeScene.add(grid);
    }

    this.setupCamera(container);
  }

  /**
   * Adds a mesh to the scene
   * @param {Mesh} mesh
   * @returns {Scene}
   */
  add(mesh:Mesh):Scene {
    this.threeScene.add(mesh.threeMesh);
    return this;
  }

  /**
   * Remove a mesh from the scene
   * @param {Mesh} mesh
   * @returns {Scene}
   */
  remove(mesh:Mesh):Scene {
    this.threeScene.remove(mesh.threeMesh);
    return this;
  }

  /**
   * Sets the scene's ambient light color
   * @param color Light's color
   * @param intensity (optional) Light's intensity
   * @returns {Scene}
   */
  setAmbientLight(color:Iso.Color, intensity:?number):Scene {
    this.ambientLight.color = color;
    if (intensity !== undefined) {
      this.ambientLight.intensity = intensity;
    }
    return this;
  }

  setupCamera(container:HTMLElement) {
    // Setup camera
    this.camera = new Iso.Camera({
      x: 10,
      z: 10,
      zoom: 3,
    }, container);
    return this;
  }

  /**
   * World resize callback.
   * @returns {Scene}
   */
  resize():Scene {
    this.camera.resize();
    return this;
  }

  clear():Scene {
    let meshes = this.threeScene.children.filter(c => c instanceof THREE.Mesh);
    for (let child of meshes) {
      this.threeScene.remove(child);
    }
    return this;
  }
}