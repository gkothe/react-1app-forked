'use strict';
import React  from 'react';

var  StyleSheet = {create:(style)=>{return style;}};

import View from "./View";
import TouchableOpacity from "./TouchableOpacity";
import Icon from "./Icon";
import Text from "./Text";



//nao atualizar
export default class TabViewEdi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pos:0   };
    //{onConstructor}
  }

  componentDidMount() {

    //{onDidMount}
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {


      //{onUpdate}
    }
    return true;
  }
  // componentWillUnmount(){
  // }

  getIcons(){
    var labels =   this.props.children.map((child) =>child && child.props.tabLabel?child.props.tabLabel:"");
    var icons =   this.props.children.map((child) => child &&  child.props.tabIcon?child.props.tabIcon:"");
    var badges =   this.props.children.map((child) => child && child.props.badge?child.props.badge:0);
    var bts = [];
    for (var i = 0; i < labels.length; i++) {

      let label =   labels[i];
      let icon =   icons[i];
      let badge =   badges[i];
      if (!label && !icon) {
        continue
      }
      let pos = i;
      bts.push(
        <TouchableOpacity key={"tag_"+pos} onPress={()=>{
            this.setState({pos:pos})
          }} style={ styles.bottom }>
          {this.props.tabBarPosition=="overlayTop" && pos==this.state.pos?(
            <div style={ {
                position:"absolute",backgroundColor:this.props.tabBarActiveTextColor?this.props.tabBarActiveTextColor:"#fff",
                height:3,width:"100%",bottom:0
              } }/>
            ):null}

            { badge?(
              <View style={ styles.view2 }>
                <View style={[ styles.view3 ,{backgroundColor:this.props.tabBarActiveTextColor?this.props.tabBarActiveTextColor:"#000"}]}>
                  <Text style={ styles.label1 } text={ badge+"" } />
                </View>
              </View>
            ):null}
            {icon && this.state.pos != pos ?(
              <Icon style={[ styles.icon ,{color:this.props.tabBarInactiveTextColor?this.props.tabBarInactiveTextColor:"#fff"}] }
                fromFontFamily={ "Material Design Icons" } icon={ icon } />
            ):null}
            {icon && this.state.pos == pos ?(
              <Icon style={[ styles.icon ,{color:this.props.tabBarActiveTextColor?this.props.tabBarActiveTextColor:"#fff"}] }
                fromFontFamily={ "Material Design Icons" } icon={ icon } />
            ):null}
            {label && this.state.pos == pos?(
              <Text style={[ styles.label,{color:this.props.tabBarActiveTextColor?this.props.tabBarActiveTextColor:"#fff","fontWeight": "700"}] } text={label } />
            ):null}
            {label && this.state.pos != pos?(
              <Text style={[ styles.label,{color:this.props.tabBarInactiveTextColor?this.props.tabBarInactiveTextColor:"#fff"}] } text={ label } />
            ):null}

            {this.props.tabBarPosition!="overlayTop" && pos==this.state.pos?(
              <div style={ {
                  position:"absolute",backgroundColor:this.props.tabBarActiveTextColor?this.props.tabBarActiveTextColor:"#fff",
                  height:3,width:"100%",top:0
                } }/>
              ):null}
            </TouchableOpacity>
          );
        }
        return bts;
      }
      getPage(){
        if(this.props.children && this.props.children[this.state.pos]){
          return this.props.children[this.state.pos];
        }else{
          return <div/>;
        }
      }
      render() {
        return (

          <View style={ styles.tela }>
            {this.props.tabBarPosition=="overlayTop"?(
              <View style={[ styles.view1,{backgroundColor:this.props.tabBarBackgroundColor?this.props.tabBarBackgroundColor:"#000"}] }>
                {this.getIcons()}
              </View>
            ):null}
            <View style={ styles.view }>
              {this.getPage()}
            </View>
            {this.props.tabBarPosition!="overlayTop"?(
              <View style={[ styles.view1,{backgroundColor:this.props.tabBarBackgroundColor?this.props.tabBarBackgroundColor:"#000"}] }>
                {this.getIcons()}
              </View>
            ):null}
          </View>
        );
      }

    }



    var styles = StyleSheet.create(
      {
        "tela": {
          "flex": 1,
          "alignSelf": "stretch",
          "backgroundColor": "rgba(255,255,255,1)",
          "flexDirection": "column",
          "alignItems": "flex-start",
          "justifyContent": "flex-start",
          "flexWrap": "nowrap"
        },
        "view": {
          "alignSelf": "stretch",
          "flex": 1,
          "flexDirection": "column",
          "alignItems": "flex-start",
          "justifyContent": "flex-start",
          "flexWrap": "nowrap",
          "position": "relative"
        },
        "view4": {
          "alignSelf": "stretch",
          "flex": 1,
          "flexDirection": "column",
          "alignItems": "flex-start",
          "justifyContent": "flex-start",
          "flexWrap": "nowrap",
          "position": "relative"
        },
        "view1": {
          "alignSelf": "stretch",
          "flexDirection": "row",
          "alignItems": "center",
          "justifyContent": "center",
          "flexWrap": "nowrap",
          "position": "relative"
        },
        "bottom": {
          "alignSelf": "stretch",
          flex:1,
          minHeight:40,
          "justifyContent": "center",
          "alignItems": "center",
          "flexDirection": "column",
          "flexWrap": "nowrap",
          "position": "relative",
          "padding": 2
        },
        "view2": {
          display:"flex",
          "alignSelf": "stretch",
          "flex": 1,
          "flexDirection": "row",
          "alignItems": "center",
          "justifyContent": "center",
          "flexWrap": "nowrap",
          "position": "absolute",
          "padding": 3,
          "top": 0,
          "left": 0,
          "right": 0
        },
        "view3": {
          "alignSelf": "auto",
          "flexDirection": "column",
          "alignItems": "center",
          "justifyContent": "center",
          "flexWrap": "nowrap",
          "position": "relative",
          "borderRadius": 10,
          "backgroundColor": "rgba(81,82,83,1)",
          "minWidth": 22,
          "minHeight": 20,
          "marginLeft": 38
        },
        "label1": {
          "textAlign": "center",
          "flexWrap": "wrap",
          "color": "rgba(255,255,255,1)",
          "alignSelf": "stretch",
          "fontWeight": "700"
        },
        "icon": {
          "color": "rgba(81,82,83,1)",
          marginBottom:-5,
          marginTop:-5,
          "fontSize": 25
        },
        "label": {
          marginBottom:5,
          "textAlign": "center",
          marginTop:0,
          "flexWrap": "wrap",
          "color": "rgba(0,0,0,1)",
          "alignSelf": "stretch",
          "fontSize": 11
        }
      }
    );
