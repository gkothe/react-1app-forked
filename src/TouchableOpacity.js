import React from "react";
import View from "./View";
import Text from "./Text";
import { NavLink } from "react-router-dom";

var contador = 0;

export default class TouchableOpacity extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: {},
      opacity: 1
    };
    contador = contador + 1;
    this.id = contador + "_buttom";
  }

  componentdid() {}
  componentDidMount() {
    if (this.props.tooltip) {
    }
  }

  render() {
    var style = {
      cursor: "pointer",
      padding: 0,
      "-moz-user-select": "-moz-none",
      "-khtml-user-select": "none",
      "-webkit-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      color: "#444"
    }; //,flex:"1 1 auto" ,flexWrap: "wrap"
    style.transition = "opacity 0.2s";
    style.opacity = this.state.opacity;

    if (this.props.style) {
      var lista = [];
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
      }
      if (this.props.superStyle && typeof this.props.superStyle === "object") {
        lista.push(this.props.superStyle);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if (!st) {
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
      if (this.state.hover) {
        var tags = Object.keys(this.state.hover);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = this.state.hover[tags[i]];
        }
      }
    }
    // console.log(style);
    if (
      (!this.props.to && !this.props.onClick && !this.props.onPress) ||
      this.props.disabled
    ) {
      style.cursor = "default";
      return (
        <View
          {...this.props}
          style={[style, { opacity: this.props.disabled ? 1 : 1 }]}
        >
          {this.props.label ? (
            <Text
              text={this.props.label}
              style={{ textAlign: "center", flex: 1 }}
            />
          ) : null}
          {this.props.children}
        </View>
      );
    }

    if (this.props.elevation) {
      style.boxShadow =
        "1px 2px " + this.props.elevation * 3 + "px 0px rgba(0,0,0,0.5)";
    }
    if (this.props.to) {
      return (
        <NavLink to={this.props.to}>
          <View
            {...this.props}
            onPress={null}
            id={this.id}
            style={style}
            onDoubleClick={e => {
              e.stopPropagation();
              // console.log(ev);

              if (this.props.onDoubleClick) {
                this.props.onDoubleClick();
              }
            }}
            onMouseEnter={e => {
              this.setState({
                opacity: 0.9
              });
              if (this.props.onMouseEnter) {
                this.props.onMouseEnter(e);
              }
            }}
            onMouseLeave={e => {
              this.setState({
                opacity: 1
              });
              if (this.props.onMouseLeave) {
                this.props.onMouseLeave(e);
              }
            }}
            onMouseUp={e => {
              this.setState({
                opacity: 1
              });
              if (this.props.onMouseUp) {
                this.props.onMouseUp(e);
              }
            }}
            onMouseDown={e => {
              this.setState({
                opacity: 0.5
              });
              if (this.props.onMouseDown) {
                this.props.onMouseDown(e);
              }
            }}
            onClick={e => {
              this.setState({
                opacity: 0.3
              });
              setTimeout(() => {
                this.setState({
                  opacity: 1
                });
              }, 500);
              if (!this.props.disabled) {
                if (this.props.onClick) {
                  e.stopPropagation();
                  this.props.onClick();
                }
                if (this.props.onPress) {
                  e.stopPropagation();
                  this.props.onPress();
                }
              }
            }}
          >
            {" "}
            {this.props.children}{" "}
          </View>
        </NavLink>
      );
    }
    // console.log(style);
    return (
      <View
        {...this.props}
        onPress={null}
        id={this.id}
        style={style}
        onDoubleClick={e => {
          e.stopPropagation();
          // console.log(ev);

          if (this.props.onDoubleClick) {
            this.props.onDoubleClick();
          }
        }}
        onMouseEnter={e => {
          this.setState({
            opacity: 0.9
          });
          if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
          }
        }}
        onMouseLeave={e => {
          this.setState({
            opacity: 1
          });
          if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
          }
        }}
        onMouseUp={e => {
          this.setState({
            opacity: 1
          });
          if (this.props.onMouseUp) {
            this.props.onMouseUp(e);
          }
        }}
        onMouseDown={e => {
          this.setState({
            opacity: 0.5
          });
          if (this.props.onMouseDown) {
            this.props.onMouseDown(e);
          }
        }}
        onClick={e => {
          this.setState({
            opacity: 0.3
          });
          setTimeout(() => {
            this.setState({
              opacity: 1
            });
          }, 500);
          if (!this.props.disabled) {
            if (this.props.onClick) {
              e.stopPropagation();
              this.props.onClick();
            }
            if (this.props.onPress) {
              e.stopPropagation();
              this.props.onPress();
            }
          }
        }}
      >
        {" "}
        {this.props.children}{" "}
      </View>
    );
  }
}
