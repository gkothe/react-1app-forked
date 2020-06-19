"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

var _reactRouterDom = require("react-router-dom");

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _CircularProgress = require("@material-ui/core/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

require("./styles.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contador = 0;

var TouchableOpacity = function TouchableOpacity(props) {
  contador++;
  var _onClick = props.onClick,
      onPress = props.onPress;

  var style = Util.styleMack([{}, props.style, props.superStyle]);
  var ButtonN = props.icon && _IconButton2.default || _Button2.default;
  var NavRender = function NavRender(prop) {
    return props.to && _react2.default.createElement(_reactRouterDom.Link, {
      to: props.to,
      id: props.id || "nv" + contador,
      activeClassName: "active",
      style: {
        flex: style.flex,
        alignSelf: style.alignSelf,
        display: style.display,
        flexDirection: "column"
      },
      children: prop.children
    }) || prop.children;
  };
  var TooltipRender = function TooltipRender(prop) {
    return props.tooltip && _react2.default.createElement(_Tooltip2.default, {
      id: props.id || "tv" + contador,
      title: props.tooltip,
      placement: "right",
      children: prop.children
    }) || prop.children;
  };
  return _react2.default.createElement(
    NavRender,
    null,
    _react2.default.createElement(
      TooltipRender,
      null,
      _react2.default.createElement(ButtonN, _extends({
        color: "primary",
        key: props.key || "bt" + contador,
        "aria-label": props.tooltip,
        disabled: props.load
      }, props, {
        id: props.id || "bv" + contador,
        onClick: function onClick(event) {
          if (onPress) onPress(event);
          if (_onClick) _onClick(event);
        },
        style: style,
        children: props.load && _react2.default.createElement(_CircularProgress2.default, { size: 24 }) || props.children
      }))
    )
  );
};
exports.default = TouchableOpacity;