'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.OpenDialogOption = OpenDialogOption;
exports.CloseDialogOption = CloseDialogOption;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemAvatar = require('@material-ui/core/ListItemAvatar');

var _ListItemAvatar2 = _interopRequireDefault(_ListItemAvatar);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _blue = require('@material-ui/core/colors/blue');

var _blue2 = _interopRequireDefault(_blue);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _ListSubheader = require('@material-ui/core/ListSubheader');

var _ListSubheader2 = _interopRequireDefault(_ListSubheader);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  avatar: {
    backgroundColor: _blue2.default[100],
    color: _blue2.default[600]
  },
  dividerInset: {
    margin: '5px 0 0 2px'
  },
  paper: {
    minWidth: 400
  }
};
var _ref = null;

var SimpleDialog = function (_React$Component) {
  _inherits(SimpleDialog, _React$Component);

  function SimpleDialog(props) {
    _classCallCheck(this, SimpleDialog);

    var _this = _possibleConstructorReturn(this, (SimpleDialog.__proto__ || Object.getPrototypeOf(SimpleDialog)).call(this, props));

    _ref = _this;
    _this.state = {
      open: false,
      title: "",
      action: []
    };
    return _this;
  }

  _createClass(SimpleDialog, [{
    key: 'openDialog',
    value: function openDialog(_ref2) {
      var _ref2$title = _ref2.title,
          title = _ref2$title === undefined ? '' : _ref2$title,
          _ref2$description = _ref2.description,
          description = _ref2$description === undefined ? '' : _ref2$description,
          _ref2$texto = _ref2.texto,
          texto = _ref2$texto === undefined ? '' : _ref2$texto,
          _ref2$action = _ref2.action,
          action = _ref2$action === undefined ? [] : _ref2$action;

      this.setState({ open: true, title: title, description: description, action: action });
      // this.refs.modal1.open()
    }
  }, {
    key: 'closeDialog',
    value: function closeDialog() {
      this.setState({ open: !this.state.open });
      // this.refs.modal1.close()
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          title = _state.title,
          description = _state.description,
          action = _state.action;
      var classes = this.props.classes;

      return _react2.default.createElement(
        _Dialog2.default,
        { onClose: function onClose() {
            return _this2.closeDialog();
          }, 'aria-labelledby': 'simple-dialog-title', open: this.state.open, classes: classes },
        _react2.default.createElement(
          _DialogTitle2.default,
          { id: 'simple-dialog-title' },
          title
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _List2.default,
            {
              subheader: _react2.default.createElement(
                _ListSubheader2.default,
                { component: 'div' },
                description
              ) },
            action.map(function (data) {
              return [data.separa && [_react2.default.createElement(_Divider2.default, { component: 'li', variant: 'inset', style: { marginTop: 7 } }), _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _Typography2.default,
                  { className: classes.dividerInset, color: 'textSecondary', variant: 'caption' },
                  data.separa
                )
              )], _react2.default.createElement(
                _ListItem2.default,
                { button: true, onClick: function onClick() {
                    if (data.onPress) data.onPress();
                    _this2.closeDialog();
                  }, key: data.label },
                _react2.default.createElement(
                  _ListItemAvatar2.default,
                  null,
                  _react2.default.createElement(
                    _Avatar2.default,
                    { className: classes.avatar },
                    data.icon != false && _react2.default.createElement(_Icon2.default, { name: data.icon || "settings_input_component" })
                  )
                ),
                _react2.default.createElement(_ListItemText2.default, { primary: data.label })
              )];
            }) || _react2.default.createElement(
              _Button2.default,
              { onClick: this.closeDialog, color: 'primary' },
              'OK'
            )
          )
        )
      );
    }
  }]);

  return SimpleDialog;
}(_react2.default.Component);

function OpenDialogOption() {
  if (_ref) {
    var _ref3;

    (_ref3 = _ref).openDialog.apply(_ref3, arguments);
  }
}
function CloseDialogOption() {
  if (_ref) {
    var _ref4;

    (_ref4 = _ref).closeDialog.apply(_ref4, arguments);
  }
}
exports.default = (0, _withStyles2.default)(styles)(SimpleDialog);