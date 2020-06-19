import React, { Component } from "react";
import Image from "./Image";
import View from "./View";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
let PlaySwipeableViews = SwipeableViews;

export default class Photos extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      lista: props.list ? props.list : []
    };
    if (props.autoPlay) {
      PlaySwipeableViews = autoPlay(SwipeableViews);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.lista = nextProps.list;
    }
    return true;
  }
  getViews() {
    var fotosList = [];
    if (this.state.lista) {
      for (var i = 0; i < this.state.lista.length; i++) {
        let item = this.state.lista[i];
        if (item && (item.url || item.url_img)) {
          fotosList.push(
            <Image
              key={"foto_" + i}
              src={item.url ? item.url : item.url_img}
              resizeMode={Image.cover}
              style={{
                height: this.props.style ? this.props.style.height : "100%",
                alignSelf: "stretch",
                flex: 1
              }}
            >
              {item.titulo || item.descricao ? (
                <div
                  style={{
                    fontFamily: "sans-serif",
                    textShadow: "#000 0px 0px 6px "
                  }}
                >
                  {item.titulo ? <h2>{item.titulo}</h2> : null}
                  {item.descricao ? <h4>{item.descricao}</h4> : null}
                </div>
              ) : null}
            </Image>
          );
        }
      }
    }
    return fotosList;
  }
  render() {
    var style = {
      display: "flex",
      boxSizing: "border-box",
      width: "100%",
      alignItems: "center",
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
    }

    // style.flex = 1;
    // style.display = "flex";
    // style.alignSelf = "stretch";
    const { index } = this.state;
    style.alignItems = "center";
    style.justifyContent = "flex-end";
    style.flexDirection = "column";

    return (
      <View style={style}>
        <PlaySwipeableViews
          index={index}
          enableMouseEvents
          style={{ flex: 1, alignSelf: "flex", width: "100%" }}
          onChangeIndex={index => {
            this.setState({
              index
            });
          }}
          containerStyle={{ alignSelf: "stretch" }}
        >
          {this.getViews()}
        </PlaySwipeableViews>
        <Pagination
          dots={this.state.lista ? this.state.lista.length : 0}
          index={index}
          onChangeIndex={index => {
            this.setState({ index });
          }}
        />
      </View>
    );
  }
}

class Pagination extends Component {
  render() {
    const { index, dots } = this.props;

    const children = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          onClick={(event, index) => {
            this.props.onChangeIndex(index);
          }}
        />
      );
    }

    return <div style={styles.rootPagination}>{children}</div>;
  }
}

class PaginationDot extends Component {
  render() {
    const { active } = this.props;

    let styleDot;

    if (active) {
      styleDot = Object.assign({}, styles.dot, styles.active);
    } else {
      styleDot = styles.dot;
    }

    return (
      <button
        style={styles.root}
        onClick={event => {
          this.props.onClick(event, this.props.index);
        }}
      >
        <div style={styleDot} />
      </button>
    );
  }
}
const styles = {
  rootPagination: {
    padding: 5,
    position: "absolute",
    display: "flex",
    flexDirection: "row"
  },
  root: {
    height: 18,
    width: 18,
    cursor: "pointer",
    border: 0,
    background: "none",
    padding: 0
  },
  dot: {
    border: "solid 2px #000",
    backgroundColor: "#fff",
    height: 12,
    width: 12,
    borderRadius: 10,
    margin: 3
  },
  active: {
    border: "solid 2px #fff",
    backgroundColor: "#444"
  }
};
