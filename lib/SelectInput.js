'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Select = require('@material-ui/core/Select');

var _Select2 = _interopRequireDefault(_Select);

var _OutlinedInput = require('@material-ui/core/OutlinedInput');

var _OutlinedInput2 = _interopRequireDefault(_OutlinedInput);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var conte = 0;

var SelectInput = function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  function SelectInput() {
    _classCallCheck(this, SelectInput);

    return _possibleConstructorReturn(this, (SelectInput.__proto__ || Object.getPrototypeOf(SelectInput)).apply(this, arguments));
  }

  _createClass(SelectInput, [{
    key: 'getList',
    value: function getList() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (list[0] && (Util.isText(list[0]) || Util.isInteger(list[0]))) return list.map(function (item) {
        return { nome: item, value: item };
      });
      return list.map(function (item) {
        return Util.assign({ value: item.id, nome: item.text }, item);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      conte++;

      var _props = this.props,
          _props$label = _props.label,
          label = _props$label === undefined ? "-" : _props$label,
          _props$onChange = _props.onChange,
          _onChange = _props$onChange === undefined ? function () {
        return console.log("onChange");
      } : _props$onChange,
          _props$list = _props.list,
          list = _props$list === undefined ? [] : _props$list,
          _props$value = _props.value,
          value = _props$value === undefined ? '' : _props$value,
          _props$key_label = _props.key_label,
          key_label = _props$key_label === undefined ? 'nome' : _props$key_label,
          _props$key_value = _props.key_value,
          key_value = _props$key_value === undefined ? 'value' : _props$key_value,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style;

      return _react2.default.createElement(
        _FormControl2.default,
        { key: "select_f" + conte, fullWidth: true, variant: this.props.variant, margin: 'normal', style: style },
        _react2.default.createElement(
          _InputLabel2.default,
          { htmlFor: this.props.variant == "outlined" ? "outlined-age-simple" : '' },
          label
        ),
        _react2.default.createElement(
          _Select2.default,
          _extends({
            key: "select" + conte
          }, this.props, {
            value: value || '',
            onChange: function onChange(event, value) {
              var data = (_this2.getList(list) || []).find(function (item) {
                return item[key_value] == event.target.value;
              });
              _onChange(event.target.value, data);
            },
            autoWidth: true
          }),
          _react2.default.createElement(
            _MenuItem2.default,
            { value: null },
            _react2.default.createElement(
              'em',
              null,
              'Selecione'
            )
          ),
          (this.getList(list) || []).map(function (item, index) {
            return _react2.default.createElement(
              _MenuItem2.default,
              { key: conte + "select_key" + index, value: item[key_value] },
              item[key_label]
            );
          })
        )
      );
    }
  }]);

  return SelectInput;
}(_react2.default.Component);

exports.default = SelectInput;