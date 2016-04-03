import THREE from 'three';

export default class Cube {
  threeCube = null;
  xyz = {x: 0, y: 0, z: 0};
  cubeColor = new THREE.Color('rgb(10, 238, 223)');

  constructor(width = 1, height = 1, depth = 1) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    // geometry
    let geometry = new THREE.BoxGeometry(width, height, depth);

    // material
    let material = new THREE.MeshLambertMaterial({
      color: this.cubeColor,
    });

    this.threeCube = new THREE.Mesh(geometry, material);

    // shadow
    this.threeCube.castShadow = true;
    this.threeCube.receiveShadow = true;
  }

  position(xyz) {
    this.xyz = xyz;
    this.threeCube.position.set(xyz.x, xyz.y, xyz.z);
    return this;
  }

  color(color:THREE.Color) {
    this.cubeColor = color;
    this.threeCube.material.color = this.cubeColor;
    return this;
  }
}