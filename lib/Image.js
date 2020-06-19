'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('./View.js');

var _View2 = _interopRequireDefault(_View);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var _ref;

      var style = Util.styleMack([(_ref = {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flex: "0 1 auto",
        minHeight: 5,
        minWidth: 5,
        display: "flex",
        boxSizing: "border-box"
      }, _defineProperty(_ref, 'flex', "0 1 auto"), _defineProperty(_ref, 'backgroundRepeat', "no-repeat"), _defineProperty(_ref, 'backgroundPosition', "50% 50%"), _ref), this.props.style]);

      var url = this.props.src || this.props.source && this.props.source.uri || this.props.source;
      if (this.props.resizeMode === "center" || this.props.resizeMode === "cover") {
        style.backgroundSize = "cover";
      } else if (this.props.resizeMode === "fit" || this.props.resizeMode === "contain") {
        style.backgroundSize = "contain";
      } else if (this.props.resizeMode === "fill") {
        style.backgroundSize = "cover";
      } else if (this.props.resizeMode === "matriz" || this.props.resizeMode === "stretch") {
        style.backgroundSize = "100% 100%";
      } else if (this.props.resizeMode === "stretch") {
        style.backgroundSize = "100% 100%";
      } else if (this.props.resizeMode === "contain") {
        style.backgroundSize = "contain";
      } else {
        style.backgroundSize = "cover";
      }

      if (url) {
        style.backgroundImage = "url('" + url + "')";
      }

      return _react2.default.createElement(
        'div',
        _extends({}, this.props, {
          style: style }),
        this.props.children
      );
    }
  }]);

  return Image;
}(_react2.default.Component);

exports.default = Image;


Image.resizeMode = {
  cover: "center",
  contain: "fit",
  stretch: "matriz",
  repeat: "repeat",
  center: "fill"
};