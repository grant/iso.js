import THREE from 'three';
import Enum from 'es6-enum';

/**
 * An abstract Iso.js mesh
 */
export default class Mesh {
  static SIDE = Enum(
    'XPOS',
    'XNEG',
    'YPOS',
    'YNEG',
    'ZPOS',
    'ZNEG'
  );
  threeMesh = null;
  xyz = {x: 0, y: 0, z: 0};

  constructor() {
  }

  /**
   * Set the position
   * Either pass {x, y, z} or (x, y, z) tuple
   * @returns {Mesh}
   */
  position(x, y, z):Mesh {
    let xyz = (arguments.length === 3) ? {x, y, z} : x;
    this.xyz = xyz;

    this.threeMesh.position.set(
      xyz.x + (this.size.x / 2),
      xyz.y + (this.size.y / 2),
      xyz.z + (this.size.z / 2)
    );
    return this;
  }
}