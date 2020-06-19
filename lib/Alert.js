"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require("@material-ui/core/DialogActions");

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require("@material-ui/core/DialogContent");

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require("@material-ui/core/DialogContentText");

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require("@material-ui/core/DialogTitle");

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlertContext = null;

var Alert = function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert(props, context) {
    _classCallCheck(this, Alert);

    var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props, context));

    _this.state = {
      title: props.title,
      discrition: props.descrition,
      bts: props.bts,
      open: props.open ? props.open : false,
      prompt: props.prompt
    };
    if (!AlertContext) {
      AlertContext = _this;
    }
    return _this;
  }

  _createClass(Alert, [{
    key: "alert",
    value: function alert(titulo, descrition, bts, prompt) {
      var _this2 = this;

      this.setState({
        title: titulo,
        descrition: descrition,
        bts: bts,
        text: "",
        open: true,
        label: null,
        prompt: prompt
      });
      this.closeDialog = function () {
        _this2.setState({ open: !_this2.state.open });
      };
    }
  }, {
    key: "prompt",
    value: function prompt(titulo, label, value, callback) {
      var _this3 = this;

      var bts = [{
        text: "Send",
        onPress: function onPress() {
          if (callback) {
            callback(_this3.state.text);
          }
          _this3.setState({ open: false });
        }
      }];

      this.setState({
        title: titulo,
        descrition: null,
        bts: bts,
        label: label,
        text: value,
        open: true,
        callback: callback,
        prompt: callback
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        _Dialog2.default,
        _extends({
          style: { minWidth: 500 }
        }, this.props, {
          open: this.state.open,
          onRequestClose: function onRequestClose() {
            _this4.setState({ open: false });
            if (_this4.props.onClose) {
              _this4.props.onClose();
            }
          }
        }),
        this.state.title ? _react2.default.createElement(
          _DialogTitle2.default,
          null,
          this.state.title
        ) : null,
        _react2.default.createElement(
          _DialogContent2.default,
          null,
          _react2.default.createElement(
            _DialogContentText2.default,
            { id: "alert-dialog-description" },
            _react2.default.createElement(_Text2.default, { text: this.state.descrition })
          )
        ),
        this.state.prompt ? _react2.default.createElement(_TextInput2.default, {
          value: this.state.text,
          onChange: function onChange(value) {
            _this4.setState({ text: value });
          },
          onSubmitEditing: function onSubmitEditing() {
            if (_this4.state.callback) {
              _this4.state.callback(_this4.state.text);
            }
            _this4.setState({ open: false });
          },
          ref: function ref(v) {
            return _this4.textinput = v;
          },
          label: this.state.label
        }) : null,
        _react2.default.createElement(
          _DialogActions2.default,
          null,
          this.state.bts && this.state.bts[0] && this.state.bts.map(function (data, key) {
            return _react2.default.createElement(
              _Button2.default,
              { key: "key_" + key, onClick: function onClick() {
                  if (data.onPress) data.onPress();
                  if (!data.notClose) _this4.closeDialog();
                }, color: data.color || "primary" },
              data.text
            );
          }) || _react2.default.createElement(
            _Button2.default,
            { onClick: function onClick() {
                return _this4.closeDialog();
              }, color: "default" },
            "OK"
          )
        )
      );
    }
  }]);

  return Alert;
}(_react2.default.Component);

Alert.alert = function (titulo, descricao, bts, prompt) {
  // console.log("alert");
  // console.log(AlertContext);
  if (AlertContext) {
    AlertContext.alert(titulo, descricao, bts, prompt);
  }
};

Alert.prompt = function (titulo, label, value, callback) {
  if (AlertContext) {
    AlertContext.prompt(titulo, label, value, callback);
  }
};
exports.default = Alert;