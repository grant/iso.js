import Mesh from './Mesh';
import THREE from 'three';

function indexToSide(index:number) {
  const sideIndex = [
    Cube.SIDE.XPOS,
    Cube.SIDE.XNEG,
    Cube.SIDE.YPOS,
    Cube.SIDE.YNEG,
    Cube.SIDE.ZPOS,
    Cube.SIDE.ZNEG,
  ];
  return sideIndex[Math.floor(index / 2)];
}

export default class Cube extends Mesh {
  constructor(x = 1, y = 1, z = 1) {
    super();
    this.size = {x, y, z};

    // geometry
    let geometry = new THREE.BoxGeometry(x, y, z);

    // material
    // TODO make not all cubes have vertexColors for performance
    let material = new THREE.MeshLambertMaterial({
      vertexColors: THREE.FaceColors,
    });

    this.threeMesh = new THREE.Mesh(geometry, material);
    this.position(this.xyz);

    // shadow
    this.threeMesh.castShadow = true;
    this.threeMesh.receiveShadow = true;
  }

  /**
   * Set the color
   * @param {THREE.Color|Object} color
   * @returns {Cube}
   */
  color(color:THREE.Color|Object):Cube {
    if (color instanceof THREE.Color) {
      for (let i = 0; i < this.threeMesh.geometry.faces.length; ++i) {
        this.threeMesh.geometry.faces[i].color.set(color);
      }
    } else {
      for (let i = 0; i < this.threeMesh.geometry.faces.length; i += 2) {
        let faceColor = color[indexToSide(i)];
        if (faceColor) {
          this.threeMesh.geometry.faces[i].color.set(faceColor);
          this.threeMesh.geometry.faces[i + 1].color.set(faceColor);
        }
      }
    }
    this.threeMesh.geometry.colorsNeedUpdate = true;
    return this;
  }

  /**
   * Set the opacity
   * @param opacity
   * @returns {Cube}
   */
  opacity(opacity:number):Cube {
    this.threeMesh.material.transparent = true;
    this.threeMesh.material.opacity = opacity;
    return this;
  }
}