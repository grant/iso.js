import THREE from 'three';

export default class Cube {
  threeCube = null;
  xyz = {x: 0, y: 0, z: 0};
  cubeColor = new THREE.Color('rgb(10, 238, 223)');

  constructor(x = 1, y = 1, z = 1) {
    this.size = {x, y, z};

    // geometry
    let geometry = new THREE.BoxGeometry(x, y, z);

    // material
    let material = new THREE.MeshLambertMaterial({
      color: this.cubeColor
    });

    this.threeCube = new THREE.Mesh(geometry, material);
    this.position(this.xyz);

    // shadow
    this.threeCube.castShadow = true;
    this.threeCube.receiveShadow = true;
  }

  // Either pass {x, y, z} or (x, y, z) tuple
  position(x, y, z):Cube {
    let xyz = (arguments.length === 3) ? {x, y, z} : x;
    this.xyz = xyz;

    // Un-center the cube
    this.threeCube.position.set(
      xyz.x + (this.size.x / 2),
      xyz.y + (this.size.y / 2),
      xyz.z + (this.size.z / 2)
    );
    return this;
  }

  color(color:THREE.Color):Cube {
    this.cubeColor = color;
    this.threeCube.material.color = this.cubeColor;
    return this;
  }

  opacity(opacity:number):Cube {
    this.threeCube.material.transparent = true;
    this.threeCube.material.opacity = opacity;
    return this;
  }
}