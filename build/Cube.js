'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = function () {
  function Cube() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    var z = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    _classCallCheck(this, Cube);

    this.threeCube = null;
    this.xyz = { x: 0, y: 0, z: 0 };
    this.cubeColor = new _three2.default.Color('rgb(10, 238, 223)');

    this.size = { x: x, y: y, z: z };

    // geometry
    var geometry = new _three2.default.BoxGeometry(x, y, z);

    // material
    var material = new _three2.default.MeshLambertMaterial({
      color: this.cubeColor
    });

    this.threeCube = new _three2.default.Mesh(geometry, material);
    this.position(this.xyz);

    // shadow
    this.threeCube.castShadow = true;
    this.threeCube.receiveShadow = true;
  }

  // Either pass {x, y, z} or (x, y, z) tuple


  _createClass(Cube, [{
    key: 'position',
    value: function position(x, y, z) {
      function _ref(_id) {
        if (!(_id instanceof Cube)) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nCube\n\nGot:\n' + _inspect(_id));
        }

        return _id;
      }

      var xyz = arguments.length === 3 ? { x: x, y: y, z: z } : x;
      this.xyz = xyz;

      // Un-center the cube
      this.threeCube.position.set(xyz.x + this.size.x / 2, xyz.y + this.size.y / 2, xyz.z + this.size.z / 2);
      return _ref(this);
    }
  }, {
    key: 'color',
    value: function color(_color) {
      function _ref2(_id2) {
        if (!(_id2 instanceof Cube)) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nCube\n\nGot:\n' + _inspect(_id2));
        }

        return _id2;
      }

      if (!(_color instanceof _three2.default.Color)) {
        throw new TypeError('Value of argument "color" violates contract.\n\nExpected:\nTHREE.Color\n\nGot:\n' + _inspect(_color));
      }

      this.cubeColor = _color;
      this.threeCube.material.color = this.cubeColor;
      return _ref2(this);
    }
  }, {
    key: 'opacity',
    value: function opacity(_opacity) {
      function _ref3(_id3) {
        if (!(_id3 instanceof Cube)) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nCube\n\nGot:\n' + _inspect(_id3));
        }

        return _id3;
      }

      if (!(typeof _opacity === 'number')) {
        throw new TypeError('Value of argument "opacity" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(_opacity));
      }

      this.threeCube.material.transparent = true;
      this.threeCube.material.opacity = _opacity;
      return _ref3(this);
    }
  }]);

  return Cube;
}();

exports.default = Cube;

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