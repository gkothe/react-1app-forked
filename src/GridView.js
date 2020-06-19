import React from 'react';
import ApiUteis from '../api/uteis.js';
import View from './View';


export default class GridView extends React.Component {

  constructor(props, context) {
    super(props, context);
    // this.state =  { lista :props.dataSource.getLista() };
    if(props.dataSource && props.dataSource.getLista){
      this.state =  { lista :props.dataSource.getLista() };
    }else{
      this.state =  { lista :props.dataSource };
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
      if(nextProps.dataSource && nextProps.dataSource.getLista){
        nextState.lista  =nextProps.dataSource.getLista() ;
      }else{
        nextState.lista = nextProps.dataSource;
      }
    }
    return true;
  }

  renderRow(rowData, sectionID, rowID){
    var width = "100%";
    if(this.props.column){
      width = (100/this.props.column) +"%";
    }
    var padding = 0;
    if(this.props.paddingColumn){
      padding =this.props.paddingColumn;
    }
    // console.log(width);
    // console.log(this.props);
    // console.log(rowData);
    if(this.props.renderRow){
      return (
           <View row style={{width:width, maxWidth:width, padding:padding,   flex: "1 0 auto",flexDirection:"column"}}  key={"cell_list_"+rowID}>
            {this.props.renderRow(rowData, sectionID, rowID)}
          </View>
        );
      }else{
        return (<View  key={"cell_list_"+rowID} />);
      }
    }
    // renderRow={ (rowData , sectionID, rowID)=>this.row_listview_1(rowData , sectionID, rowID) }
    getItens(){
      var tags = [];
      // if(this.props.renderSeparator && this.state.lista.length>0){
      //   tags.push(  this.props.renderSeparator(1, 10000) );
      // }
      // console.log(this.state);
      if(this.state.lista){
        for (var i = 0; i < this.state.lista.length; i++) {
          let item=  this.state.lista[i] ;
          tags.push(  this.renderRow(item,1,i) );

        }
      }

      return tags;
    }
    render() {

      var style = {
        alignItems:"flex-start",
        justifyContent:"flex-start",
        flexWrap: "wrap",
        flexDirection: "row"
      };
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
            // style.flex= "0 1 0%";

      return (
        <View  style={style}>
          {this.props.refreshControl?this.props.refreshControl:""}
          {this.props.renderHeader ? this.props.renderHeader():""}
          {this.getItens()}
          {this.props.renderFooter ? this.props.renderFooter():""}
        </View>
      );
    }

  }
