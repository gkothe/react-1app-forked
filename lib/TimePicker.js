"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contador = 0;

var DatePicker = function DatePicker(props) {
  var id = props.id || "DateImput" + contador++;
  return _react2.default.createElement(_TextInput2.default, _extends({
    InputLabelProps: {
      shrink: true
    }
  }, props, {
    type: "time",
    value: getValue(props),
    onChange: function onChange(value) {
      if (props.onChange) props.onChange(value);
    }
  }));
};

function getValue(props) {
  if (!props.value) return "";
  return (0, _moment2.default)(props.value, "HH:mm").format("HH:mm");
}

exports.default = DatePicker;