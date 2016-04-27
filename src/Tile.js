import THREE from 'three';
import Mesh from './Mesh';

/**
 * A two-dimensional rectangular tile
 */
export default class Tile extends Mesh {

  /**
   * @param x Width
   * @param z Length
   */
  constructor(x = 1, z = 1) {
    super();
    this.size = {x, y: 1, z};

    // geometry
    var rectLength = z, rectWidth = x;

    var rectShape = new THREE.Shape();
    rectShape.moveTo(0, 0);
    rectShape.lineTo(0, rectWidth);
    rectShape.lineTo(rectLength, rectWidth);
    rectShape.lineTo(rectLength, 0);
    rectShape.lineTo(0, 0);

    let geometry = new THREE.ShapeGeometry(rectShape);
    geometry.rotateX(90 * Math.PI / 180);
    geometry.rotateY(-90 * Math.PI / 180);
    geometry.rotateZ(180 * Math.PI / 180);

    // material
    let material = new THREE.MeshLambertMaterial({
      vertexColors: THREE.FaceColors,
      side: THREE.DoubleSide,
    });

    this.threeMesh = new THREE.Mesh(geometry, material);
    this.color(new Iso.Color('red')); // default color
    this.position(this.xyz);

    // shadow
    this.threeMesh.castShadow = true;
    this.threeMesh.receiveShadow = true;
  }

  /**
   * Set the position
   * Either pass {x, y, z} or (x, y, z) tuple
   * @returns {Tile}
   */
  position(x, y, z):Tile {
    let xyz = (arguments.length === 3) ? {x, y, z} : x;
    this.xyz = xyz;

    this.threeMesh.position.set(
      xyz.x,
      xyz.y,
      xyz.z
    );
    return this;
  }

  /**
   * Sets the visibility of each side of the tile. Double-sided by default.
   * @param isDoubleSided Viewable by both sides?
   */
  doubleSided(isDoubleSided:boolean):Tile {
    if (isDoubleSided) {
      this.threeMesh.material.side = THREE.DoubleSide;
    } else {
      this.threeMesh.material.side = THREE.FrontSide;
    }
  }

  /**
   * Set the color
   * @param {THREE.Color} color
   * @returns {Tile}
   */
  color(color:THREE.Color):Tile {
    for (let i = 0; i < this.threeMesh.geometry.faces.length; ++i) {
      this.threeMesh.geometry.faces[i].color.set(color);
    }
    this.threeMesh.geometry.colorsNeedUpdate = true;
    return this;
  }

  /**
   * Set the opacity
   * @param opacity
   * @returns {Tile}
   */
  opacity(opacity:number):Tile {
    this.threeMesh.material.transparent = true;
    this.threeMesh.material.opacity = opacity;
    return this;
  }
}