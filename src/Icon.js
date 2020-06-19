import React from "react";
import * as Util from "./Util";
import Icon from "@material-ui/core/Icon";

class IconView extends React.Component {
  render() {
    var style = Util.styleMack([
      {
        fontSize: 25
        // color:'rgb(117,135,156)'
      },
      this.props.style
    ]);
    if (this.props.fromFontFamily == "Material Design Icons") {
      return (
        <Icon
          {...this.props}
          style={style}
          className={"mdi mdi-" + (this.props.name || this.props.icon)}
        />
      );
    }

    return (
      <Icon {...this.props} style={style}>
        {this.props.name || this.props.icon}
      </Icon>
    );
  }
}

export default IconView;

// <i
//   style={style}
//   className="material-icons">
//   {(this.props.name||this.props.icon)}
// </i>
