'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function Scene() {
  _classCallCheck(this, Scene);

  this.threeScene = new _three2.default.Scene();

  this.threeScene.add(new _three2.default.AmbientLight(0x444444));

  var light = new _three2.default.PointLight(0xffffff, 0.8);
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
  var geometry = new _three2.default.BoxGeometry(10, 10, 10);

  // material
  var material = new _three2.default.MeshNormalMaterial();

  // mesh
  var mesh = new _three2.default.Mesh(geometry, material);
  this.threeScene.add(mesh);
};

exports.default = Scene;