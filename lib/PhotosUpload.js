"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MobileStepper = require("@material-ui/core/MobileStepper");

var _MobileStepper2 = _interopRequireDefault(_MobileStepper);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _ImageUpload = require("./ImageUpload");

var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

var _TouchableOpacity = require("./TouchableOpacity");

var _TouchableOpacity2 = _interopRequireDefault(_TouchableOpacity);

var _Icon = require("./Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _StyleSheet = require("./StyleSheet");

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _Alert = require("./Alert");

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var useStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: 4,
    alignSelf: "stretch",
    borderBottomStyle: "solid",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(0,0,0,0.14)"
    // backgroundColor:'white'
  }
};

var FotosUpload = function (_React$Component) {
  _inherits(FotosUpload, _React$Component);

  function FotosUpload(props, context) {
    _classCallCheck(this, FotosUpload);

    var _this = _possibleConstructorReturn(this, (FotosUpload.__proto__ || Object.getPrototypeOf(FotosUpload)).call(this, props, context));

    _this.state = { activeStep: 0 };
    _this.handleNext = function () {
      _this.setState({ activeStep: _this.state.activeStep + 1 });
    };

    _this.handleBack = function () {
      _this.setState({ activeStep: _this.state.activeStep - 1 });
    };
    return _this;
  }

  _createClass(FotosUpload, [{
    key: "novo",
    value: function novo() {
      this.props.value.push({ url_img: "" });
      this.setState({ activeStep: this.props.value.length - 1 });
    }
  }, {
    key: "delet",
    value: function delet() {
      var _this2 = this;

      _Alert2.default.alert("Apagar", "Voce realmente deseja apagar este o item " + this.state.activeStep + "?", [{
        text: "Ok",
        onPress: function onPress() {
          _this2.props.value.splice(_this2.state.activeStep, 1);
          if (_this2.state.activeStep == 0) {
            _this2.setState({ alterado: true });
          } else {
            _this2.handleBack();
          }
        }
      }, { text: "Cancelar", onPress: function onPress() {
          return console.log();
        } }]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var style = _StyleSheet2.default.flatten([{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: 5,
        minWidth: 5,
        display: "flex",
        alignSelf: "stretch",
        flex: "0 1 auto",
        height: 400,
        elevation: 1
      }, useStyles, this.props.style]);
      var value = this.props.value;

      if (!value || !value[0]) value = [{ url_img: "" }];
      var activeStep = this.state.activeStep;

      if (!value[activeStep]) {
        this.setState({ activeStep: 0 });
        return _react2.default.createElement("div", null);
      }
      var maxSteps = value.length;

      return _react2.default.createElement(
        _View2.default,
        { type: "Paper", elevation: this.props.elevation, style: style },
        _react2.default.createElement(
          _View2.default,
          { style: style.header },
          _react2.default.createElement(
            _Text2.default,
            { style: { flex: 1 } },
            (value[activeStep] || {}).label || this.props.label
          ),
          _react2.default.createElement(
            _TouchableOpacity2.default,
            {
              style: { fontSize: 30, marginRight: 10 },
              color: "primary",
              variant: "outlined",
              tooltip: "Adicionar"
              // children={"+"}
              , onPress: function onPress() {
                _this3.novo();
              }
            },
            _react2.default.createElement(_Icon2.default, { name: "add", style: { fontSize: 30 }, color: "primary" })
          ),
          value.length > 0 ? _react2.default.createElement(
            _TouchableOpacity2.default,
            {
              color: "secondary",
              variant: "outlined",
              tooltip: "Remover",
              style: { marginRight: 10 },
              onPress: function onPress() {
                _this3.delet();
              }
            },
            _react2.default.createElement(_Icon2.default, {
              name: "minus",
              fromFontFamily: "Material Design Icons",
              style: { fontSize: 30 },
              color: "secondary"
            })
          ) : null
        ),
        _react2.default.createElement(_ImageUpload2.default, _extends({}, this.props, {
          label: this.props.label,
          style: {
            alignSelf: "stretch",
            // backgroundColor: "rgba(244,244,244,1)",
            flex: 1
          },
          onChange: function onChange(text) {
            value[activeStep].url_img = text;
            if (_this3.props.onChange) {
              _this3.props.onChange(value, activeStep, text);
            }
          },
          resizeMode: "cover",
          value: value[activeStep].url_img
        })),
        _react2.default.createElement(_MobileStepper2.default, {
          steps: maxSteps,
          position: "static",
          variant: maxSteps > 12 ? "progress" : "dots",
          activeStep: activeStep,
          style: { alignSelf: "stretch" },
          nextButton: _react2.default.createElement(
            _TouchableOpacity2.default,
            {
              size: "small",
              onClick: this.handleNext,
              disabled: activeStep === maxSteps - 1
            },
            _react2.default.createElement(_Icon2.default, { name: "keyboard_arrow_right" })
          ),
          backButton: _react2.default.createElement(
            _TouchableOpacity2.default,
            {
              size: "small",
              onClick: this.handleBack,
              disabled: activeStep === 0
            },
            _react2.default.createElement(_Icon2.default, { name: "keyboard_arrow_left" })
          )
        })
      );
    }
  }]);

  return FotosUpload;
}(_react2.default.Component);

exports.default = FotosUpload;