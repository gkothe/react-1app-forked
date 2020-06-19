import React from 'react';
import ApiUteis from '../api/uteis.js';
import $ from "jquery";

import View from './View';
import Icon from './Icon';
import TouchableOpacity from './TouchableOpacity';
import Modal from './Modal'
import CircularProgress from "./Progresso";

import Text from './Text';
var host = "";

export default  class File extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state =  { open:false ,value:props.value , label:props.label};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
      nextState.value =  nextProps.value;
      nextState.label =  nextProps.label;
      nextState.save = false;
    }
    return true;
  }

  upFile (file) {
    this.setState({open : false,save:true})

    var url = host+"file";
    console.log(url);

    var data = new FormData()
    data.append('file', file)
    data.append('user', 'hubot');

    var config = {
      method: 'POST',
      contentType: false,
      processData: false,
      body: data
    };
    // console.log(config);

    fetch(url, config).then((response)=> {
      try {
        return response.json()
      } catch (e) {
        console.log(e);
        return {};
      }
    }).then((data)=> {
      // console.log(data);
      if(this.props.onChangeText){
        this.props.onChangeText(data.url,file.name);
      }
      if(this.props.onChange){
        this.props.onChange(data.url,file.name);
      }
      this.setState({value : data.url,save:false,open:false});
      // retorno(data);
    }).catch((error)=> {
      console.log('Erro:', error)
      this.setState({value :"Erro..",save:false,open:false});
    })
  }

  deletar(){
    this.setState({value:"",open:false});
    if(this.props.onDelete){
      this.props.onDelete(this);
    }
    if(this.props.onChangeText){
      this.props.onChangeText("","");
    }
  }

  upLoadFile(){
    var file = document.createElement("INPUT");
    file.setAttribute("type", "file");
    file.style.visibility = "hidden";
    document.body.appendChild(file);
    file.click();
    file.addEventListener("change",  (event)=> {

      var files = file.files;
      if(files && files[0]){
        this.upFile(files[0]);
      }
    }, false);
  }

  render() {
    // console.log(this.state);

    var style={};
    if(this.props.style){
      style = this.props.style;
    }

    var style = {
      display:"flex",
      boxSizing: "border-box",
      width:"100%",
      flex: "0 1 auto",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      cursor:"pointer",
      minHeight:20,
      minWidth:20,
      borderRadius:5,
      padding:5,
      backgroundColor:this.state.save?"#fff":"#ccc",
      "borderWidth": 1,
      "borderColor": "#f2f2f2",
      "borderStyle": "solid",
    };
    // console.log(style);

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

    // return (
    //   <View></View>
    // )

    var children = this.props.children;
    if(!children){
      children = (
        <View  style={{justifyContent:"flex-start",alignItems:"center"}} row>
          <Icon icon={"cloud_circle"} />
          <Text style={{fontSize:11,flex:"1 1 auto",marginLeft:5}}>{this.state.value?  ApiUteis.recortaString(this.state.value, 45)   : "click para adicionar..."}</Text>
          <View auto style={{
              cursor:"pointer",
              width:35,height:35,borderRadius:5,backgroundColor:"#ccc",textAlign:"center",
              justifyContent:"center",alignItems:"center"
            }} onClick={(e)=>{
              e.stopPropagation();
              this.deletar();
            }}>
            <Icon icon={"delete"} />
          </View>
        </View>
      );
    }
    return (
      <View auto style={{alignSelf:"stretch",maxHeight:90,flexDirection:"column"}} column>
        {this.props.label ?(
          <Text style={[{fontSize:11,padding:5,margin:0, color:"#999"}]} >
            {this.props.label}
          </Text>
        ):("")}



        <View auto style={style} onClick={()=>{
            this.setState({open:true});
          }}   style={style}>

          { this.state.save ? (
            <CircularProgress size={0.5} />
          ): children  }
        </View>

        <Modal style={{width:350,padding:20}}

          title={"Editar Arquivo "+(this.props.label? " - "+this.props.label:"")}
          actions={[
            <TouchableOpacity
              label="OK"
              primary={true}
              onClick={()=>{
                this.setState({open:false});
              }}
              />]}
              onRequestClose={()=>{
                this.setState({open:false});
              }}
              open={this.state.open}
              >
              <View  style={{padding:20,flexDirection:"column"}} column>
                <View style={{flexDirection:"column"}}>
                  <div style={{maxWidth:250}}>
                    <span style={{color:"#777",fontSize:12,wordWrap: "break-word"}} >{ (this.state.value ? this.state.value:" ")}</span>
                  </div>

                  <TouchableOpacity label=  {"ESCOLHER ARQUIVO"}  secondary={true} style={{marginRight:0,marginTop:30}} onClick={()=>{
                      this.upLoadFile();
                    }}
                    />

                  <TouchableOpacity label="DELETAR" style={{marginTop:30}} disabled={this.state.value ? false:true}    onClick={()=>{
                      this.deletar();
                    }}
                    />

                </View>
              </View>

            </Modal>
          </View>

        );
      }

    }

    File.setHost = function(url){
      host = url;
    }
