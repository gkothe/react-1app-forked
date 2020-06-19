import React from 'react';
import * as Util from "./Util"

import Progress from "./Progress"
import Text from "./Text"
import View from "./View"
import StyleSheet from "./StyleSheet";
import TouchableOpacity from "./TouchableOpacity"
import {OpenDialogOption} from "./DialogOptions"
import Icon from "./Icon"

var host = "";
var token=''
export default  class FileView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state =  { open:false ,value:props.value , label:props.label};
  }


  upFile (file) {
    this.setState({open : false,save:true})

    var url = host+"/file";
    console.log(url);

    var data = new FormData()
    data.append('file', file)
    data.append('user', 'hubot');

    var config = {
      method: 'POST',
      contentType: false,
      processData: false,
      body: data,
      headers:{
        "x-request-id": token,
      }
    };
    // console.log(config);

    Util.onFetch(url, config,(data,error)=> {
      console.log(data,error);
      if(this.props.onChangeText&&data){
        this.props.onChangeText(data.url,file.name);
      }
      if(this.props.onChange&&data){
        this.props.onChange(data.url,file.name);
      }
      this.setState({save:false,open:false});
    })
  }

  deletar(){
    this.setState({open:false});
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
    file.style.display = "none";
    document.body.appendChild(file);
    file.click();
    file.addEventListener("change",  (event)=> {

      var files = file.files;
      if(files && files[0]){
        this.upFile(files[0]);
      }
    }, false);
  }

  editar(){
    let action=this.props.value ?[{label:"VER ARQUIVO",onPress:()=>{window.open(this.props.value, "_blankFromWebApp")},icon:"insert_drive_file"}]:[];
    OpenDialogOption({
      title:"Editar arquivo " +(this.props.nome ? this.props.nome : "") +(this.props.label ? " - " + this.props.label : ""),
      description:"Escolha uma arquivo para Upload",
      texto:(this.props.value ? this.props.value : "..."),
      action:[
        {label:"ESCOLHER ARQUIVO",onPress:()=>{this.upLoadFile()},icon:"attach_file"},
        ...action,
        {label:"DELETAR",onPress:()=>{this.deletar()},icon:"delete",separa:true},
        {label:"Cancelar",icon:"cancel",separa:true},
      ]
    })
  }

  render() {
    var style=StyleSheet.flatten([
      {
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
        backgroundColor:"#fff",
        "borderWidth": 1,
        "borderColor": "#f2f2f2",
        "borderStyle": "solid",
      },
      this.props.style
    ])

    var children = this.props.children;
    if(!children){
      children = (
        <View  style={{justifyContent:"flex-start",alignItems:"center",flex:1}} row>
          <Icon icon={"cloud_circle"} />
          <Text style={{fontSize:11,flex:"1 1 auto",marginLeft:5}}>{this.props.value? (this.props.value||'').substring(0,45)   : "click para adicionar..."}</Text>
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
          <Text style={[{fontSize:11,padding:5,margin:0,color:"#999"}]} >
            {this.props.label}
          </Text>
        ):("")}

        <View auto style={style} onClick={()=>{
            this.editar();
          }}   style={style}>

          { this.state.save ? (
            <Progress size={0.5} />
          ): children  }
        </View>
      </View>
    );
    return <div/>
  }
}

FileView.setHost = function(url){
  host = url;
}

FileView.setToken = function(t){
  token = t;
}
