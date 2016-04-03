"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = function () {
  function Cube() {
    var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    var depth = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    _classCallCheck(this, Cube);

    this.threeCube = null;

    this.width = width;
    this.height = height;
    this.width = width;

    var geometry = new THREE.BoxGeometry(width, height, depth);

    // material
    var material = new THREE.MeshLambertMaterial({
      color: 0x0aeedf
    });

    this.xyz = { x: 0, y: 0, z: 0 };
    this.threeCube = new THREE.Mesh(geometry, material);
  }

  _createClass(Cube, [{
    key: "position",
    value: function position(xyz) {
      this.xyz = Object.assign(this.xyz, xyz);
      this.threeCube.position.set(xyz.x, xyz.y, xyz.z);
    }
  }]);

  return Cube;
}();

exports.default = Cube;