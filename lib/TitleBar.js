'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //TitleBar

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TitleBar = function TitleBar(props) {
  return _react2.default.createElement(_View2.default, _extends({}, props, { style: [!props.fixed ? { zIndex: 15 } : { zIndex: 1500, position: "fixed", left: 0, right: 0, top: 0 }, props.style] }));
};

var corPadrao = null;
exports.default = TitleBar;