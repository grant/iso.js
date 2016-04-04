import THREE from 'three';
import Iso from './Iso';

export default class Scene {
  threeScene = new THREE.Scene();

  constructor() {
    // Fog
    this.threeScene.fog = new THREE.FogExp2(0x000000, 5);

    // Ambient light
    this.threeScene.add(new THREE.AmbientLight(0x999999));

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
        transparent: true
      });
      let grid = new THREE.Mesh(geometry, material);
      grid.rotation.order = 'YXZ';
      grid.rotation.y = -Math.PI / 2;
      grid.rotation.x = -Math.PI / 2;
      this.threeScene.add(grid);
    }
  }

  add(mesh):Scene {
    this.threeScene.add(mesh.threeCube);
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