'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = function View(props) {
  if (props.container || props.item || props.sx || props.sm || props.md || props.xl || props.lg) {
    return _react2.default.createElement(_Grid2.default, _extends({}, props, { style: Util.styleMack([props.style, props.superStyle]) }));
  }

  if (props.type == "Paper" || props.type == "Card") {
    return _react2.default.createElement(_Paper2.default, _extends({}, props, { style: Util.styleMack([props.style, props.superStyle]) }));
  }

  return _react2.default.createElement(
    'div',
    _extends({}, props, {
      onClick: function onClick(e) {
        if (props.onClick) {
          props.onClick(e);
        }
      }, style: Util.styleMack([{ display: "flex", boxSizing: "border-box", width: "100%", flex: "0 1 auto" }, props.style, props.superStyle]) }),
    props.clild,
    props.children
  );
};

exports.default = View;