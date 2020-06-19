"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Image = require("./Image");

var _Image2 = _interopRequireDefault(_Image);

var _Progress = require("./Progress");

var _Progress2 = _interopRequireDefault(_Progress);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _DialogOptions = require("./DialogOptions");

var _DialogAlert = require("./DialogAlert");

var _reactCropper = require("react-cropper");

var _reactCropper2 = _interopRequireDefault(_reactCropper);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

try {
  require("cropperjs/dist/cropper.min.css");
} catch (e) {}


var host = "";
var token_api = "";

var ImageUpload = function (_React$Component) {
  _inherits(ImageUpload, _React$Component);

  function ImageUpload(props, context) {
    _classCallCheck(this, ImageUpload);

    var _this = _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props, context));

    _this.state = {
      open: false,
      tag: props.tag
    };
    return _this;
  }

  _createClass(ImageUpload, [{
    key: "editar",
    value: function editar() {
      var _this2 = this;

      var action = this.props.value ? [{
        label: "VER ARQUIVO",
        onPress: function onPress() {
          window.open(_this2.props.value, "_blankFromWebApp");
        },
        icon: "insert_drive_file"
      }] : [];
      (0, _DialogOptions.OpenDialogOption)({
        title: "Editar Imagem " + (this.props.nome ? this.props.nome : "") + (this.props.label ? " - " + this.props.label : ""),
        description: "Escolha uma imagem .png ou .jpg para Upload",
        action: [{
          label: "ESCOLHER ARQUIVO",
          onPress: function onPress() {
            _this2.upLoadFile();
          },
          icon: "add_photo_alternate"
        }].concat(action, [{
          label: "DELETAR",
          onPress: function onPress() {
            _this2.deletar();
          },
          icon: "delete",
          separa: true
        }, { label: "Cancelar", icon: "cancel", separa: true }])
      });
    }
  }, {
    key: "OpenCropper",
    value: function OpenCropper(src, type, name) {
      var _this3 = this;

      var height = document.body.clientHeight;
      var width = document.body.clientWidth;
      var Component = function Component() {
        return _react2.default.createElement(_reactCropper2.default, _extends({
          minCropBoxWidth: 250
        }, _this3.props.propsCropper, {
          ref: function ref(r) {
            return _this3.cropper = r;
          },
          src: src,
          style: styles.cropperjs,
          aspectRatio: _this3.props.aspectRatio ? _this3.props.aspectRatio : 16 / 9,
          guides: false,
          viewMode: _this3.props.viewMode || _this3.props.viewMode == 0 ? _this3.props.viewMode : 2,
          minCropBoxWidth: _this3.props.minCropBoxWidth,
          minCropBoxHeight: _this3.props.minCropBoxHeight,
          crop: function crop(e, a) {
            //console.log(e, a);
          }
        }));
      };
      (0, _DialogAlert.OpenDialog)({
        title: "Editar Imagem " + (this.props.nome ? this.props.nome : "") + (this.props.label ? " - " + this.props.label : ""),
        Component: Component,
        action: [{
          label: "RECORTAR",
          onClick: function onClick() {
            _this3.salvar(type, name);
          }
        }, { label: "Cancelar" }]
      });
    }
  }, {
    key: "salvar",
    value: function salvar(type, name) {
      var img = this.cropper.getCroppedCanvas().toDataURL(type != "png" ? "image/jpeg" : "image/png");
      this.upFile({ data: img, type: type, name: name });
    }
  }, {
    key: "upLoadFile",
    value: function upLoadFile() {
      var _this4 = this;

      var file = document.createElement("INPUT");
      file.setAttribute("type", "file");
      file.style.visibility = "hidden";
      file.style.display = "none";
      document.body.appendChild(file);
      file.click();
      file.addEventListener("change", function (event) {
        var files = file.files;
        if (files && files[0]) {
          if (_this4.props.directUpload) {
            _this4.directUpload(files[0]);
          } else {
            try {
              var type = files[0].type == "image/jpeg" ? "jpg" : "png";
              var reader = new FileReader();
              reader.onload = function () {
                _this4.OpenCropper(reader.result, type, _this4.cleanString(files[0].name) + "." + type);
              };
              reader.readAsDataURL(files[0]);
            } catch (e) {
              console.log(e);
              _this4.directUpload(files[0]);
            }
          }
        } else {
          console.error("Image Upload:Nao tem arquivo");
        }
      }, false);
    }
  }, {
    key: "upFile",
    value: function upFile(data) {
      var _this5 = this;

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

      Util.onFetch(url, config, function (data, error) {
        _this5.setState({ save: false });
        if (error) return alert(error.msg);
        _this5.onChange(data.url_img, data.name);
      });
    }
  }, {
    key: "directUpload",
    value: function directUpload(file) {
      var _this6 = this;

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

      Util.onFetch(url, config, function (data, error) {
        _this6.setState({ save: false });
        if (error) return alert(error.msg);
        _this6.onChange(data.url, data.name);
      });
    }
  }, {
    key: "cleanString",
    value: function cleanString(s) {
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
  }, {
    key: "onChange",
    value: function onChange(url_img, name) {
      if (this.props.onChangeText) {
        this.props.onChangeText(url_img, name);
      }
      if (this.props.onChange) {
        this.props.onChange(url_img, name);
      }
    }
  }, {
    key: "deletar",
    value: function deletar() {
      this.onChange("");
      if (this.props.onDelete) {
        this.props.onDelete(this);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _props = this.props,
          value = _props.value,
          disabled = _props.disabled;


      return _react2.default.createElement(
        _Image2.default,
        {
          style: [{ justifyContent: "center", alignItems: "center" }, this.props.style, { cursor: "pointer" }],
          onClick: function onClick() {
            if (!disabled) _this7.editar();
          },
          source: { uri: value },
          resizeMode: this.props.resizeMode
        },
        this.state.save ? _react2.default.createElement(
          _View2.default,
          { style: styles.viewProgresso },
          _react2.default.createElement(_Progress2.default, null)
        ) : this.props.chidren ? this.props.chidren : _react2.default.createElement(
          _View2.default,
          { style: styles.viewBody },
          _react2.default.createElement(
            _View2.default,
            { style: styles.viewText },
            this.props.label ? _react2.default.createElement(
              _Text2.default,
              { style: styles.textLabel },
              this.props.label
            ) : null
          ),
          !disabled ? _react2.default.createElement(
            _View2.default,
            { style: styles.view },
            _react2.default.createElement(
              _Text2.default,
              { style: [styles.textLabel, { color: "#fff" }] },
              "Inserir / Editar"
            )
          ) : null
        )
      );
    }
  }]);

  return ImageUpload;
}(_react2.default.Component);

exports.default = ImageUpload;


ImageUpload.setHost = function (url) {
  host = url;
};

ImageUpload.setToken = function (token) {
  token_api = token;
};

var styles = {
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