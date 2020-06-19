'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.OpenDialog = OpenDialog;
exports.CloseDialog = CloseDialog;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _Slide = require('@material-ui/core/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Transition(props) {
  return _react2.default.createElement(_Slide2.default, _extends({ direction: 'up' }, props));
}
var _ref = null;

var AlertDialogSlide = function (_React$Component) {
  _inherits(AlertDialogSlide, _React$Component);

  function AlertDialogSlide(props) {
    _classCallCheck(this, AlertDialogSlide);

    var _this = _possibleConstructorReturn(this, (AlertDialogSlide.__proto__ || Object.getPrototypeOf(AlertDialogSlide)).call(this, props));

    _ref = _this;
    _this.state = {
      heranca: {},
      open: false,
      prop: {},
      Component: _Grid2.default,
      propsModal: {},
      action: [],
      input: null,
      texto: '',
      title: ''
    };
    _this.openDialog = function (_ref2) {
      var _ref2$Component = _ref2.Component,
          Component = _ref2$Component === undefined ? _Grid2.default : _ref2$Component,
          _ref2$prop = _ref2.prop,
          prop = _ref2$prop === undefined ? {} : _ref2$prop,
          _ref2$propsDialog = _ref2.propsDialog,
          propsDialog = _ref2$propsDialog === undefined ? {} : _ref2$propsDialog,
          _ref2$title = _ref2.title,
          title = _ref2$title === undefined ? '' : _ref2$title,
          _ref2$description = _ref2.description,
          description = _ref2$description === undefined ? '' : _ref2$description,
          _ref2$texto = _ref2.texto,
          texto = _ref2$texto === undefined ? '' : _ref2$texto,
          _ref2$action = _ref2.action,
          action = _ref2$action === undefined ? [] : _ref2$action,
          _ref2$input = _ref2.input,
          input = _ref2$input === undefined ? null : _ref2$input;

      _this.setState({ Component: Component, prop: prop, propsDialog: propsDialog,
        open: true, title: title, description: description, action: action, input: input, texto: texto });
      // this.refs.modal1.open()
    };
    _this.closeDialog = function () {
      _this.setState({ open: !_this.state.open });
      // this.refs.modal1.close()
    };
    return _this;
  }

  _createClass(AlertDialogSlide, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          Component = _state.Component,
          prop = _state.prop,
          propsDialog = _state.propsDialog,
          title = _state.title,
          description = _state.description,
          action = _state.action,
          input = _state.input;


      return _react2.default.createElement(
        _Dialog2.default,
        _extends({
          open: this.state.open,
          TransitionComponent: Transition,
          keepMounted: true,
          onClose: this.closeDialog,
          'aria-labelledby': 'alert-dialog-slide-title',
          'aria-describedby': 'alert-dialog-slide-description',
          style: { zIndex: 1400 }
        }, propsDialog),
        _react2.default.createElement(
          _DialogTitle2.default,
          { id: 'alert-dialog-slide-title' },
          title
        ),
        _react2.default.createElement(
          _DialogContent2.default,
          null,
          _react2.default.createElement(
            _DialogContentText2.default,
            { id: 'alert-dialog-slide-description' },
            description
          ),
          _react2.default.createElement(Component, _extends({}, prop, { onClose: this.closeDialog })),
          input && _react2.default.createElement(_TextField2.default, _extends({
            autoFocus: true,
            margin: 'dense',
            id: 'name'
            // label="Email Address"
            // type="email"
            , fullWidth: true
          }, input, {
            value: this.state.texto,
            onChange: function onChange(event) {
              if (input.onChange) input.onChange(event.target.value);
              _this2.setState({ texto: event.target.value });
            }
          }))
        ),
        _react2.default.createElement(
          _DialogActions2.default,
          null,
          action[0] && action.map(function (data, key) {
            return _react2.default.createElement(
              _Button2.default,
              { key: "key_" + key, color: data.color || "primary", onClick: function onClick() {
                  if (data.onClick) data.onClick();
                  if (!data.notClose) _this2.closeDialog();
                } },
              data.label
            );
          }) || _react2.default.createElement(
            _Button2.default,
            { onClick: this.closeDialog, color: 'primary' },
            'OK'
          )
        )
      );
    }
  }]);

  return AlertDialogSlide;
}(_react2.default.Component);

exports.default = AlertDialogSlide;
function OpenDialog() {
  if (_ref) {
    var _ref3;

    (_ref3 = _ref).openDialog.apply(_ref3, arguments);
  }
}
function CloseDialog() {
  if (_ref) {
    var _ref4;

    (_ref4 = _ref).closeDialog.apply(_ref4, arguments);
  }
}