import React from 'react';
var QRCode = require('qrcode.react');

export default class QRCodeView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state ={hover:null};
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps !==this.props){
  //   }
  //   return true;
  // }


  render() {

    var style = { };//,flex:"1 1 auto" ,flexWrap: "wrap"
    //,alignSelf: "flex-start"
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


    return (
        <QRCode style={ style } {...this.props}  bgColor={this.props.fgColor} fgColor={this.props.bgColor} />
    );
  }

}
