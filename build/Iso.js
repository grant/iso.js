'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera = require('./Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

var _Cube = require('./Cube');

var _Cube2 = _interopRequireDefault(_Cube);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _OrbitControls = require('./OrbitControls');

var _OrbitControls2 = _interopRequireDefault(_OrbitControls);

var _DebugStats = require('./DebugStats');

var _DebugStats2 = _interopRequireDefault(_DebugStats);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Iso = function () {

  /**
   * Create a new Iso world.
   * @param container The DOMNode container.
   */

  function Iso(container) {
    _classCallCheck(this, Iso);

    this.container = container;
  }

  _createClass(Iso, [{
    key: 'render',
    value: function render(scene) {
      var _this = this;

      if (!(scene instanceof _Scene2.default)) {
        throw new TypeError('Value of argument "scene" violates contract.\n\nExpected:\nScene\n\nGot:\n' + _inspect(scene));
      }

      // Setup camera
      var camera = new Iso.Camera({
        x: 10,
        z: 10,
        zoom: 6
      }, this.container);
      camera.threeCamera.lookAt(scene.threeScene.position);

      // Render Debug Stats
      if (Iso.DEBUG) {
        var stats = new _DebugStats2.default(this.container);
        stats.render();
      }

      // Render
      _Renderer2.default.render(scene, camera, this.container);

      // Enable Orbit Controls
      var controls = new _OrbitControls2.default(camera.threeCamera, _Renderer2.default.renderDomElement);
      controls.addEventListener('change', function () {
        _Renderer2.default.render(scene, camera, _this.container);
      });
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.maxPolarAngle = Math.PI / 2;
    }
  }]);

  return Iso;
}();

// Export globally for browserify


Iso.DEBUG = false;
Iso.Camera = _Camera2.default;
Iso.Cube = _Cube2.default;
Iso.Scene = _Scene2.default;
Iso.Renderer = _Renderer2.default;
Iso.Color = _three2.default.Color;
exports.default = Iso;
window.Iso = Iso;

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