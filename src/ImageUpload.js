import React from "react";

import View from "./View";
import TouchableOpacity from "./TouchableOpacity";
import Modal from "./Modal";
import Progress from "./Progress";
import Text from "./Text";
import ImageView from "./Image";
//

import Cropper from "react-cropper";
try {
  require("cropperjs/dist/cropper.min.css");
} catch (e) {}

var host = "";
var token_api = "";
export default class ImageUpload extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      item: props.item,
      tag: props.tag,
      source: props.source
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.source = nextProps.source;
      nextState.item = nextProps.item;
      nextState.tag = nextProps.tag;
    }
    return true;
  }

  salvar() {
    var img = this.refs.cropper
      .getCroppedCanvas()
      .toDataURL(this.state.type != "png" ? "image/jpeg" : "image/png");
    // console.log(img)
    this.upFile({ data: img, name: this.state.name, type: this.state.type });
  }

  upFile(data) {
    this.setState({ open: false, save: true });
    data.maxHeight = this.props.maxHeight ? this.props.maxHeight : false;
    data.maxWidth = this.props.maxWidth ? this.props.maxWidth : false;
    var url = host + "/recortImage";
    // console.log(data);

    var config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      contentType: false,
      processData: false,
      // body: data

      body: JSON.stringify(data)
    };
    // console.log(config);
    if (token_api) {
      config.headers["x-request-id"] = token_api;
    }
    fetch(url, config)
      .then(response => {
        try {
          return response.json();
        } catch (e) {
          console.log(e);
          return {};
        }
      })
      .then(data => {
        if (this.props.onChangeText) {
          this.props.onChangeText(data.url_img, data.name);
        }
        if (this.props.onChange) {
          this.props.onChange(data.url_img, data.name);
        }
        this.setState({
          value: data.url_img,
          save: false,
          open: false,
          source: { uri: data.url_img }
        });
        // retorno(data);
      })
      .catch(error => {
        console.log("Erro:", error);
        this.setState({ value: "Erro..", save: false, open: false });
      });
  }
  deletar() {
    if (this.props.onChange) {
      this.props.onChange("");
    }
    if (this.props.onChangeText) {
      this.props.onChangeText("");
    }
    if (this.props.onDelete) {
      this.props.onDelete(this);
    }
  }

  cleanString(s) {
    if (!s) {
      return "";
    }
    var r = s; //.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "");
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/æ/g), "ae");
    r = r.replace(new RegExp(/ç/g), "c");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/œ/g), "oe");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    r = r.replace(new RegExp(/[ýÿ]/g), "y");
    r = r.replace(new RegExp(/\W/g), "");
    return r;
  }

  directUpload(file) {
    this.setState({ open: false, save: true });

    var url = host + "/image";
    console.log(url);

    var data = new FormData();
    data.append("file", file);
    data.append("user", "hubot");

    var config = {
      headers: {},
      method: "POST",
      contentType: false,
      processData: false,
      body: data
    };
    // console.log(config);
    if (token_api) {
      config.headers["x-request-id"] = token_api;
    }
    fetch(url, config)
      .then(response => {
        try {
          return response.json();
        } catch (e) {
          console.log(e);
          return {};
        }
      })
      .then(data => {
        console.log(data);
        if (this.props.onChangeText) {
          this.props.onChangeText(data.url, file.name);
        }
        if (this.props.onChange) {
          this.props.onChange(data.url, file.name);
        }
        this.setState({
          value: data.url,
          save: false,
          open: false,
          source: { uri: data.url }
        });
        // retorno(data);
      })
      .catch(error => {
        console.log("Erro:", error);
        this.setState({ value: "Erro..", save: false, open: false });
      });
  }

  upLoadFile() {
    var file = document.createElement("INPUT");
    file.setAttribute("type", "file");
    file.style.visibility = "hidden";
    document.body.appendChild(file);
    file.click();
    file.addEventListener(
      "change",
      event => {
        var files = file.files;
        if (this.props.directUpload) {
          if (files && files[0]) {
            this.directUpload(files[0]);
          }
        } else {
          var type = files[0].type == "image/jpeg" ? "jpg" : "png";
          const reader = new FileReader();
          reader.onload = () => {
            this.setState({
              src: reader.result,
              cropper: true,
              type: type,
              open: false,
              name: this.cleanString(files[0].name) + "." + type
            });
          };
          reader.readAsDataURL(files[0]);
        }

        // console.log(files[0])
      },
      false
    );
  }

  render() {
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;
    var source = this.state.source;
    if (!source && (this.state.item && this.state.tag)) {
      source = { uri: this.state.item[this.state.tag] };
    }
    if (!source && this.props.value) {
      source = { uri: this.props.value };
    }
    // console.log(this.state);

    // return (
    //   <View></View>
    // )
    return (
      <ImageView
        style={[
          { justifyContent: "center", alignItems: "center" },
          this.props.style,
          { cursor: "pointer" }
        ]}
        onClick={() => {
          this.setState({ open: true });
        }}
        source={source}
        resizeMode={this.props.resizeMode}
      >
        {this.state.save ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%"
            }}
          >
            <Progress />
          </View>
        ) : this.props.chidren ? (
          this.props.chidren
        ) : (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              // flex:1,
              alignSelf: "stretch"
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                padding: 5,
                borderRadius: 5,
                flexDirection: "column",
                width: "auto"
              }}
            >
              {this.props.label ? (
                <Text
                  style={{
                    shadowColor: "#000000",
                    shadowOpacity: 0.99,
                    shadowRadius: 5,
                    alignSelf: "stretch",
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: "500",
                    shadowOffset: {
                      height: 1,
                      width: 1
                    },
                    color: "#000000",
                    backgroundColor: "rgba(0,0,0,0)"
                  }}
                >
                  {this.props.label}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: 5,
                borderRadius: 5,
                flexDirection: "column",
                width: "auto"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignSelf: "stretch",
                  shadowColor: "#000000",
                  shadowOpacity: 0.99,
                  fontSize: 11,
                  shadowRadius: 5,
                  shadowOffset: {
                    height: 1,
                    width: 1
                  },
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0)"
                }}
              >
                Inserir / Editar
              </Text>
            </View>
          </View>
        )}

        <Modal
          style={{
            padding: 20,
            maxHeight: height - 100,
            maxWidth: width - 100
          }}
          title={
            "Editar Imagem " +
            (this.props.nome ? this.props.nome : "") +
            (this.props.label ? " - " + this.props.label : "")
          }
          actions={[
            <div
              key="ok_m1"
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
          <View style={{ padding: 20, flexDirection: "column" }}>
            <span
              style={{ color: "#ccc", fontSize: 12, fontFamily: "sans-serif" }}
            >
              {"Escolha uma imagem .png ou .jpg para Upload"}
            </span>
            <span style={{ color: "#ccc", fontSize: 12 }}>
              {source && source.uri ? source.uri : "..."}
            </span>
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                style={{
                  marginRight: 0,
                  marginTop: 30,
                  fontFamily: "sans-serif",
                  borderRadius: 5,
                  backgroundColor: "#eee",
                  padding: 5
                }}
                onClick={() => {
                  this.upLoadFile();
                }}
              >
                <div style={{ padding: 8, textAlign: "center", width: "100%" }}>
                  {"ESCOLHER ARQUIVO"}
                </div>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 30,
                  borderRadius: 5,
                  fontFamily: "sans-serif",
                  opacity: source && source.uri ? 1 : 0.5,
                  backgroundColor: "#eee",
                  padding: 5
                }}
                onClick={() => {
                  this.deletar();
                }}
              >
                <div style={{ padding: 8, textAlign: "center", width: "100%" }}>
                  {"DELETAR"}
                </div>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          style={{
            padding: 20,
            minWidth: 500,
            maxHeight: height - 100,
            maxWidth: width - 100
          }}
          title={
            "Editar Imagem " +
            (this.props.nome ? this.props.nome : "") +
            (this.props.label ? " - " + this.props.label : "")
          }
          actions={[
            <TouchableOpacity
              style={{
                flex: "none",
                width: 250,
                marginLeft: 10,
                alignSelf: "auto",
                fontFamily: "sans-serif",
                borderRadius: 5,
                backgroundColor: "#eee",
                padding: 5
              }}
              onClick={e => {
                if (!this.refs.cropper) {
                  return;
                }
                this.salvar();
                this.setState({ cropper: false });
              }}
            >
              <div style={{ padding: 8, textAlign: "center", width: "100%" }}>
                {"RECORTAR"}
              </div>
            </TouchableOpacity>,

            <TouchableOpacity
              style={{
                flex: "none",
                width: 250,
                marginLeft: 10,
                alignSelf: "auto",
                fontFamily: "sans-serif",
                borderRadius: 5,
                backgroundColor: "#eee",
                padding: 5
              }}
              onClick={e => {
                this.setState({ cropper: false });
              }}
            >
              <div style={{ padding: 8, textAlign: "center", width: "100%" }}>
                {"CANCELAR"}
              </div>
            </TouchableOpacity>
          ]}
          onRequestClose={() => {
            this.setState({ cropper: false });
          }}
          visible={this.state.cropper}
        >
          <Cropper
            ref="cropper"
            src={this.state.src}
            style={{
              height: height - 300,
              width: "100%",
              minWidth: width - 200
            }}
            // Cropper.js options
            aspectRatio={
              this.props.aspectRatio ? this.props.aspectRatio : 16 / 9
            }
            guides={false}
            viewMode={
              this.props.viewMode || this.props.viewMode == 0
                ? this.props.viewMode
                : 2
            }
            minCropBoxWidth={this.props.minCropBoxWidth}
            minCropBoxHeight={this.props.minCropBoxHeight}
            crop={(e, a) => {
              //console.log(e, a);
            }}
          />
        </Modal>
      </ImageView>
    );
  }
}

ImageUpload.setHost = function(url) {
  host = url;
};

ImageUpload.setToken = function(token) {
  token_api = token;
};
