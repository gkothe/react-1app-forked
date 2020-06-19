import React from "react";
import ImageView from "./Image";
import Progress from "./Progress";
import Text from "./Text";
import View from "./View";
import { OpenDialogOption } from "./DialogOptions";
import { OpenDialog } from "./DialogAlert";

import Cropper from "react-cropper";
try {
  require("cropperjs/dist/cropper.min.css");
} catch (e) {}
import * as Util from "./Util";

var host = "";
var token_api = "";
export default class ImageUpload extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      tag: props.tag
    };
  }
  editar() {
    let action = this.props.value
      ? [
          {
            label: "VER ARQUIVO",
            onPress: () => {
              window.open(this.props.value, "_blankFromWebApp");
            },
            icon: "insert_drive_file"
          }
        ]
      : [];
    OpenDialogOption({
      title:
        "Editar Imagem " +
        (this.props.nome ? this.props.nome : "") +
        (this.props.label ? " - " + this.props.label : ""),
      description: "Escolha uma imagem .png ou .jpg para Upload",
      action: [
        {
          label: "ESCOLHER ARQUIVO",
          onPress: () => {
            this.upLoadFile();
          },
          icon: "add_photo_alternate"
        },
        ...action,
        {
          label: "DELETAR",
          onPress: () => {
            this.deletar();
          },
          icon: "delete",
          separa: true
        },
        { label: "Cancelar", icon: "cancel", separa: true }
      ]
    });
  }

  OpenCropper(src, type, name) {
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;
    let Component = () => (
      <Cropper
        minCropBoxWidth={250}
        {...this.props.propsCropper}
        ref={r => (this.cropper = r)}
        src={src}
        style={styles.cropperjs}
        aspectRatio={this.props.aspectRatio ? this.props.aspectRatio : 16 / 9}
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
    );
    OpenDialog({
      title:
        "Editar Imagem " +
        (this.props.nome ? this.props.nome : "") +
        (this.props.label ? " - " + this.props.label : ""),
      Component,
      action: [
        {
          label: "RECORTAR",
          onClick: () => {
            this.salvar(type, name);
          }
        },
        { label: "Cancelar" }
      ]
    });
  }

  salvar(type, name) {
    var img = this.cropper
      .getCroppedCanvas()
      .toDataURL(type != "png" ? "image/jpeg" : "image/png");
    this.upFile({ data: img, type, name });
  }

  upLoadFile() {
    var file = document.createElement("INPUT");
    file.setAttribute("type", "file");
    file.style.visibility = "hidden";
    file.style.display = "none";
    document.body.appendChild(file);
    file.click();
    file.addEventListener(
      "change",
      event => {
        var files = file.files;
        if (files && files[0]) {
          if (this.props.directUpload) {
            this.directUpload(files[0]);
          } else {
            try {
              var type = files[0].type == "image/jpeg" ? "jpg" : "png";
              const reader = new FileReader();
              reader.onload = () => {
                this.OpenCropper(
                  reader.result,
                  type,
                  this.cleanString(files[0].name) + "." + type
                );
              };
              reader.readAsDataURL(files[0]);
            } catch (e) {
              console.log(e);
              this.directUpload(files[0]);
            }
          }
        }else {
          console.error("Image Upload:Nao tem arquivo");
        }
      },
      false
    );
  }

  upFile(data) {
    this.setState({ save: true });
    data.maxHeight = this.props.maxHeight ? this.props.maxHeight : false;
    data.maxWidth = this.props.maxWidth ? this.props.maxWidth : false;
    var url = host + "/recortImage";
    var config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-request-id": token_api
      },
      method: "POST",
      contentType: false,
      processData: false,
      body: JSON.stringify(data)
    };

    Util.onFetch(url, config, (data, error) => {
      this.setState({ save: false });
      if (error) return alert(error.msg);
      this.onChange(data.url_img, data.name);
    });
  }

  directUpload(file) {
    this.setState({ save: true });
    var url = host + "/image";
    var data = new FormData();
    data.append("file", file);
    data.append("user", "hubot");
    var config = {
      headers: {
        "x-request-id": token_api
      },
      method: "POST",
      contentType: false,
      processData: false,
      body: data
    };

    Util.onFetch(url, config, (data, error) => {
      this.setState({ save: false });
      if (error) return alert(error.msg);
      this.onChange(data.url, data.name);
    });
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

  onChange(url_img, name) {
    if (this.props.onChangeText) {
      this.props.onChangeText(url_img, name);
    }
    if (this.props.onChange) {
      this.props.onChange(url_img, name);
    }
  }

  deletar() {
    this.onChange("");
    if (this.props.onDelete) {
      this.props.onDelete(this);
    }
  }

  render() {
    let { value, disabled } = this.props;

    return (
      <ImageView
        style={[
          { justifyContent: "center", alignItems: "center" },
          this.props.style,
          { cursor: "pointer" }
        ]}
        onClick={() => {
          if (!disabled) this.editar();
        }}
        source={{ uri: value }}
        resizeMode={this.props.resizeMode}
      >
        {this.state.save ? (
          <View style={styles.viewProgresso}>
            <Progress />
          </View>
        ) : this.props.chidren ? (
          this.props.chidren
        ) : (
          <View style={styles.viewBody}>
            <View style={styles.viewText}>
              {this.props.label ? (
                <Text style={styles.textLabel}>{this.props.label}</Text>
              ) : null}
            </View>
            {!disabled ? (
              <View style={styles.view}>
                <Text style={[styles.textLabel, { color: "#fff" }]}>
                  Inserir / Editar
                </Text>
              </View>
            ) : null}
          </View>
        )}
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

let styles = {
  viewProgresso: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  viewBody: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    alignSelf: "stretch"
  },
  viewText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    alignSelf: "stretch"
  },
  textLabel: {
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
    }
  },
  view: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
    borderRadius: 5,
    flexDirection: "column",
    width: "auto"
  },
  cropperjs: {
    width: "100%",
    maxHeight: 500,
    alignSelf: "stretch",
    flex: 1
  }
};
