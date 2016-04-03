import THREE from 'three';
import Iso from './';

export default class Scene {
  threeScene = new THREE.Scene();

  constructor() {
    this.threeScene.add(new THREE.AmbientLight(0x333333));

    // light
    var light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(-50, 100, 50);
    this.threeScene.add(light);

    // light helper
    if (Iso.DEBUG) {
      this.threeScene.add(new THREE.DirectionalLightHelper(light, 0));
    }

    // axes
    if (Iso.DEBUG) {
      this.threeScene.add(new THREE.AxisHelper(40));
    }

    // grid
    if (Iso.DEBUG) {
      let geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
      let material = new THREE.MeshBasicMaterial({wireframe: true, opacity: 0.5, transparent: true});
      let grid = new THREE.Mesh(geometry, material);
      grid.rotation.order = 'YXZ';
      grid.rotation.y = -Math.PI / 2;
      grid.rotation.x = -Math.PI / 2;
      this.threeScene.add(grid);
    }

    // Add a box
    // geometry
    let geometry = new THREE.BoxGeometry(10, 10, 10);

    // material
    let material = new THREE.MeshLambertMaterial({
      color: 0x0aeedf
    });

    // mesh
    let mesh = new THREE.Mesh(geometry, material);

    //this.threeScene.add(mesh);
  }

  add(cube) {
    this.threeScene.add(cube.threeCube)
  }
}