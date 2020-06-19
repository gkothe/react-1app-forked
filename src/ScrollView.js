import React from 'react';

export default class ScrollView extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps !==this.props){
  //   }
  //   return true;
  // }


  render() {

    var style = {
      overflowX: "auto",
      flexDirection: "column",
      // display:"flex",
      boxSizing: "border-box",
      width:"100%",
      display:"block",
      flex: "0 1 auto"
    };//,flex:"1 1 auto" ,flexWrap: "wrap"
      //,alignSelf: "flex-start"
      if(this.props.style){
        var lista = [];
        if( Array === this.props.style.constructor){
          lista = this.props.style;
        }else{
          lista.push(this.props.style);
        }
        for (var a = 0; a < lista.length; a++) {
          var st = lista[a];
          if(!st){
            continue;
          }
          var tags = Object.keys(st);
          for (var i = 0; i < tags.length; i++) {
            style[tags[i]] = st[tags[i]];
          }
        }
      }
      if(this.props.horizontal == true){
        style.overflowX = "auto";
        style.overflowY = "hidden";
      }else{
        style.overflowX = "hidden";
        style.overflowY = "auto";
      }
      return (
        <div   style={style}>
          {this.props.children}
        </div>
      );
    }

  }

  // export default Main;
