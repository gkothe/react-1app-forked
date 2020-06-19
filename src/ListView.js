import React from "react";
import ApiUteis from "../api/uteis.js";
import View from "./View";
import TouchableOpacity from "./TouchableOpacity";
import Icon from "./Icon";
var  StyleSheet = {create:(style)=>{return style;}};

var contador = 0;
var contadorCell = 0;
export default class ListView extends React.Component {
  constructor(props, context) {
    contador++;
    super(props, context);
    this.id = contador + "_listView";
    this.state = { lista: props.dataSource, id: this.id };
    if(props.ordem ||  props.order){
      this.state.ordem = this.getOrdem(this.state.lista);
    }
  }

  scrollContainerHeight() {
    var __containerElement = document.getElementById(this.id);
    if (__containerElement) {
      return Math.max(
        __containerElement.scrollHeight,
        __containerElement.offsetHeight,
        __containerElement.clientHeight
      );
    } else {
      var body = document.body;
      var html = document.documentElement;
      return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
    }
  }

  scrollToBottom() {
    $(this.id).scrollTop(this.scrollContainerHeight());
  }
  scrollToTop() {
    // $(window).animate({scrollTop: $(document).height() + $(window).height()});
    $(this.id).scrollTop(0);
  }
  scrollTo(y) {
    $(this.id).scrollTop(y);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.lista = nextProps.dataSource;
      if (nextProps.ordem) {
        nextState.ordem = this.getOrdem(nextProps.dataSource);
      }
      if (nextProps.order) {
        nextState.ordem = this.getOrdem(nextProps.dataSource);
      }
    }
    return true;
  }

  getOrdem(lista) {
    if (!lista) {
      return;
    }
    var ordem = [];
    for (var i = 0; i < lista.length; i++) {
      var item = lista[i];
      var id = item.objectId ? item.objectId : item._id;
      if (id) {
        ordem.push(id);
      }
    }
    return ordem;
  }
