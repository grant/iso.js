'use strict';

var _Camera = require('./Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

var _Cube = require('./Cube');

var _Cube2 = _interopRequireDefault(_Cube);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Iso = {
  Camera: _Camera2.default,
  Cube: _Cube2.default,
  Scene: _Scene2.default,
  render: _Renderer2.default.render
};
Object.freeze(Iso);

// Export globally for browserify
window.Iso = Iso;