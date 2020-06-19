'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridView = function (_React$Component) {
  _inherits(GridView, _React$Component);

  function GridView() {
    _classCallCheck(this, GridView);

    return _possibleConstructorReturn(this, (GridView.__proto__ || Object.getPrototypeOf(GridView)).apply(this, arguments));
  }

  _createClass(GridView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = Util.styleMack([{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        flexDirection: "row"
      }, this.props.style]);

      return _react2.default.createElement(
        _View2.default,
        { style: style },
        this.props.refreshControl ? this.props.refreshControl : "",
        this.props.renderHeader ? this.props.renderHeader() : "",
        this.props.dataSource && this.props.dataSource.map(function (rowData, rowID) {
          var width = "100%";
          if (_this2.props.column) {
            width = 100 / _this2.props.column + "%";
          }
          var padding = 0;
          if (_this2.props.paddingColumn) {
            padding = _this2.props.paddingColumn;
          }
          if (_this2.props.renderRow) {
            return _react2.default.createElement(
              _View2.default,
              { style: { width: width, maxWidth: width, padding: padding, flex: "1 0 auto", flexDirection: "column" }, key: "cell_list_" + rowID },
              _this2.props.renderRow(rowData, 1, rowID)
            );
          } else {
            return _react2.default.createElement(_View2.default, { key: "cell_list_" + rowID });
          }
        }),
        this.props.renderFooter ? this.props.renderFooter() : ""
      );
    }
  }]);

  return GridView;
}(_react2.default.Component);

exports.default = GridView;