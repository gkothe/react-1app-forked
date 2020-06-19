"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Image = require("./Image");

var _Image2 = _interopRequireDefault(_Image);

var _View = require("./View");

var _View2 = _interopRequireDefault(_View);

var _reactSwipeableViews = require("react-swipeable-views");

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _reactSwipeableViewsUtils = require("react-swipeable-views-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaySwipeableViews = _reactSwipeableViews2.default;

var Photos = function (_React$Component) {
  _inherits(Photos, _React$Component);

  function Photos(props, context) {
    _classCallCheck(this, Photos);

    var _this = _possibleConstructorReturn(this, (Photos.__proto__ || Object.getPrototypeOf(Photos)).call(this, props, context));

    _this.state = {
      index: 0,
      lista: props.list ? props.list : []
    };
    if (props.autoPlay) {
      PlaySwipeableViews = (0, _reactSwipeableViewsUtils.autoPlay)(_reactSwipeableViews2.default);
    }
    return _this;
  }

  _createClass(Photos, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        nextState.lista = nextProps.list;
      }
      return true;
    }
  }, {
    key: "getViews",
    value: function getViews() {
      var fotosList = [];
      if (this.state.lista) {
        for (var i = 0; i < this.state.lista.length; i++) {
          var item = this.state.lista[i];
          if (item && (item.url || item.url_img)) {
            fotosList.push(_react2.default.createElement(
              _Image2.default,
              {
                key: "foto_" + i,
                src: item.url ? item.url : item.url_img,
                resizeMode: _Image2.default.cover,
                style: {
                  height: this.props.style ? this.props.style.height : "100%",
                  alignSelf: "stretch",
                  flex: 1
                }
              },
              item.titulo || item.descricao ? _react2.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "sans-serif",
                    textShadow: "#000 0px 0px 6px "
                  }
                },
                item.titulo ? _react2.default.createElement(
                  "h2",
                  null,
                  item.titulo
                ) : null,
                item.descricao ? _react2.default.createElement(
                  "h4",
                  null,
                  item.descricao
                ) : null
              ) : null
            ));
          }
        }
      }
      return fotosList;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = {
        display: "flex",
        boxSizing: "border-box",
        width: "100%",
        alignItems: "center",
        flex: "0 1 auto"
      }; //,flex:"1 1 auto" ,flexWrap: "wrap"
      //,alignSelf: "flex-start"
      if (this.props.style) {
        var lista = [];
        if (Array === this.props.style.constructor) {
          lista = this.props.style;
        } else {
          lista.push(this.props.style);
        }
        if (this.props.superStyle && _typeof(this.props.superStyle) === "object") {
          lista.push(this.props.superStyle);
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

      // style.flex = 1;
      // style.display = "flex";
      // style.alignSelf = "stretch";
      var index = this.state.index;

      style.alignItems = "center";
      style.justifyContent = "flex-end";
      style.flexDirection = "column";

      return _react2.default.createElement(
        _View2.default,
        { style: style },
        _react2.default.createElement(
          PlaySwipeableViews,
          {
            index: index,
            enableMouseEvents: true,
            style: { flex: 1, alignSelf: "flex", width: "100%" },
            onChangeIndex: function onChangeIndex(index) {
              _this2.setState({
                index: index
              });
            },
            containerStyle: { alignSelf: "stretch" }
          },
          this.getViews()
        ),
        _react2.default.createElement(Pagination, {
          dots: this.state.lista ? this.state.lista.length : 0,
          index: index,
          onChangeIndex: function onChangeIndex(index) {
            _this2.setState({ index: index });
          }
        })
      );
    }
  }]);

  return Photos;
}(_react2.default.Component);

exports.default = Photos;

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          index = _props.index,
          dots = _props.dots;


      var children = [];

      for (var i = 0; i < dots; i += 1) {
        children.push(_react2.default.createElement(PaginationDot, {
          key: i,
          index: i,
          active: i === index,
          onClick: function onClick(event, index) {
            _this4.props.onChangeIndex(index);
          }
        }));
      }

      return _react2.default.createElement(
        "div",
        { style: styles.rootPagination },
        children
      );
    }
  }]);

  return Pagination;
}(_react.Component);

var PaginationDot = function (_Component2) {
  _inherits(PaginationDot, _Component2);

  function PaginationDot() {
    _classCallCheck(this, PaginationDot);

    return _possibleConstructorReturn(this, (PaginationDot.__proto__ || Object.getPrototypeOf(PaginationDot)).apply(this, arguments));
  }

  _createClass(PaginationDot, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      var active = this.props.active;


      var styleDot = void 0;

      if (active) {
        styleDot = Object.assign({}, styles.dot, styles.active);
      } else {
        styleDot = styles.dot;
      }

      return _react2.default.createElement(
        "button",
        {
          style: styles.root,
          onClick: function onClick(event) {
            _this6.props.onClick(event, _this6.props.index);
          }
        },
        _react2.default.createElement("div", { style: styleDot })
      );
    }
  }]);

  return PaginationDot;
}(_react.Component);

var styles = {
  rootPagination: {
    padding: 5,
    position: "absolute",
    display: "flex",
    flexDirection: "row"
  },
  root: {
    height: 18,
    width: 18,
    cursor: "pointer",
    border: 0,
    background: "none",
    padding: 0
  },
  dot: {
    border: "solid 2px #000",
    backgroundColor: "#fff",
    height: 12,
    width: 12,
    borderRadius: 10,
    margin: 3
  },
  active: {
    border: "solid 2px #fff",
    backgroundColor: "#444"
  }
};