import React from "react";
import View from "./View";
import {FixedSizeList as List} from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import TablePagination from '@material-ui/core/TablePagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import * as Util from "./Util";
let conte=0;

class FlatList extends React.Component {
  constructor(props) {
    super(props);
    this.id_key=conte++;
  }
  render(){
    const
    {
      itemSize=56,
      load,style,
      ListHeaderComponent,renderHeader,
      data,lista,dataSource,
      renderItem,renderRow,
      ItemSeparatorComponent,renderSeparator,separator,
      ListFooterComponent,renderFooter,
      tablePagination,count,page,rowsPerPage,handleChangePage,handleChangeRowsPerPage
    }=this.props;
    let list=data||lista||dataSource||[];
    const Row = ({ index, style }) => {
      let item=list[index];
      if(!item)return <div style={style}/>;
      return (
        <div style={style}>
          <ItemList
            key={"Key_item"+index+"_"+this.id_key}
            id={"id_Key_item"+index+"_"+this.id_key}
            Item={(renderItem&&renderItem({item,index},index))||(renderRow&&renderRow(item,index,index))||null}
            Separator={ItemSeparatorComponent&&ItemSeparatorComponent({item,index},index)||renderSeparator&&renderSeparator(item,index)||separator&&(<Divider/>)||null}
            />
        </div>
      )
    };
    return(
      <View
        key={"list_key"+this.id_key}
        id={"list_id"+this.id_key} 
        style={Util.styleMack([{overflow: "hidden",flexDirection:"column",width: "100%",height:"100%",display:"block"},style])}>
        {ListHeaderComponent&&ListHeaderComponent()||renderHeader&&renderHeader()||null}
        {load&&<LinearProgress/>}
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={list.length||0}
              itemSize={itemSize}
              width={width}
              >
              {Row}
            </List>
          )}
        </AutoSizer>
        {ListFooterComponent&&ListFooterComponent()||renderFooter&&renderFooter()}
        {tablePagination &&
          <TablePagination
            colSpan={6}
            style={{    display: "contents"}}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Página Anterior',
            }}
            nextIconButtonProps={{
              'aria-label': 'Próxima Página',
            }}
            labelRowsPerPage={"Resultados por página"}
            rowsPerPageOptions={[5, 10, 15, 20, 25, 50,100,200,300,400]}
            labelDisplayedRows={({ from, to, count }) => {
              return `Resultados ${from} a ${to} de ${count}`
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        }
      </View>
    )
  };
};

class ItemList extends React.Component {
  render(){
    const {Item,Separator}=this.props;
    return([
      Item,
      Separator
    ])
  }
}

export default FlatList;
