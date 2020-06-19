import React from "react";

import List from '@material-ui/core/List';
import TablePagination from '@material-ui/core/TablePagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import * as Util from "./Util"
import View from "./View";

let conte=0;
class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.id_key=conte++;
  }
  render(){
    const
    {
      ListHeaderComponent,renderItem,data,
      count,rowsPerPage,tablePagination,page,
      handleChangePage,handleChangeRowsPerPage,
      load,
      renderHeader,
      renderRow,
      lista,
      dataSource,
      style,
      nativo,
      ItemSeparatorComponent,
      renderSeparator,
      separator,
      ListFooterComponent,
      renderFooter
    }=this.props;
    let list=data||lista||dataSource||[];
    const RenderList=nativo?View:List;

    return(
      <RenderList
        key={"list_key"+this.id_key}
        id={"list_id"+this.id_key}
        style={Util.styleMack([{flexDirection:"column",width: "100%",height:"100%",overflow: "hidden",display:"block"},style])}
        subheader={<Subheader key={"list_head_key"+this.id_key} Head={ListHeaderComponent&&ListHeaderComponent()||renderHeader&&renderHeader()||null}/>}>
        {nativo?(<Subheader key={"list_head_key"+this.id_key} Head={ListHeaderComponent&&ListHeaderComponent()||renderHeader&&renderHeader()||null}/>):null}
        {load&&<LinearProgress/>}
        {list.map((item,index)=>(
          <ItemList
            key={"Key_item"+index+"_"+this.id_key}
            id={"id_Key_item"+index+"_"+this.id_key}
            Item={(renderItem&&renderItem({item,index},index))||(renderRow&&renderRow(item,index,index))||null}
            Separator={ItemSeparatorComponent&&ItemSeparatorComponent({item,index},index)||renderSeparator&&renderSeparator(item,index)||separator&&(<Divider/>)||null}
            />
        ))}
        {ListFooterComponent&&ListFooterComponent()}
        {renderFooter&&renderFooter()}
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
            labelRowsPerPage={"Por página"}
            rowsPerPageOptions={[5, 10, 15, 20, 25, 50,100,200,300,400]}
            labelDisplayedRows={({ from, to, count }) => {
              return `${from} a ${to} de ${count}`
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        }
      </RenderList>
    )
  }
}
class Subheader extends React.Component {
  render(){
    const {Head}=this.props;
    return(Head);
  }
}

class ItemList extends React.Component {
  render(){
    const {Item,Separator}=this.props;
    return([
      Item,
      Separator
    ])
  }
}
export default ListView;
