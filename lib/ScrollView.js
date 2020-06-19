"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScrollView = function ScrollView(props) {
  var style = Util.styleMack([{
    overflowX: "auto",
    flexDirection: "column",
    // display:"flex",
    boxSizing: "border-box",
    width: "100%",
    display: "block",
    flex: "0 1 auto"
  }, props.style]);

  if (props.horizontal == true) {
    style.overflowX = "auto";
    style.overflowY = "hidden";
  } else {
    style.overflowX = "hidden";
    style.overflowY = "auto";
  }
  return _react2.default.createElement("div", _extends({}, props, { style: style }));
};

exports.default = ScrollView;
// export default Main;