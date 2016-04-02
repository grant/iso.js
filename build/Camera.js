'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function Camera() {
  _classCallCheck(this, Camera);

  this.threeCamera = null;

  // TODO set better camera viewport
  // Create camera
  var aspect = window.innerWidth / window.innerHeight;
  var d = 20;
  this.threeCamera = new _three2.default.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

  // Setup direction
  this.threeCamera.rotation.order = 'YXZ';

  this.threeCamera.position.set(20, 20, 20);
  this.threeCamera.rotation.y = -Math.PI / 4;
  this.threeCamera.rotation.x = Math.atan(-1 / Math.sqrt(2));
};

exports.default = Camera;