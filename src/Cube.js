import THREE from 'three';
import Enum from 'es6-enum';

function indexToSide(index:number) {
  const sideIndex = [
    Cube.SIDE.XPOS,
    Cube.SIDE.XNEG,
    Cube.SIDE.YPOS,
    Cube.SIDE.YNEG,
    Cube.SIDE.ZPOS,
    Cube.SIDE.ZNEG,
  ];
  return sideIndex[Math.floor(index/2)];
}

export default class Cube {
  static SIDE = Enum(
    'XPOS',
    'XNEG',
    'YPOS',
    'YNEG',
    'ZPOS',
    'ZNEG'
  );
  threeCube = null;
  xyz = {x: 0, y: 0, z: 0};

  constructor(x = 1, y = 1, z = 1) {
    this.size = {x, y, z};

    // geometry
    let geometry = new THREE.BoxGeometry(x, y, z);

    // material
    // TODO make not all cubes have vertexColors for performance
    let material = new THREE.MeshLambertMaterial({
      vertexColors: THREE.FaceColors,
    });

    this.threeCube = new THREE.Mesh(geometry, material);
    this.position(this.xyz);

    // shadow
    this.threeCube.castShadow = true;
    this.threeCube.receiveShadow = true;
  }

  /**
   * Set the position
   * Either pass {x, y, z} or (x, y, z) tuple
   * @returns {Cube}
   */
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

  /**
   * Set the color
   * @param color
   * @returns {Cube}
   */
  color(color:THREE.Color|Object):Cube {
    if (color instanceof THREE.Color) {
      for (let i = 0; i < this.threeCube.geometry.faces.length; ++i) {
        this.threeCube.geometry.faces[i].color.set(color);
      }
    } else {
      for (let i = 0; i < this.threeCube.geometry.faces.length; i += 2) {
        let faceColor = color[indexToSide(i)];
        if (faceColor) {
          this.threeCube.geometry.faces[i].color.set(faceColor);
          this.threeCube.geometry.faces[i + 1].color.set(faceColor);
        }
      }
    }
    this.threeCube.geometry.colorsNeedUpdate = true;
    return this;
  }

  /**
   * Set the opacity
   * @param opacity
   * @returns {Cube}
   */
  opacity(opacity:number):Cube {
    this.threeCube.material.transparent = true;
    this.threeCube.material.opacity = opacity;
    return this;
  }
}