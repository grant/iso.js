'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Iso = require('./Iso');

var _Iso2 = _interopRequireDefault(_Iso);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.threeScene = new _three2.default.Scene();

    // Fog
    this.threeScene.fog = new _three2.default.FogExp2(0x000000, 5);

    // Ambient light
    this.threeScene.add(new _three2.default.AmbientLight(0x666666));

    // Directional light
    var light = new _three2.default.DirectionalLight(0xffffff, 1);
    light.position.set(-30, 40, 20);

    light.castShadow = true;
    light.shadow.mapSize = new _three2.default.Vector2(5000, 5000);
    var size = 50;
    light.shadow.camera.left = -size;
    light.shadow.camera.right = size;
    light.shadow.camera.top = -size;
    light.shadow.camera.bottom = size;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 100;

    this.threeScene.add(light);

    // light helper
    if (_Iso2.default.DEBUG) {
      this.threeScene.add(new _three2.default.DirectionalLightHelper(light, 0));
      this.threeScene.add(new _three2.default.CameraHelper(light.shadow.camera));
    }

    // axes
    if (_Iso2.default.DEBUG) {
      this.threeScene.add(new _three2.default.AxisHelper(40));
    }

    // grid
    if (_Iso2.default.DEBUG) {
      var _geometry = new _three2.default.PlaneBufferGeometry(100, 100, 10, 10);
      var _material = new _three2.default.MeshBasicMaterial({ wireframe: true, opacity: 0.5, transparent: true });
      var grid = new _three2.default.Mesh(_geometry, _material);
      grid.rotation.order = 'YXZ';
      grid.rotation.y = -Math.PI / 2;
      grid.rotation.x = -Math.PI / 2;
      this.threeScene.add(grid);
    }

    // Add a box
    // geometry
    var geometry = new _three2.default.BoxGeometry(10, 10, 10);

    // material
    var material = new _three2.default.MeshLambertMaterial({
      color: 0x0aeedf
    });

    // mesh
    var mesh = new _three2.default.Mesh(geometry, material);

    //this.threeScene.add(mesh);
  }

  _createClass(Scene, [{
    key: 'add',
    value: function add(cube) {
      this.threeScene.add(cube.threeCube);
    }
  }]);

  return Scene;
}();

exports.default = Scene;