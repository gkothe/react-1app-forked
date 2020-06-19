"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props, context) {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props, context));
  }

  _createClass(Modal, [{
    key: "renderBts",
    value: function renderBts() {
      var _this2 = this;

      if (!this.props.bts || this.props.bts.length == 0) return;
      var bts = [];

      var _loop = function _loop(i) {
        var item = _this2.props.bts[i];
        bts.push(_react2.default.createElement(
          _Button2.default,
          {
            key: i + "_" + item.text,
            onClick: function onClick() {
              if (item.action) item.action();
            },
            color: "primary"
          },
          item.text
        ));
      };

      for (var i = 0; i < this.props.bts.length; i++) {
        _loop(i);
      }
      return _react2.default.createElement(
        _DialogActions2.default,
        null,
        bts
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _Dialog2.default,
        {
          scroll: "body",
          maxWidth: this.props.maxWidth ? this.props.maxWidth : "md",
          "aria-labelledby": "responsive-dialog-title",
          open: this.props.visible,
          onClose: function onClose() {
            if (_this3.props.onRequestClose) {
              _this3.props.onRequestClose();
            }
          }
        },
        this.props.title ? _react2.default.createElement(
          _DialogTitle2.default,
          null,
          this.props.title
        ) : null,
        _react2.default.createElement(
          _DialogContent2.default,
          null,
          this.props.children
        ),
        this.props.actions && this.props.actions.length > 0 ? _react2.default.createElement(
          "div",
          {
            className: "modal-footer",
            style: {
              flexDirection: "row-reverse",
              display: "flex",
              padding: 20
            }
          },
          this.props.actions
        ) : null,
        this.renderBts()
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

exports.default = Modal;