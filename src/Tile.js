import THREE from 'three';
import Mesh from './Mesh';
import Enum from 'es6-enum';

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
    this.size = {x, y: 0, z};

    // geometry (origin at center for easy rotation)
    var rectShape = new THREE.Shape();
    rectShape.moveTo(-z/2, -x/2);
    rectShape.lineTo(-z/2, x/2);
    rectShape.lineTo(z/2, x/2);
    rectShape.lineTo(z/2, -x/2);
    rectShape.lineTo(-z/2, -x/2);

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
   * Set the rotation of tile.
   * @param side
   */
  rotation(side) {
    // TODO properly position, figure out an API for it.
    let x, z = [0, 0];
    switch (side) {
      case Tile.SIDE.XPOS:
        z = -90;
        break;
      case Tile.SIDE.XNEG:
        z = 90;
        break;
      case Tile.SIDE.YPOS:
        break;
      case Tile.SIDE.YNEG:
        z = 180;
        break;
      case Tile.SIDE.ZPOS:
        x = 90;
        break;
      case Tile.SIDE.ZNEG:
        x = -90;
        break;
      default:
        throw new Error('Unknown Side enum. Use something like `Tile.SIDE.XPOS`.');
        return this;
    }

    this.threeMesh.rotateX(x * Math.PI/180);
    this.threeMesh.rotateZ(z * Math.PI/180);
    return this;
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