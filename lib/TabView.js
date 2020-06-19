'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

var _TouchableOpacity = require('./TouchableOpacity');

var _TouchableOpacity2 = _interopRequireDefault(_TouchableOpacity);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleSheet = { create: function create(style) {
    return style;
  } };

//nao atualizar
var TabViewEdi = function (_React$Component) {
  _inherits(TabViewEdi, _React$Component);

  function TabViewEdi(props) {
    _classCallCheck(this, TabViewEdi);

    var _this = _possibleConstructorReturn(this, (TabViewEdi.__proto__ || Object.getPrototypeOf(TabViewEdi)).call(this, props));

    _this.state = { pos: 0 };
    //{onConstructor}
    return _this;
  }

  _createClass(TabViewEdi, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      //{onDidMount}
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps != this.props) {

        //{onUpdate}
      }
      return true;
    }
    // componentWillUnmount(){
    // }

  }, {
    key: 'getIcons',
    value: function getIcons() {
      var _this2 = this;

      var labels = this.props.children.map(function (child) {
        return child && child.props.tabLabel ? child.props.tabLabel : "";
      });
      var icons = this.props.children.map(function (child) {
        return child && child.props.tabIcon ? child.props.tabIcon : "";
      });
      var badges = this.props.children.map(function (child) {
        return child && child.props.badge ? child.props.badge : 0;
      });
      var bts = [];

      var _loop = function _loop() {

        var label = labels[i];
        var icon = icons[i];
        var badge = badges[i];
        if (!label && !icon) {
          return 'continue';
        }
        var pos = i;
        bts.push(_react2.default.createElement(
          _TouchableOpacity2.default,
          { key: "tag_" + pos, onPress: function onPress() {
              _this2.setState({ pos: pos });
            }, style: styles.bottom },
          _this2.props.tabBarPosition == "overlayTop" && pos == _this2.state.pos ? _react2.default.createElement('div', { style: {
              position: "absolute", backgroundColor: _this2.props.tabBarActiveTextColor ? _this2.props.tabBarActiveTextColor : "#fff",
              height: 3, width: "100%", bottom: 0
            } }) : null,
          badge ? _react2.default.createElement(
            _View2.default,
            { style: styles.view2 },
            _react2.default.createElement(
              _View2.default,
              { style: [styles.view3, { backgroundColor: _this2.props.tabBarActiveTextColor ? _this2.props.tabBarActiveTextColor : "#000" }] },
              _react2.default.createElement(_Text2.default, { style: styles.label1, text: badge + "" })
            )
          ) : null,
          icon && _this2.state.pos != pos ? _react2.default.createElement(_Icon2.default, { style: [styles.icon, { color: _this2.props.tabBarInactiveTextColor ? _this2.props.tabBarInactiveTextColor : "#fff" }],
            fromFontFamily: "Material Design Icons", icon: icon }) : null,
          icon && _this2.state.pos == pos ? _react2.default.createElement(_Icon2.default, { style: [styles.icon, { color: _this2.props.tabBarActiveTextColor ? _this2.props.tabBarActiveTextColor : "#fff" }],
            fromFontFamily: "Material Design Icons", icon: icon }) : null,
          label && _this2.state.pos == pos ? _react2.default.createElement(_Text2.default, { style: [styles.label, { color: _this2.props.tabBarActiveTextColor ? _this2.props.tabBarActiveTextColor : "#fff", "fontWeight": "700" }], text: label }) : null,
          label && _this2.state.pos != pos ? _react2.default.createElement(_Text2.default, { style: [styles.label, { color: _this2.props.tabBarInactiveTextColor ? _this2.props.tabBarInactiveTextColor : "#fff" }], text: label }) : null,
          _this2.props.tabBarPosition != "overlayTop" && pos == _this2.state.pos ? _react2.default.createElement('div', { style: {
              position: "absolute", backgroundColor: _this2.props.tabBarActiveTextColor ? _this2.props.tabBarActiveTextColor : "#fff",
              height: 3, width: "100%", top: 0
            } }) : null
        ));
      };

      for (var i = 0; i < labels.length; i++) {
        var _ret = _loop();

        if (_ret === 'continue') continue;
      }
      return bts;
    }
  }, {
    key: 'getPage',
    value: function getPage() {
      if (this.props.children && this.props.children[this.state.pos]) {
        return this.props.children[this.state.pos];
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _View2.default,
        { style: styles.tela },
        this.props.tabBarPosition == "overlayTop" ? _react2.default.createElement(
          _View2.default,
          { style: [styles.view1, { backgroundColor: this.props.tabBarBackgroundColor ? this.props.tabBarBackgroundColor : "#000" }] },
          this.getIcons()
        ) : null,
        _react2.default.createElement(
          _View2.default,
          { style: styles.view },
          this.getPage()
        ),
        this.props.tabBarPosition != "overlayTop" ? _react2.default.createElement(
          _View2.default,
          { style: [styles.view1, { backgroundColor: this.props.tabBarBackgroundColor ? this.props.tabBarBackgroundColor : "#000" }] },
          this.getIcons()
        ) : null
      );
    }
  }]);

  return TabViewEdi;
}(_react2.default.Component);

exports.default = TabViewEdi;


var styles = StyleSheet.create({
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
    flex: 1,
    minHeight: 40,
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "column",
    "flexWrap": "nowrap",
    "position": "relative",
    "padding": 2
  },
  "view2": {
    display: "flex",
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
    marginBottom: -5,
    marginTop: -5,
    "fontSize": 25
  },
  "label": {
    marginBottom: 5,
    "textAlign": "center",
    marginTop: 0,
    "flexWrap": "wrap",
    "color": "rgba(0,0,0,1)",
    "alignSelf": "stretch",
    "fontSize": 11
  }
});