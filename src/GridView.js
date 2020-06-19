import React from 'react';
import View from './View';
import * as Util from "./Util"


export default class GridView extends React.Component {
  render() {

    var style = Util.styleMack([{
      alignItems:"flex-start",
      justifyContent:"flex-start",
      flexWrap: "wrap",
      flexDirection: "row"
    },this.props.style]);

    return (
      <View  style={style}>
        {this.props.refreshControl?this.props.refreshControl:""}
        {this.props.renderHeader ? this.props.renderHeader():""}
        {this.props.dataSource&&this.props.dataSource.map((rowData,rowID)=>{
          var width = "100%";
          if(this.props.column){
            width = (100/this.props.column) +"%";
          }
          var padding = 0;
          if(this.props.paddingColumn){
            padding =this.props.paddingColumn;
          }
          if(this.props.renderRow){
            return (
              <View style={{width:width, maxWidth:width, padding:padding,   flex: "1 0 auto",flexDirection:"column"}}  key={"cell_list_"+rowID}>
                {this.props.renderRow(rowData, 1, rowID)}
              </View>
            );
          }else{
            return (<View  key={"cell_list_"+rowID} />);
          }
        })}
        {this.props.renderFooter ? this.props.renderFooter():""}
      </View>
    );
  }

}
