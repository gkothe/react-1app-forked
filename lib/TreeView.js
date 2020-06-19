"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeView = _react2.default.createClass({
  propTypes: {
    collapsed: _react.PropTypes.bool,
    defaultCollapsed: _react.PropTypes.bool,
    nodeLabel: _react.PropTypes.node.isRequired,
    className: _react.PropTypes.string,
    itemClassName: _react.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return { collapsed: this.props.defaultCollapsed };
  },
  handleClick: function handleClick() {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.props.onClick) {
      var _props;

      (_props = this.props).onClick.apply(_props, arguments);
    }
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props,
        _props2$collapsed = _props2.collapsed,
        collapsed = _props2$collapsed === undefined ? this.state.collapsed : _props2$collapsed,
        _props2$className = _props2.className,
        className = _props2$className === undefined ? "" : _props2$className,
        _props2$itemClassName = _props2.itemClassName,
        itemClassName = _props2$itemClassName === undefined ? "" : _props2$itemClassName,
        nodeLabel = _props2.nodeLabel,
        children = _props2.children;


    var arrowClassName = "tree-view_arrow";
    var containerClassName = "tree-view_children";
    if (collapsed) {
      arrowClassName += " tree-view_arrow-collapsed";
      containerClassName += " tree-view_children-collapsed";
    }

    var arrow = _react2.default.createElement("div", {
      className: className + " " + arrowClassName,
      onClick: this.handleClick
    });
    var space = _react2.default.createElement("div", {
      style: { width: 20 }
    });

    return _react2.default.createElement(
      "div",
      { style: { width: "100%" }, className: "tree-view" },
      _react2.default.createElement(
        "div",
        {
          style: this.props.style,
          onClick: function onClick(e) {
            if (_this.props.onClick) {
              _this.props.onClick(e);
            }
          },
          className: "tree-view_item " + itemClassName
        },
        this.props.children && !this.props.blockChild ? arrow : space,
        nodeLabel
      ),
      _react2.default.createElement(
        "div",
        { className: containerClassName },
        collapsed ? null : children
      )
    );
  }
});

exports.default = TreeView;