moveArry(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  moveUp(rowID, rowData) {
    if(!this.state.lista){
      return;
    }
    var pos = 0;
    for (var i = this.state.lista.length - 1; i >= 0; i--) {
      var foco = this.state.lista[i];
      var to = i + -1;
      if (foco == rowData &&  to >= 0) {
        this.moveArry(this.state.lista, i, to);
        var data =  this.getOrdem(this.state.lista);
        this.setState({ordem:data,forceUpdate:true})
        if(this.props.onChange){
          this.props.onChange(data);
        }
        break;
      }
    }

  }

  moveDown(rowID, rowData) {
    if(!this.state.lista){
      return;
    }
    var pos = 0;
    for (var i = 0; i < this.state.lista.length; i++) {
      var foco = this.state.lista[i];
      var to = i + 1;
      if (foco == rowData &&  this.state.lista.length-1 >= to) {
        this.moveArry(this.state.lista, i, to);
        var data =  this.getOrdem(this.state.lista);
        this.setState({ordem:data,forceUpdate:true})
        if(this.props.onChange){
          this.props.onChange(data);
        }
        break;
      }
    }
  }
  select(objectId) {
    this.setState({ select: objectId });
  }

  renderRow(rowData, sectionID, rowID) {
    contadorCell++;
    if (this.props.renderRow) {
      if (this.props.order || this.props.ordem) {
        return (
          <View
             key={"cell_list_" + rowID+"_"+contadorCell}
            style={{
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ alignSelf: "stretch", flex: 1 }}>
              {this.props.renderRow(rowData, sectionID, rowID)}
            </View>
            <View style={styles.view}>
              <TouchableOpacity
                style={styles.bottom}
                onPress={() => {
                  this.moveUp(rowID, rowData);
                }}
              >
                <View style={styles.view2}>
                  <Icon
                    style={styles.icon}
                    fromFontFamily={"Material Icons"}
                    icon={"keyboard_arrow_up"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottom}
                onPress={() => {
                  this.moveDown(rowID, rowData);
                }}
              >
                <View style={styles.view2}>
                  <Icon
                    style={styles.icon}
                    fromFontFamily={"Material Icons"}
                    icon={"keyboard_arrow_down"}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      return (
        <View 
         id={"cell_list_" + rowID+"_"+contadorCell}
         key={"cell_list_" + rowID+"_"+contadorCell}
       
          style={{
            width: this.props.horizontal ? "auto" : "100%",
            flex: "0 0 auto",
            cursor: "pointer",
            flexDirection: "column",
            backgroundColor:
              this.state.select &&
              this.state.select == rowData.objectId &&
              this.props.lastClick
                ? "rgba(0,0,0,0.2)"
                : "rgba(0,0,0,0)"
          }}
        >
          {this.props.renderRow(rowData, sectionID, rowID)}
        </View>
      );
    } else {
      return <View key={"cell_list_" + rowID} />;
    }
  }
  // renderRow={ (rowData , sectionID, rowID)=>this.row_listview_1(rowData , sectionID, rowID) }
  getItens() {
    if (!this.state.lista) {
      return null;
    }
    var tags = [];
    if (this.props.renderSeparator && this.state.lista.length > 0) {
      tags.push(this.props.renderSeparator(1, 10000));
    }
    for (var i = 0; i < this.state.lista.length; i++) {
      if (this.props.from && i < this.props.from - 1) {
        continue;
      }
      if (this.props.to && i > this.props.to - 1) {
        continue;
      }
      let item = this.state.lista[i];
      tags.push(this.renderRow(item, 1, i));
      if (this.props.renderSeparator) {
        tags.push(this.props.renderSeparator(1, i));
      } else if (this.props.colorSeparator) {
        tags.push(
          <View
            key={"separator_" + i}
            style={{
              borderBottom: "solid 1px " + this.props.colorSeparator,
              minHeight: 1,
              backgroundColor: this.props.colorSeparator,
              flex: 1,
              maxHeight: 1,
              alignSelf: "stretch"
            }}
          />
        );
      }
    }
    return tags;
  }
  render() {
    // console.log(this.state);
    // console.log(this.state.lista);
    var style = {
      fontFamily: "sans-serif",
      color: "#777",
      // overflowY: "auto",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: this.props.horizontal ? "row" : "column"
    };

    // if(this.props.style){
    //   var lista = Object.keys(this.props.style);
    //   for (var i = 0; i < lista.length; i++) {
    //     style[lista[i]] = this.props.style[lista[i]];
    //   }
    // }
    if (this.props.style) {
      var lista = [];
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
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
    // if(style.width)
    // <View auto column style={style}>
    // console.log(this.props.refreshControl);
    // console.log(this.state.id);
    if (this.state.lista && this.state.lista.length > 2) {
      style.display = "block";
      style.overflowY = "auto";
    }
    if (this.props.horizontal) {
      style.display = "flex";
    }
    return (
      <View id={this.id} style={style}>
        {this.props.renderHeader ? this.props.renderHeader() : ""}
        {this.props.refreshControl ? this.props.refreshControl : ""}
        {this.getItens()}
        {this.props.renderFooter ? this.props.renderFooter() : ""}
      </View>
    );
  }
}



const styles = StyleSheet.create({

  "view": {
    "alignSelf": "stretch",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "flexWrap": "nowrap",
    "position": "relative",
    "width": 55,
    "minWidth": 55,
    "minHeight": 70
  },
  "bottom": {
    "alignSelf": "stretch",
    "justifyContent": "center",
    "alignItems": "center",
    // backgroundColor:"#ccc",
    "flexDirection": "column",
    "flexWrap": "nowrap",
    "flex": 1
  },
  "view2": {
    "alignSelf": "auto",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "flexWrap": "nowrap",
    "position": "relative",
    "width": 30,
    "height": 30
  },
  "icon": {
    "fontSize": 25,
    "color": "#CCC"
  },
});

