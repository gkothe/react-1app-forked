import React from "react";
import ApiUteis from "../api/uteis.js";
// import View from 'react-flexbox';
import View from "./View";
import Icon from "./Icon";
import Image from "./Image";
import ImageUpload from "./ImageUpload";
import Modal from "./Modal";
import Alert from "./Alert";
import TextInput from "./TextInput";
import TouchableOpacity from "./TouchableOpacity";
var host = "";

export default class FotosUpload extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lista: props.value ? props.value : [],
      label: props.label,
      item: props.value ? props.value[0] : null,
      pos: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.lista = nextProps.value ? nextProps.value : [];
      nextState.label = nextProps.label;
      nextState.item = nextState.lista[0];
    }
    return true;
  }

  novo() {
    this.state.item = {};
    this.state.lista.push(this.state.item);
    this.setState({ item: this.state.item, pos: this.state.lista.length - 1 });
  }
  delet() {
    this.state.lista.splice(this.state.pos, 1);
    this.setState({ item: this.state.item, pos: this.state.lista.length - 1 });
  }

  render() {
    var style = {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: 5,

      minWidth: 5,
      display: "flex",
      alignSelf: "stretch",

      flex: "0 1 auto",
      height: 400
    };

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
    if (!this.state.item) {
      this.state.item = {};
      this.state.lista.push(this.state.item);
    }
    var styleMarcador = {
      width: "30",
      height: 30,
      margin: 2,
      padding: 3,
      borderRadius: 5,
      border: "1px solid #ccc",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 14
    };

    // return (
    //   <View></View>
    // )
    var numero = this.state.pos + 1;
    // console.log(this.state);
    return (
      <div style={style}>
        <ImageUpload
          label={this.state.label}
          minCropBoxWidth={this.props.minCropBoxWidth}
           viewMode={this.props.viewMode}
          minCropBoxHeight={this.props.minCropBoxHeight}
          style={{
            alignSelf: "stretch",
            backgroundColor: "rgba(244,244,244,1)",
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: 5
          }}
          onChangeText={text => {
            this.state.item.url_img = text;
            if (this.props.onChangeText) {
              this.props.onChangeText(this.state.lista, this.state.pos, text);
            }
            if (this.props.onChange) {
              this.props.onChange(this.state.lista, this.state.pos, text);
            }
          }}
          resizeMode={Image.resizeMode.cover}
          maxHeight={this.props.maxHeight ? this.props.maxHeight : false}
          maxWidth={this.props.maxWidth ? this.props.maxWidth : false}
          source={{ uri: this.state.item.url_img }}
        >
          <Modal
            style={{ padding: 20, minHeight: 400, width: 500 }}
            title={"Informações da foto numero " + numero}
            actions={[
              <div
                onClick={e => {
                  e.stopPropagation();
                  this.setState({ open: false });
                }}
                className=" modal-action  waves-effect waves-green btn-flat"
                style={{ fontFamily: "sans-serif" }}
              >
                {"OK"}
              </div>
            ]}
            onRequestClose={() => {
              this.setState({ open: false });
            }}
            visible={this.state.open}
          >
            <View style={{ padding: 20, flexDirection: "column" }} column>
              <TextInput
                style={{
                  minHeight: 35,
                  color: "rgba(0,0,0,1)",
                  alignSelf: "stretch",
                  flexWrap: "nowrap",
                  backgroundColor: "rgba(255,255,255,1)",
                  margin: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  textAlign: "left"
                }}
                value={this.state.item.nome}
                onChange={value => {
                  this.state.item.nome = value;
                }}
                ref={v => (this.unidade = v)}
                keyboardType={"default"}
                secureTextEntry={false}
                multiline={false}
                label={"Nome"}
              />
              <TextInput
                style={{
                  minHeight: 35,
                  color: "rgba(0,0,0,1)",
                  alignSelf: "stretch",
                  flexWrap: "nowrap",
                  backgroundColor: "rgba(255,255,255,1)",
                  margin: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  textAlign: "left"
                }}
                value={this.state.item.descricao}
                onChange={value => {
                  this.state.item.descricao = value;
                }}
                ref={v => (this.descricao = v)}
                keyboardType={"default"}
                secureTextEntry={false}
                multiline={true}
                label={"Descrição"}
              />
            </View>
          </Modal>
        </ImageUpload>

        <View
          style={{
            flexWrap: "wrap",
            marginTop: 5,
            border: "1px solid #ccc",
            borderRadius: 5
          }}
          row
        >
          {this.state.lista.map((object, pos) => {
            return (
              <View
                key={pos + "k"}
                style={[
                  styleMarcador,
                  { backgroundColor: pos == this.state.pos ? "#ccc" : "#777" }
                ]}
                onClick={() => {
                  this.setState({ pos: pos, item: object });
                }}
              >
                {pos + 1}
              </View>
            );
          })}
          {!this.state.lista ||
          !this.props.limit ||
          parseInt(this.props.limit) > this.state.lista.length ? (
            <View
              style={[
                styleMarcador,
                {
                  border: "1px solid rgba(63,134,99,1)"
                }
              ]}
              onClick={() => {
                this.novo();
              }}
            >
              <Icon icon={"add"} style={{ color: "rgba(63,134,99,1)" }} />
            </View>
          ) : null}

          <View
            style={{
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              alignSelf: "stretch"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              width: 70
            }}
          >
            <TouchableOpacity
              style={[
                styleMarcador,
                {
                  backgroundColor: "rgba(14,147,215,1)"
                }
              ]}
              onPress={() => {
                this.setState({ open: true, numero: numero });
              }}
            >
              <Icon
                style={{
                  color: "rgba(255,255,250,1)",
                  fontSize: 25
                }}
                fromFontFamily={"Material Icons"}
                icon={"create"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styleMarcador,
                {
                  border: "1px solid rgba(193,92,94,1)"
                }
              ]}
              onPress={() => {
                Alert.alert(
                  "Apagar",
                  "Voce realmente deseja apagar este o item " + numero + "?",
                  [
                    { text: "Ok", onPress: () => this.delet() },
                    { text: "Cancelar", onPress: () => console.log() }
                  ]
                );
              }}
            >
              <Icon
                style={{
                  color: "rgba(193,92,94,1)",
                  fontSize: 25
                }}
                fromFontFamily={"Material Icons"}
                icon={"remove"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </div>
    );
  }
}
