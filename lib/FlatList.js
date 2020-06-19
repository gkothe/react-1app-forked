"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _reactWindow = require("react-window");

var _reactVirtualizedAutoSizer = require("react-virtualized-auto-sizer");

var _reactVirtualizedAutoSizer2 = _interopRequireDefault(_reactVirtualizedAutoSizer);

var _TablePagination = require("@material-ui/core/TablePagination");

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _LinearProgress = require("@material-ui/core/LinearProgress");

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var conte = 0;

var FlatList = function (_React$Component) {
  _inherits(FlatList, _React$Component);

  function FlatList(props) {
    _classCallCheck(this, FlatList);

    var _this = _possibleConstructorReturn(this, (FlatList.__proto__ || Object.getPrototypeOf(FlatList)).call(this, props));

    _this.id_key = conte++;
    return _this;
  }

  _createClass(FlatList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$itemSize = _props.itemSize,
          itemSize = _props$itemSize === undefined ? 56 : _props$itemSize,
          load = _props.load,
          style = _props.style,
          ListHeaderComponent = _props.ListHeaderComponent,
          renderHeader = _props.renderHeader,
          data = _props.data,
          lista = _props.lista,
          dataSource = _props.dataSource,
          renderItem = _props.renderItem,
          renderRow = _props.renderRow,
          ItemSeparatorComponent = _props.ItemSeparatorComponent,
          renderSeparator = _props.renderSeparator,
          separator = _props.separator,
          ListFooterComponent = _props.ListFooterComponent,
          renderFooter = _props.renderFooter,
          tablePagination = _props.tablePagination,
          count = _props.count,
          page = _props.page,
          rowsPerPage = _props.rowsPerPage,
          handleChangePage = _props.handleChangePage,
          handleChangeRowsPerPage = _props.handleChangeRowsPerPage;

      var list = data || lista || dataSource || [];
      var Row = function Row(_ref) {
        var index = _ref.index,
            style = _ref.style;

        var item = list[index];
        if (!item) return _react2.default.createElement("div", { style: style });
        return _react2.default.createElement(
          "div",
          { style: style },
          _react2.default.createElement(ItemList, {
            key: "Key_item" + index + "_" + _this2.id_key,
            id: "id_Key_item" + index + "_" + _this2.id_key,
            Item: renderItem && renderItem({ item: item, index: index }, index) || renderRow && renderRow(item, index, index) || null,
            Separator: ItemSeparatorComponent && ItemSeparatorComponent({ item: item, index: index }, index) || renderSeparator && renderSeparator(item, index) || separator && _react2.default.createElement(_Divider2.default, null) || null
          })
        );
      };
      return _react2.default.createElement(
        _View2.default,
        {
          key: "list_key" + this.id_key,
          id: "list_id" + this.id_key,
          style: Util.styleMack([{ overflow: "hidden", flexDirection: "column", width: "100%", height: "100%", display: "block" }, style]) },
        ListHeaderComponent && ListHeaderComponent() || renderHeader && renderHeader() || null,
        load && _react2.default.createElement(_LinearProgress2.default, null),
        _react2.default.createElement(
          _reactVirtualizedAutoSizer2.default,
          null,
          function (_ref2) {
            var height = _ref2.height,
                width = _ref2.width;
            return _react2.default.createElement(
              _reactWindow.FixedSizeList,
              {
                className: "List",
                height: height,
                itemCount: list.length || 0,
                itemSize: itemSize,
                width: width
              },
              Row
            );
          }
        ),
        ListFooterComponent && ListFooterComponent() || renderFooter && renderFooter(),
        tablePagination && _react2.default.createElement(_TablePagination2.default, {
          colSpan: 6,
          style: { display: "contents" },
          count: count,
          rowsPerPage: rowsPerPage,
          page: page,
          backIconButtonProps: {
            'aria-label': 'Página Anterior'
          },
          nextIconButtonProps: {
            'aria-label': 'Próxima Página'
          },
          labelRowsPerPage: "Resultados por página",
          rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100, 200, 300, 400],
          labelDisplayedRows: function labelDisplayedRows(_ref3) {
            var from = _ref3.from,
                to = _ref3.to,
                count = _ref3.count;

            return "Resultados " + from + " a " + to + " de " + count;
          },
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage
        })
      );
    }
  }]);

  return FlatList;
}(_react2.default.Component);

;

var ItemList = function (_React$Component2) {
  _inherits(ItemList, _React$Component2);

  function ItemList() {
    _classCallCheck(this, ItemList);

    return _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).apply(this, arguments));
  }

  _createClass(ItemList, [{
    key: "render",
    value: function render() {
      var _props2 = this.props,
          Item = _props2.Item,
          Separator = _props2.Separator;

      return [Item, Separator];
    }
  }]);

  return ItemList;
}(_react2.default.Component);

exports.default = FlatList;