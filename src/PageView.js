import React, { Component } from "react";
import Image from './Image';
import View from './View'
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
var contadorCell =0;
let PlaySwipeableViews =SwipeableViews;

export default class PageView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index:0,
      lista: props.dataSource?props.dataSource:[]
    };

    if(props.autoPlay  ){
      PlaySwipeableViews = autoPlay(SwipeableViews);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
      nextState.lista =  nextProps.dataSource;
    }
    return true;
  }

  renderRow(rowData, sectionID, rowID) {
    contadorCell++;
    if (this.props.renderRow) {
      return (
        <View
          id={"cell_page_" + rowID+"_"+contadorCell}
          key={"cell_page_" + rowID+"_"+contadorCell}

          style={{
            height: this.props.style ? this.props.style.height : "100%",
            alignSelf: "stretch",
            flex: 1
          }}
          >
          {this.props.renderRow(rowData, sectionID, rowID)}
        </View>
      );
    } else {
      return <View key={"cell_list_" + rowID} />;
    }
  }

  getItens() {
    if (!this.state.lista) {
      return null;
    }
    var tags = [];
    for (var i = 0; i < this.state.lista.length; i++) {
      let item = this.state.lista[i];
      tags.push(this.renderRow(item, 1, i));
    }
    return tags;
  }
  render() {
    var style = {
      display: "flex",
      boxSizing: "border-box",
      width: "100%",
      alignItems:"center",
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
    style.alignItems ="center";
    style.justifyContent="flex-end";
    style.flexDirection="column";


    return (
      <View style={style}>
        <PlaySwipeableViews
          index={index}
          animateTransitions={true}
          autoPlay={this.props.autoPlay }
          enableMouseEvents
          interval={5000}
          style={{ flex: 1, alignSelf: "flex" ,width:"100%"}}
          onChangeIndex={index => {
            this.setState({
              index
            });
            this.index = index;
          }}
          containerStyle={{ alignSelf: "stretch" }}
          >
          {this.getItens()}
        </PlaySwipeableViews>
        <Pagination
          dots={this.state.lista?this.state.lista.length:0}
          index={index}
          onChangeIndex={(index)=>{
            this.setState({   index     });
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
          onClick={(event, index) =>  {
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
        <button style={styles.root} onClick={ (event)  =>{
            this.props.onClick(event, this.props.index);
          }}>
          <div style={styleDot} />
        </button>
      );
    }
  }
  const styles = {
    rootPagination: {
      padding:5,
      position: "absolute",
      display: "flex",
      flexDirection: "row"
    },
    root: {
      opacity:0.5,
      height: 18,
      width: 18,
      cursor: "pointer",
      border: 0,
      background: "none",
      padding: 0
    },
    dot: {
      border:"solid 2px #000",
      backgroundColor: "#fff",
      height: 12,
      width: 12,
      borderRadius: 10,
      margin: 3
    },
    active: {
      border:"solid 2px #fff",
      backgroundColor: "#444"
    }
  };
