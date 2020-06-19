'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _TablePagination = require('@material-ui/core/TablePagination');

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var conte = 0;

var ListView = function (_React$Component) {
  _inherits(ListView, _React$Component);

  function ListView(props) {
    _classCallCheck(this, ListView);

    var _this = _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, props));

    _this.id_key = conte++;
    return _this;
  }

  _createClass(ListView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          ListHeaderComponent = _props.ListHeaderComponent,
          renderItem = _props.renderItem,
          data = _props.data,
          count = _props.count,
          rowsPerPage = _props.rowsPerPage,
          tablePagination = _props.tablePagination,
          page = _props.page,
          handleChangePage = _props.handleChangePage,
          handleChangeRowsPerPage = _props.handleChangeRowsPerPage,
          load = _props.load,
          renderHeader = _props.renderHeader,
          renderRow = _props.renderRow,
          lista = _props.lista,
          dataSource = _props.dataSource,
          style = _props.style,
          nativo = _props.nativo,
          ItemSeparatorComponent = _props.ItemSeparatorComponent,
          renderSeparator = _props.renderSeparator,
          separator = _props.separator,
          ListFooterComponent = _props.ListFooterComponent,
          renderFooter = _props.renderFooter;

      var list = data || lista || dataSource || [];
      var RenderList = nativo ? _View2.default : _List2.default;

      return _react2.default.createElement(
        RenderList,
        {
          key: "list_key" + this.id_key,
          id: "list_id" + this.id_key,
          style: Util.styleMack([{ flexDirection: "column", width: "100%", height: "100%", overflow: "hidden", display: "block" }, style]),
          subheader: _react2.default.createElement(Subheader, { key: "list_head_key" + this.id_key, Head: ListHeaderComponent && ListHeaderComponent() || renderHeader && renderHeader() || null }) },
        nativo ? _react2.default.createElement(Subheader, { key: "list_head_key" + this.id_key, Head: ListHeaderComponent && ListHeaderComponent() || renderHeader && renderHeader() || null }) : null,
        load && _react2.default.createElement(_LinearProgress2.default, null),
        list.map(function (item, index) {
          return _react2.default.createElement(ItemList, {
            key: "Key_item" + index + "_" + _this2.id_key,
            id: "id_Key_item" + index + "_" + _this2.id_key,
            Item: renderItem && renderItem({ item: item, index: index }, index) || renderRow && renderRow(item, index, index) || null,
            Separator: ItemSeparatorComponent && ItemSeparatorComponent({ item: item, index: index }, index) || renderSeparator && renderSeparator(item, index) || separator && _react2.default.createElement(_Divider2.default, null) || null
          });
        }),
        ListFooterComponent && ListFooterComponent(),
        renderFooter && renderFooter(),
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
          labelRowsPerPage: "Por página",
          rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100, 200, 300, 400],
          labelDisplayedRows: function labelDisplayedRows(_ref) {
            var from = _ref.from,
                to = _ref.to,
                count = _ref.count;

            return from + ' a ' + to + ' de ' + count;
          },
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage
        })
      );
    }
  }]);

  return ListView;
}(_react2.default.Component);

var Subheader = function (_React$Component2) {
  _inherits(Subheader, _React$Component2);

  function Subheader() {
    _classCallCheck(this, Subheader);

    return _possibleConstructorReturn(this, (Subheader.__proto__ || Object.getPrototypeOf(Subheader)).apply(this, arguments));
  }

  _createClass(Subheader, [{
    key: 'render',
    value: function render() {
      var Head = this.props.Head;

      return Head;
    }
  }]);

  return Subheader;
}(_react2.default.Component);

var ItemList = function (_React$Component3) {
  _inherits(ItemList, _React$Component3);

  function ItemList() {
    _classCallCheck(this, ItemList);

    return _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).apply(this, arguments));
  }

  _createClass(ItemList, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          Item = _props2.Item,
          Separator = _props2.Separator;

      return [Item, Separator];
    }
  }]);

  return ItemList;
}(_react2.default.Component);

exports.default = ListView;