"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.PgModal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.OpenModal = OpenModal;
exports.CloseModal = CloseModal;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Slide = require("@material-ui/core/Slide");

var _Slide2 = _interopRequireDefault(_Slide);

var _withStyles = require("@material-ui/core/styles/withStyles");

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { KeyboardAvoidingView, Platform, Linking, Share } from "react-native-1app";
var _ref = null;
var conte = 0;
//nao atualizar

var PgModal = exports.PgModal = function (_React$Component) {
  _inherits(PgModal, _React$Component);

  function PgModal(props) {
    _classCallCheck(this, PgModal);

    var _this = _possibleConstructorReturn(this, (PgModal.__proto__ || Object.getPrototypeOf(PgModal)).call(this, props));

    if (!_ref) {
      _ref = _this;
      _this.gobal = true;
    }
    _this.state = {
      heranca: {},
      open: false,
      prop: {},
      Component: _View2.default,
      propsModal: {}
    };
    _this.openModal = function () {
      var Component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _View2.default;
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var propsModal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      conte++;
      _this.setState({ Component: Component, prop: prop, propsModal: propsModal, open: true });
      if (_this.props.OnOpen) _this.props.OnOpen(prop);
    };
    _this.closeModal = function (isKeyBack) {
      if (!_this.state.open) return false;
      _this.setState({ open: false, Component: _View2.default });
      if (_this.props.OnClose) _this.props.OnClose(isKeyBack);
      return true;
    };
    return _this;
  }

  _createClass(PgModal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.gobal) _ref = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          Component = _state.Component,
          prop = _state.prop,
          propsModal = _state.propsModal;

      return _react2.default.createElement(
        _Dialog2.default,
        {
          fullScreen: true,
          open: Boolean(this.state.open),
          onClose: this.closeModal,
          style: { overflowX: "auto" },
          PaperProps: this.props.classes && {
            classes: { root: this.props.classes.root }
          }
        },
        _react2.default.createElement(Component, _extends({
          key: "compe_modal" + conte
        }, prop, {
          closeModal: this.closeModal,
          screenProps: this.props.screenProps
        }))
      );
    }
  }]);

  return PgModal;
}(_react2.default.Component);

var styles = function styles(theme) {
  return {
    root: {
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  };
};

function OpenModal() {
  if (_ref) {
    var _ref2;

    (_ref2 = _ref).openModal.apply(_ref2, arguments);
  }
}
function CloseModal() {
  if (_ref) {
    var _ref3;

    return (_ref3 = _ref).closeModal.apply(_ref3, arguments);
  }
}

var Modal = exports.Modal = PgModal;

exports.default = (0, _withStyles2.default)(styles)(PgModal);