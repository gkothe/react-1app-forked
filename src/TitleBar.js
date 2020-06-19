//TitleBar

import React from 'react';
import View from './View';

var corPadrao = null;
export default class TitleBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {open:true};
  }



  render() {

    var style = { display:"flex"};//,flex:"1 1 auto" ,flexWrap: "wrap"

    if(this.props.style){
      var lista = [];
      if( Array === this.props.style.constructor){
        lista = this.props.style;
      }else{
        lista.push(this.props.style);
      }
      if(this.props.superStyle && typeof this.props.superStyle === "object"){
        lista.push(this.props.superStyle);
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
    if(!this.props.removeShadow){
      style.boxShadow = "0px 0px 5px 1px rgba(0, 0, 0, 0.31)";
    }
    if(corPadrao){
      style.backgroundColor = corPadrao;
    }
    if(this.props.fixed){
      return (
        <View style={[{zIndex:15, height:style.height}]} >
          <View style={[style,{zIndex:1500,position:"fixed",left:0,right:0,top:0}]} >
            {this.props.children}
          </View>
        </View>
      );
    }
    return (
      <View style={[style,{zIndex:15}]} >
        {this.props.children}
      </View>
    );


  }

}

TitleBar.setCor = function(cor){
  corPadrao = cor;
}
