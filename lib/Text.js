'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import View from './View';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(props) {
  var style = Util.styleMack([{ marginBottom: 0, display: "flex", lineHeight: 1 }, props.style, props.superStyle]);
  if (style.textAlign == "center") style.justifyContent = "center";
  if (style.textAlign == "right") style.justifyContent = "flex-end";

  var text = (props.children || props.text) + '';
  if (!text || text === "undefined") return _react2.default.createElement('div', { style: style });
  var array = text.split("\n");
  var views = [];
  for (var i = 0; i < array.length; i++) {
    if (i > 0) views.push(_react2.default.createElement('br', { key: "bar_" + i }));
    views.push(array[i]);
  }
  return _react2.default.createElement(
    _Typography2.default,
    _extends({ variant: 'subtitle1', gutterBottom: true }, props, { style: style }),
    views
  );
};

exports.default = Text;