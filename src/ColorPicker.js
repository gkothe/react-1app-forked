"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker, ChromePicker, Sketch } from "react-color";
import {Text,TextInput} from "../";
// import TextInput from "./TextInput";
import Colr from "colr";
let colr = new Colr();
// import $ from "jquery";

export default class ColorPickerView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayColorPicker: false,
      color: { r: "255", g: "255", b: "255", a: "1" }
    };
    if (props.value) {
      this.state.color = this.tratarText(props.value);
      this.state.value = props.value;
    }
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.color = this.tratarText(nextProps.value);
      nextState.value = nextProps.value;
      if (!nextState.value) {
        nextState.value = "";
        nextState.color = this.tratarText("rgba(0,0,0,0)");
      }
    }
    return true;
  }

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "25px",
          height: "25px",
          borderRadius: "2px",
          background: this.state.value
          // background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          height: 25,
          padding: "0px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          cursor: "pointer"
        },
        popover: {
          marginTop: 140,
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });
    var style = {
      fontFamily: "sans-serif",
      display: "flex",
      boxSizing: "border-box",
      alignItems: "center",
      alignContent: "space-between",
      justifyContent: "space-between",
      width: "100%",
      flex: "0 1 auto"
    }; //,flex:"1 1 auto" ,flexWrap: "wrap"
    //,alignSelf: "flex-start"
    if (this.props.style) {
      var lista = [];
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }

    return (
      <div
        style={{
          padding: 0,
          margin: 0,
          flexDirection: "column",
          display: "flex",
          width: "100%"
        }}
      >
        {this.props.label ? (
          <Text
            style={{
              fontSize: 11,
              padding: 0,
              margin: 0,
              color: "#999"
            }}
          >
            {this.props.label}
          </Text>
        ) : (
          ""
        )}

        <div style={style}>
          <TextInput
            onSubmitEditing={() => {
              // this.setState({ value: this.getRGBAString() });
              if (!this.state.value) {
                this.setState({ color: null });
                if (this.props.onChange) {
                  this.state.color = null;
                  this.props.onChange(null);
                }
              } else {
                var rgba = this.tratarText(this.state.value);
                this.setState({ color: rgba });
                if (this.props.onChange) {
                  this.state.color = rgba;
                  this.props.onChange(this.getRGBAString());
                }
              }
            }}
            onChange={originValue => {
              // var rgba = this.tratarText(originValue);
              // this.setState({ color: rgba, value: originValue });
              // if (this.props.onChange) {
              //   this.state.color = rgba;
              //   this.props.onChange(this.getRGBAString());
              // }
              this.setState({ value: originValue });
            }}
            value={this.state.value}
          />

          <div
            style={styles.swatch}
            onClick={() => {
              this.handleClick();
            }}
          >
            <div style={styles.color} />
          </div>
          {this.state.displayColorPicker ? (
            <div style={styles.popover}>
              <div
                style={styles.cover}
                onClick={() => {
                  this.handleClose();
                }}
              />
              <SketchPicker
                disableAlpha={false}
                presetColors={this.props.presetColors}
                color={this.state.color}
                onChange={color => {
                  this.state.color = color.rgb;
                  this.setState({
                    color: color.rgb,
                    value: this.getRGBAString()
                  });

                  if (this.props.onChange) {
                    this.props.onChange(this.getRGBAString());
                  }
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  getRGBAString() {
    var rgba = this.state.color;
    if (rgba) {
      return (
        "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")"
      );
    } else {
      return "rgba(255,255,255,1)";
    }
  }

  tratarText(originValue) {
    if (!originValue) {
      return this.state.color;
    }
    // console.log("---");
    // console.log(originValue);
    let value = originValue.replace(/\s/g, "");
    // console.log(value);
    let colorObj = this.getColorFromStr(value);
    // console.log(colorObj);
    if (colorObj) {
      let { color, alpha } = colorObj;
      if (alpha != 0 && !alpha) {
        alpha = 100;
      }
      let rgb = color.toRgbObject();
      rgb.a = alpha / 100;
      // var text =  "rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(alpha/100)+")";
      // this.setState({color:text})
      return rgb;
    } else {
      return this.state.color;
    }
  }

  getColorFromStr(colorStr) {
    colorStr = colorStr + "";

    let regHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    let regRgb = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i;
    let regRgba = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(0(\.\d+)?|1(\.0)?)\)$/i;
    let regHsv = /^hsv\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i;
    let regHsl = /^hsl\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i;
    if (regHex.test(colorStr)) {
      return { color: colr.fromHex(colorStr), textMode: "HEX" };
    }

    let matches;
    let alpha;
    let color;
    let textMode;
    if ((matches = colorStr.match(regRgb))) {
      color = colr.fromRgbArray(matches.slice(1, 4).map(n => +n));
      textMode = "RGB";
    } else if ((matches = colorStr.match(regRgba))) {
      color = colr.fromRgbArray(matches.slice(1, 4).map(n => +n));
      alpha = parseInt(matches[4] * 100, 10);
      textMode = "RGBA";
    } else if ((matches = colorStr.match(regHsv))) {
      color = colr.fromHsvArray(matches.slice(1, 4).map(n => +n));
      textMode = "HSB";
    } else if ((matches = colorStr.match(regHsl))) {
      color = colr.fromHslArray(matches.slice(1, 4).map(n => +n));
      textMode = "HSL";
    }
    if (matches) {
      return { color, alpha, textMode };
    }
    return null;
  }
}

// export default ColorPicker;
