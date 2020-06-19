'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RefreshControl = function (_React$Component) {
  _inherits(RefreshControl, _React$Component);

  function RefreshControl(props, context) {
    _classCallCheck(this, RefreshControl);

    var _this = _possibleConstructorReturn(this, (RefreshControl.__proto__ || Object.getPrototypeOf(RefreshControl)).call(this, props, context));

    _this.state = { refreshing: props.refreshing };
    return _this;
  }

  _createClass(RefreshControl, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps != this.props) {
        nextState.refreshing = nextProps.refreshing;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.refreshing) {
        return _react2.default.createElement('div', null);
      } else {
        return _react2.default.createElement(
          _View2.default,
          { style: { alignItems: "center", justifyContent: "center" } },
          _react2.default.createElement(
            _View2.default,
            { style: {
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                width: 44,
                borderRadius: 22,
                height: 44,
                marginBottom: -60,
                zIndex: 500,
                boxShadow: "0px 0px 8px 1px rgba(0, 0,0 , 0.5)",
                border: "#ccc 1px solid"
              } },
            _react2.default.createElement(_CircularProgress2.default, null)
          )
        );
      }
    }
  }]);

  return RefreshControl;
}(_react2.default.Component);

exports.default = RefreshControl;