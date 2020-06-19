"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SnackBar = require("./SnackBar");

var _SnackBar2 = _interopRequireDefault(_SnackBar);

var _PgModal = require("./PgModal");

var _PgModal2 = _interopRequireDefault(_PgModal);

var _DialogAlert = require("./DialogAlert");

var _DialogAlert2 = _interopRequireDefault(_DialogAlert);

var _DialogOptions = require("./DialogOptions");

var _DialogOptions2 = _interopRequireDefault(_DialogOptions);

var _Alert = require("./Alert");

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return [_react2.default.createElement(_SnackBar2.default, _extends({ key: "snackbar" }, this.props)), _react2.default.createElement(_PgModal2.default, _extends({ key: "modal" }, this.props)), _react2.default.createElement(_DialogAlert2.default, _extends({ key: "dialogalert" }, this.props)), _react2.default.createElement(_DialogOptions2.default, _extends({ key: "dialogoptions" }, this.props)), _react2.default.createElement(_Alert2.default, _extends({ key: "alert" }, this.props))];
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;