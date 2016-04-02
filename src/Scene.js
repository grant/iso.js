import THREE from 'three';

export default class Scene {
  threeScene = new THREE.Scene();
  constructor() {
    this.threeScene.add(new THREE.AmbientLight(0x444444));

    var light = new THREE.PointLight(0xffffff, 0.8);
    light.position.set(0, 50, 50);
    this.threeScene.add(light);



    // axes
    //scene.add(new THREE.AxisHelper(40));

    // grid
    //var geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
    //var material = new THREE.MeshBasicMaterial({wireframe: true, opacity: 0.5, transparent: true});
    //var grid = new THREE.Mesh(geometry, material);
    //grid.rotation.order = 'YXZ';
    //grid.rotation.y = -Math.PI / 2;
    //grid.rotation.x = -Math.PI / 2;
    //scene.add(grid);



    // Add a box

    // geometry
    var geometry = new THREE.BoxGeometry(10, 10, 10);

    // material
    var material = new THREE.MeshNormalMaterial();

    // mesh
    var mesh = new THREE.Mesh(geometry, material);
    this.threeScene.add(mesh);
  }
}