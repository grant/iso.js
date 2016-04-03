export default class Cube {
  threeCube = null;

  constructor(width = 1, height = 1, depth = 1) {
    this.width = width;
    this.height = height;
    this.width = width;

    let geometry = new THREE.BoxGeometry(width, height, depth);

    // material
    let material = new THREE.MeshLambertMaterial({
      color: 0x0aeedf
    });

    this.xyz = {x: 0, y: 0, z: 0};
    this.threeCube = new THREE.Mesh(geometry, material);
  }

  position(xyz) {
    this.xyz = Object.assign(this.xyz, xyz);
    this.threeCube.position.set(xyz.x, xyz.y, xyz.z);
  }
}