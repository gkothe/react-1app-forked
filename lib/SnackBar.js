'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.OpenSnack = OpenSnack;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Snackbar = require('@material-ui/core/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CheckCircle = require('@material-ui/icons/CheckCircle');

var _CheckCircle2 = _interopRequireDefault(_CheckCircle);

var _Error = require('@material-ui/icons/Error');

var _Error2 = _interopRequireDefault(_Error);

var _Info = require('@material-ui/icons/Info');

var _Info2 = _interopRequireDefault(_Info);

var _green = require('@material-ui/core/colors/green');

var _green2 = _interopRequireDefault(_green);

var _amber = require('@material-ui/core/colors/amber');

var _amber2 = _interopRequireDefault(_amber);

var _SnackbarContent = require('@material-ui/core/SnackbarContent');

var _SnackbarContent2 = _interopRequireDefault(_SnackbarContent);

var _Warning = require('@material-ui/icons/Warning');

var _Warning2 = _interopRequireDefault(_Warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4
    }
  };
};
var _ref = null;

var SimpleSnackbar = function (_React$Component) {
  _inherits(SimpleSnackbar, _React$Component);

  function SimpleSnackbar(props) {
    _classCallCheck(this, SimpleSnackbar);

    var _this = _possibleConstructorReturn(this, (SimpleSnackbar.__proto__ || Object.getPrototypeOf(SimpleSnackbar)).call(this, props));

    _this.state = {
      open: false,
      type: "default"
    };
    _ref = _this;

    _this.OpenSnack = function (_ref2) {
      var _ref2$message = _ref2.message,
          message = _ref2$message === undefined ? '' : _ref2$message,
          _ref2$type = _ref2.type,
          type = _ref2$type === undefined ? "default" : _ref2$type;

      _this.setState({ open: true, message: message, type: type });
    };

    _this.handleClose = function (event, reason) {
      console.log(reason);
      if (reason === 'clickaway') {
        return;
      }

      _this.setState({ open: false });
    };
    return _this;
  }

  _createClass(SimpleSnackbar, [{
    key: 'render',
    value: function render() {
      var classes = this.props.classes;
      var _state = this.state,
          message = _state.message,
          type = _state.type;


      return [_react2.default.createElement(
        _Snackbar2.default,
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          open: this.state.open,
          autoHideDuration: 6000,
          onClose: this.handleClose,
          ContentProps: {
            'aria-describedby': 'message-id'
          }
        },
        _react2.default.createElement(MySnackbarContentWrapper, {
          onClose: this.handleClose,
          variant: type,
          message: message
        })
      )];
    }
  }]);

  return SimpleSnackbar;
}(_react2.default.Component);

var variantIcon = {
  success: _CheckCircle2.default,
  warning: _Warning2.default,
  error: _Error2.default,
  info: _Info2.default,
  default: _Info2.default
};

var styles1 = function styles1(theme) {
  return {
    success: {
      backgroundColor: _green2.default[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: _amber2.default[700]
    },
    default: {},
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: "sans-serif"
    }
  };
};

function MySnackbarContent(props) {
  var classes = props.classes,
      className = props.className,
      message = props.message,
      onClose = props.onClose,
      variant = props.variant;

  var Icon = variantIcon[variant];

  return _react2.default.createElement(_SnackbarContent2.default, _extends({}, props, {
    className: (0, _classnames2.default)(classes[variant], className),
    'aria-describedby': 'client-snackbar',
    message: _react2.default.createElement(
      'span',
      { id: 'client-snackbar', className: classes.message },
      _react2.default.createElement(Icon, { className: (0, _classnames2.default)(classes.icon, classes.iconVariant) }),
      message
    ),
    action: [_react2.default.createElement(
      _IconButton2.default,
      {
        key: 'close',
        'aria-label': 'Close',
        color: 'inherit',
        className: classes.close,
        onClick: onClose
      },
      _react2.default.createElement(_Close2.default, { className: classes.icon })
    )]
  }));
}

SimpleSnackbar.propTypes = {
  classes: _propTypes2.default.object.isRequired
};
function OpenSnack() {
  if (_ref) {
    var _ref3;

    (_ref3 = _ref).OpenSnack.apply(_ref3, arguments);
  }
}

exports.default = (0, _withStyles2.default)(styles)(SimpleSnackbar);


MySnackbarContent.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string,
  message: _propTypes2.default.node,
  onClose: _propTypes2.default.func,
  variant: _propTypes2.default.oneOf(['success', 'warning', 'error', 'info', 'default']).isRequired
};

var MySnackbarContentWrapper = (0, _withStyles2.default)(styles1)(MySnackbarContent);