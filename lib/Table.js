"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LinearProgress = require("@material-ui/core/LinearProgress");

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Toolbar = require("@material-ui/core/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _TablePagination = require("@material-ui/core/TablePagination");

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _TableSortLabel = require("@material-ui/core/TableSortLabel");

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _TableFooter = require("@material-ui/core/TableFooter");

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TableCell = require("@material-ui/core/TableCell");

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableBody = require("@material-ui/core/TableBody");

var _TableBody2 = _interopRequireDefault(_TableBody);

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Table = require("@material-ui/core/Table");

var _Table2 = _interopRequireDefault(_Table);

var _TableRow = require("@material-ui/core/TableRow");

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableHead = require("@material-ui/core/TableHead");

var _TableHead2 = _interopRequireDefault(_TableHead);

var _withStyles = require("@material-ui/core/styles/withStyles");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _FilterList = require("@material-ui/icons/FilterList");

var _FilterList2 = _interopRequireDefault(_FilterList);

var _Delete = require("@material-ui/icons/Delete");

var _Delete2 = _interopRequireDefault(_Delete);

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableStyle = function tableStyle(theme) {
  return {
    root: {
      width: "100%",
      overflowY: "auto"
    },
    table: {
      marginBottom: "0",
      width: "100%",
      maxWidth: "100%",
      backgroundColor: "transparent",
      borderSpacing: "0",
      borderCollapse: "collapse"
    },
    tableHeadCell: {
      // color: 'inherit',
      fontSize: "1em"
    },
    tableCell: {
      lineHeight: "1.42857143",
      padding: "5px 3px",
      paddingLeft: 10,
      verticalAlign: "middle"
    },
    tableCellReduzido: {
      lineHeight: "1.42857143",
      padding: 0,
      paddingLeft: 10,
      verticalAlign: "middle"
    },
    tableResponsive: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    }
  };
};

var CustomTable = function (_React$Component) {
  _inherits(CustomTable, _React$Component);

  function CustomTable(props) {
    _classCallCheck(this, CustomTable);

    var _this = _possibleConstructorReturn(this, (CustomTable.__proto__ || Object.getPrototypeOf(CustomTable)).call(this, props));

    _this.state = {
      select: []
    };
    return _this;
  }

  _createClass(CustomTable, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          tableHead = _props.tableHead,
          tableData = _props.tableData,
          onOrder = _props.onOrder,
          tableHeaderColor = _props.tableHeaderColor,
          order = _props.order,
          tagOrder = _props.tagOrder,
          count = _props.count,
          page = _props.page,
          rowsPerPage = _props.rowsPerPage,
          tableHeadAction = _props.tableHeadAction,
          handleChangePage = _props.handleChangePage,
          handleChangeRowsPerPage = _props.handleChangeRowsPerPage,
          valueSelect = _props.valueSelect,
          isSelected = _props.isSelected,
          selectAll = _props.selectAll,
          selectItem = _props.selectItem,
          actionBar = _props.actionBar,
          actionBarCheck = _props.actionBarCheck,
          actionBarNotCheck = _props.actionBarNotCheck,
          title = _props.title,
          renderFooter = _props.renderFooter,
          load = _props.load,
          _onClick = _props.onClick;

      return _react2.default.createElement(
        _Paper2.default,
        { className: classes.root },
        title && _react2.default.createElement(EnhancedTableToolbar, {
          valueSelect: valueSelect,
          numSelected: valueSelect && valueSelect.length,
          title: title,
          action: actionBar,
          actionBarCheck: actionBarCheck,
          actionBarNotCheck: actionBarNotCheck
        }),
        load && _react2.default.createElement(
          "div",
          { className: classes.spacer },
          _react2.default.createElement(_LinearProgress2.default, null)
        ),
        _react2.default.createElement(
          _Table2.default,
          { className: classes.table },
          tableHead !== undefined && _react2.default.createElement(
            _TableHead2.default,
            { className: classes[tableHeaderColor + "TableHeader"] },
            _react2.default.createElement(
              _TableRow2.default,
              null,
              valueSelect && _react2.default.createElement(
                _TableCell2.default,
                { padding: "checkbox" },
                _react2.default.createElement(_Checkbox2.default, {
                  indeterminate: valueSelect.length > 0 && valueSelect.length < tableData.length,
                  checked: valueSelect.length === tableData.length,
                  onClick: function onClick() {
                    return selectAll();
                  }
                })
              ),
              tableHead.map(function (prop, key) {
                return _react2.default.createElement(
                  _TableCell2.default,
                  {
                    className: classes.tableCell + " " + classes.tableHeadCell,
                    key: key
                  },
                  prop
                );
              })
            )
          ),
          _react2.default.createElement(
            _TableBody2.default,
            null,
            tableData.map(function (prop, key) {
              return _react2.default.createElement(
                _TableRow2.default,
                {
                  hover: true,
                  role: "checkbox",
                  onClick: function onClick(event) {
                    if (selectItem) selectItem(key);
                    if (_onClick) _onClick(key);
                  },
                  "aria-checked": isSelected && isSelected(key),
                  selected: isSelected && isSelected(key),
                  key: key
                },
                valueSelect && _react2.default.createElement(
                  _TableCell2.default,
                  { padding: "checkbox" },
                  _react2.default.createElement(_Checkbox2.default, { checked: isSelected(key) })
                ),
                prop.map(function (prop, key) {
                  return _react2.default.createElement(
                    _TableCell2.default
                    // onClick={()=> {console.log(prop)}}
                    ,
                    { className: classes.tableCell,
                      key: key
                    },
                    prop
                  );
                })
              );
            })
          ),
          this.props.tablePagination && _react2.default.createElement(
            _TableFooter2.default,
            null,
            _react2.default.createElement(
              _TableRow2.default,
              null,
              _react2.default.createElement(_TablePagination2.default, {
                colSpan: 6,
                count: count,
                rowsPerPage: rowsPerPage,
                page: page,
                backIconButtonProps: {
                  "aria-label": "Página Anterior"
                },
                nextIconButtonProps: {
                  "aria-label": "Próxima Página"
                },
                labelRowsPerPage: "Por página",
                rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100, 200, 300, 400],
                labelDisplayedRows: function labelDisplayedRows(_ref) {
                  var from = _ref.from,
                      to = _ref.to,
                      count = _ref.count;

                  return from + " a " + to + " de " + count;
                },
                onChangePage: handleChangePage,
                onChangeRowsPerPage: handleChangeRowsPerPage
              })
            )
          )
        ),
        renderFooter && _react2.default.createElement(
          "div",
          { className: classes.tableCell + " " + classes.tableHeadCell },
          renderFooter
        )
      );
    }
  }]);

  return CustomTable;
}(_react2.default.Component);

