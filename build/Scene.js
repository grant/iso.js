'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
    this.threeScene.add(new _three2.default.AmbientLight(0xaaaaaa));

    // Directional light
    var light = new _three2.default.DirectionalLight(0xffffff, 1);
    light.position.set(-30, 40, 20);

    light.castShadow = true;
    light.shadow.mapSize = new _three2.default.Vector2(50, 50);
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
      function _ref(_id) {
        if (!(_id instanceof Scene)) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nScene\n\nGot:\n' + _inspect(_id));
        }

        return _id;
      }

      this.threeScene.add(cube.threeCube);
      return _ref(this);
    }
  }]);

  return Scene;
}();

exports.default = Scene;

function _inspect(input, depth) {
  var maxDepth = 4;
  var maxKeys = 15;

  if (depth === undefined) {
    depth = 0;
  }

  depth += 1;

  if (input === null) {
    return 'null';
  } else if (input === undefined) {
    return 'void';
  } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return typeof input === 'undefined' ? 'undefined' : _typeof(input);
  } else if (Array.isArray(input)) {
    if (input.length > 0) {
      var _ret = function () {
        if (depth > maxDepth) return {
            v: '[...]'
          };

        var first = _inspect(input[0], depth);

        if (input.every(function (item) {
          return _inspect(item, depth) === first;
        })) {
          return {
            v: first.trim() + '[]'
          };
        } else {
          return {
            v: '[' + input.slice(0, maxKeys).map(function (item) {
              return _inspect(item, depth);
            }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
          };
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return 'Array';
    }
  } else {
    var keys = Object.keys(input);

    if (!keys.length) {
      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name;
      } else {
        return 'Object';
      }
    }

    if (depth > maxDepth) return '{...}';
    var indent = '  '.repeat(depth - 1);
    var entries = keys.slice(0, maxKeys).map(function (key) {
      return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
    }).join('\n  ' + indent);

    if (keys.length >= maxKeys) {
      entries += '\n  ' + indent + '...';
    }

    if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
      return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
    } else {
      return '{\n  ' + indent + entries + '\n' + indent + '}';
    }
  }
}