"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (props) {
  if (props.type == "checkbox") return _react2.default.createElement(SwitchC, props);
  return _react2.default.createElement(SwitchS, props);
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Switch = require("@material-ui/core/Switch");

var _Switch2 = _interopRequireDefault(_Switch);

var _RadioButtonChecked = require("@material-ui/icons/RadioButtonChecked");

var _RadioButtonChecked2 = _interopRequireDefault(_RadioButtonChecked);

var _RadioButtonUnchecked = require("@material-ui/icons/RadioButtonUnchecked");

var _RadioButtonUnchecked2 = _interopRequireDefault(_RadioButtonUnchecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwitchS = function SwitchS(props) {
  return _react2.default.createElement(_FormControlLabel2.default, {
    control: _react2.default.createElement(_Switch2.default, _extends({
      color: "primary"
    }, props, {
      onChange: function onChange() {
        props.onChange(!props.value);
      },
      checked: Boolean(props.value == undefined ? false : props.value)
    })),
    label: props.label
  });
};

var SwitchC = function SwitchC(props) {
  return _react2.default.createElement(_FormControlLabel2.default, {
    control: _react2.default.createElement(_Checkbox2.default, _extends({
      color: "primary",
      checkedIcon: _react2.default.createElement(_RadioButtonChecked2.default, null),
      icon: _react2.default.createElement(_RadioButtonUnchecked2.default, null)
    }, props, {
      onChange: function onChange() {
        props.onChange(!props.value);
      },
      checked: Boolean(props.value == undefined ? false : props.value)
    })),
    label: props.label
  });
};