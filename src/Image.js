import React from 'react';
import View from './View.js';
import * as Util from "./Util"

export default  class Image extends React.Component {
  render() {
    var style = Util.styleMack([{
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      flex: "0 1 auto",
      minHeight: 5,
      minWidth: 5,
      display: "flex",
      boxSizing: "border-box",
      flex: "0 1 auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%"
    },this.props.style]);

    var url = this.props.src || this.props.source&&this.props.source.uri||this.props.source;
    if (this.props.resizeMode === "center" || this.props.resizeMode === "cover") {
      style.backgroundSize = "cover";
    } else if (this.props.resizeMode === "fit" || this.props.resizeMode === "contain") {
      style.backgroundSize = "contain";
    } else if (this.props.resizeMode === "fill") {
      style.backgroundSize = "cover";
    } else if (this.props.resizeMode === "matriz" || this.props.resizeMode === "stretch") {
      style.backgroundSize = "100% 100%";
    } else if (this.props.resizeMode === "stretch") {
      style.backgroundSize = "100% 100%";
    } else if (this.props.resizeMode === "contain") {
      style.backgroundSize = "contain";
    } else {
      style.backgroundSize = "cover";
    }


    if (url) {
      style.backgroundImage = "url('" + url + "')";
    }

    return (
      <div
        {...this.props}
        style = {style}  >
        {
          this.props.children
        }
      </div>
    );
  }

}

Image.resizeMode = {
  cover: "center",
  contain: "fit",
  stretch: "matriz",
  repeat: "repeat",
  center: "fill"
};