var toolbarStyles = function toolbarStyles(theme) {
  return {
    root: {
      padding: theme.spacing.unit,
      flexWrap: "wrap"
    },
    highlight: theme.palette.type === "light" ? {
      color: theme.palette.primary.main,
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.primary.light, 0.85)
    } : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark
    },
    actions: {
      color: theme.palette.text.secondary,
      flexDirection: "row",
      display: "flex"
    },
    title: {
      flex: "0 0 auto",
      marginRight: "auto"
    }
  };
};

var EnhancedTableToolbar = function EnhancedTableToolbar(props) {
  var numSelected = props.numSelected,
      classes = props.classes,
      actionBarCheck = props.actionBarCheck,
      actionBarNotCheck = props.actionBarNotCheck,
      action = props.action,
      title = props.title,
      valueSelect = props.valueSelect;


  return _react2.default.createElement(
    _Toolbar2.default,
    {
      className: (0, _classnames2.default)(classes.root, _defineProperty({}, classes.highlight, numSelected > 0)) + " " + "tab-title"
    },
    _react2.default.createElement(
      "div",
      { className: classes.title },
      numSelected > 0 ? valueSelect && _react2.default.createElement(
        _Typography2.default,
        { color: "inherit", variant: "subheading" },
        numSelected,
        " selected"
      ) : _react2.default.createElement(
        _Typography2.default,
        { variant: "title", id: "tableTitle" },
        title
      )
    ),
    _react2.default.createElement(
      "div",
      { className: classes.actions },
      action,
      numSelected > 0 ? actionBarCheck : actionBarNotCheck
    )
  );
};

EnhancedTableToolbar.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  numSelected: _propTypes2.default.number.isRequired
};

EnhancedTableToolbar = (0, _withStyles2.default)(toolbarStyles)(EnhancedTableToolbar);

exports.default = (0, _withStyles2.default)(tableStyle)(CustomTable);