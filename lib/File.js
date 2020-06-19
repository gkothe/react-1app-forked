"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

var _Progress = require("./Progress");

var _Progress2 = _interopRequireDefault(_Progress);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _StyleSheet = require("./StyleSheet");

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _TouchableOpacity = require("./TouchableOpacity");

var _TouchableOpacity2 = _interopRequireDefault(_TouchableOpacity);

var _DialogOptions = require("./DialogOptions");

var _Icon = require("./Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var host = "";
var token = '';

var FileView = function (_React$Component) {
  _inherits(FileView, _React$Component);

  function FileView(props, context) {
    _classCallCheck(this, FileView);

    var _this = _possibleConstructorReturn(this, (FileView.__proto__ || Object.getPrototypeOf(FileView)).call(this, props, context));

    _this.state = { open: false, value: props.value, label: props.label };
    return _this;
  }

  _createClass(FileView, [{
    key: "upFile",
    value: function upFile(file) {
      var _this2 = this;

      this.setState({ open: false, save: true });

      var url = host + "/file";
      console.log(url);

      var data = new FormData();
      data.append('file', file);
      data.append('user', 'hubot');

      var config = {
        method: 'POST',
        contentType: false,
        processData: false,
        body: data,
        headers: {
          "x-request-id": token
        }
      };
      // console.log(config);

      Util.onFetch(url, config, function (data, error) {
        console.log(data, error);
        if (_this2.props.onChangeText && data) {
          _this2.props.onChangeText(data.url, file.name);
        }
        if (_this2.props.onChange && data) {
          _this2.props.onChange(data.url, file.name);
        }
        _this2.setState({ save: false, open: false });
      });
    }
  }, {
    key: "deletar",
    value: function deletar() {
      this.setState({ open: false });
      if (this.props.onDelete) {
        this.props.onDelete(this);
      }
      if (this.props.onChangeText) {
        this.props.onChangeText("", "");
      }
    }
  }, {
    key: "upLoadFile",
    value: function upLoadFile() {
      var _this3 = this;

      var file = document.createElement("INPUT");
      file.setAttribute("type", "file");
      file.style.visibility = "hidden";
      file.style.display = "none";
      document.body.appendChild(file);
      file.click();
      file.addEventListener("change", function (event) {

        var files = file.files;
        if (files && files[0]) {
          _this3.upFile(files[0]);
        }
      }, false);
    }
  }, {
    key: "editar",
    value: function editar() {
      var _this4 = this;

      var action = this.props.value ? [{ label: "VER ARQUIVO", onPress: function onPress() {
          window.open(_this4.props.value, "_blankFromWebApp");
        }, icon: "insert_drive_file" }] : [];
      (0, _DialogOptions.OpenDialogOption)({
        title: "Editar arquivo " + (this.props.nome ? this.props.nome : "") + (this.props.label ? " - " + this.props.label : ""),
        description: "Escolha uma arquivo para Upload",
        texto: this.props.value ? this.props.value : "...",
        action: [{ label: "ESCOLHER ARQUIVO", onPress: function onPress() {
            _this4.upLoadFile();
          }, icon: "attach_file" }].concat(action, [{ label: "DELETAR", onPress: function onPress() {
            _this4.deletar();
          }, icon: "delete", separa: true }, { label: "Cancelar", icon: "cancel", separa: true }])
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var style = _StyleSheet2.default.flatten([{
        display: "flex",
        boxSizing: "border-box",
        width: "100%",
        flex: "0 1 auto",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        cursor: "pointer",
        minHeight: 20,
        minWidth: 20,
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#fff",
        "borderWidth": 1,
        "borderColor": "#f2f2f2",
        "borderStyle": "solid"
      }, this.props.style]);

      var children = this.props.children;
      if (!children) {
        children = _react2.default.createElement(
          _View2.default,
          { style: { justifyContent: "flex-start", alignItems: "center", flex: 1 }, row: true },
          _react2.default.createElement(_Icon2.default, { icon: "cloud_circle" }),
          _react2.default.createElement(
            _Text2.default,
            { style: { fontSize: 11, flex: "1 1 auto", marginLeft: 5 } },
            this.props.value ? (this.props.value || '').substring(0, 45) : "click para adicionar..."
          ),
          _react2.default.createElement(
            _View2.default,
            { auto: true, style: {
                cursor: "pointer",
                width: 35, height: 35, borderRadius: 5, backgroundColor: "#ccc", textAlign: "center",
                justifyContent: "center", alignItems: "center"
              }, onClick: function onClick(e) {
                e.stopPropagation();
                _this5.deletar();
              } },
            _react2.default.createElement(_Icon2.default, { icon: "delete" })
          )
        );
      }
      return _react2.default.createElement(
        _View2.default,
        { auto: true, style: { alignSelf: "stretch", maxHeight: 90, flexDirection: "column" }, column: true },
        this.props.label ? _react2.default.createElement(
          _Text2.default,
          { style: [{ fontSize: 11, padding: 5, margin: 0, color: "#999" }] },
          this.props.label
        ) : "",
        _react2.default.createElement(
          _View2.default,
          _defineProperty({ auto: true, style: style, onClick: function onClick() {
              _this5.editar();
            } }, "style", style),
          this.state.save ? _react2.default.createElement(_Progress2.default, { size: 0.5 }) : children
        )
      );
      return _react2.default.createElement("div", null);
    }
  }]);

  return FileView;
}(_react2.default.Component);

exports.default = FileView;


FileView.setHost = function (url) {
  host = url;
};

FileView.setToken = function (t) {
  token = t;
};