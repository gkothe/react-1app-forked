"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _vanillaMasker = require("vanilla-masker");

var _vanillaMasker2 = _interopRequireDefault(_vanillaMasker);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

var _withStyles = require("@material-ui/core/styles/withStyles");

var _withStyles2 = _interopRequireDefault(_withStyles);

require("./styles.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contador = 0;

var TextInput = function TextInput(props) {
  var id = props.id || "Input" + contador++;
  var style = Util.styleMack([props.style, props.style, props.superStyle]);
  if (props.inputNative) return _react2.default.createElement(Input, _extends({}, props, { style: style, id: id }));

  return _react2.default.createElement(_TextField2.default, _extends({}, props, {
    id: id,
    margin: "normal",
    fullWidth: true,
    value: props.value || "",
    onChange: function onChange(event, value) {
      if (props.mask && props.onChange) return props.onChange(_vanillaMasker2.default.toPattern(event.target.value, props.mask));
      if (props.onChange) props.onChange(event.target.value);
    },
    onKeyDown: function onKeyDown(event) {
      if (props.onSubmitEditing && event.key == "Enter") {
        props.onSubmitEditing();
      }
    },
    style: style
  }));
};

var Input = function Input(props) {
  return _react2.default.createElement(RenderInput, _extends({
    type: "text"
  }, props, {
    style: Util.styleMack([{ border: "none", background: "none", minHeight: 25, fontSize: 14 }, props.style]),
    ref: props.refInput,
    inputNative: null,
    keyboardType: null,
    secureTextEntry: null,
    value: props.value,
    onChange: function onChange(event) {
      props.onChange(event.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key == "Enter") {
        if (props.onSubmitEditing) {
          props.onSubmitEditing();
        }
      }
    },
    children: null
  }));
};
var RenderInput = function RenderInput(props) {
  var style = Util.styleMack([{ color: color }, props.style]);
  if (!props.multiline) return _react2.default.createElement("input", _extends({}, props, { style: style }));
  return _react2.default.createElement("textarea", _extends({}, props, { style: style }));
};
var color = "";
var styles = function styles(theme) {
  color = theme.typography.h1.color;
  return {};
};

var RenderInputThema = (0, _withStyles2.default)(styles)(RenderInput);

exports.default = TextInput;

var style = {};