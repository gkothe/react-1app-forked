import React, { PropTypes } from "react";

const TreeView = React.createClass({
  propTypes: {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    nodeLabel: PropTypes.node.isRequired,
    className: PropTypes.string,
    itemClassName: PropTypes.string
  },

  getInitialState() {
    return { collapsed: this.props.defaultCollapsed };
  },

  handleClick(...args) {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  },

  render() {
    const {
      collapsed = this.state.collapsed,
      className = "",
      itemClassName = "",
      nodeLabel,
      children
      // ...rest,
    } = this.props;

    let arrowClassName = "tree-view_arrow";
    let containerClassName = "tree-view_children";
    if (collapsed) {
      arrowClassName += " tree-view_arrow-collapsed";
      containerClassName += " tree-view_children-collapsed";
    }

    const arrow = (
      <div
        className={className + " " + arrowClassName}
        onClick={this.handleClick}
      />
    );
     const space = (
      <div
        style={{width:20}}
      />
    );

    return (
      <div style={{ width: "100%" }} className="tree-view">
        <div
          style={this.props.style}
          onClick={e => {
            if (this.props.onClick) {
              this.props.onClick(e);
            }
          }}
          className={"tree-view_item " + itemClassName}
        >
          {this.props.children && !this.props.blockChild  ?arrow:space}
          {nodeLabel}
        </div>
        <div className={containerClassName}>
          {collapsed ? null : children}
        </div>
      </div>
    );
  }
});

export default TreeView;
