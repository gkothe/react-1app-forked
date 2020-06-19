'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FixedActionButton = function (_React$Component) {
  _inherits(FixedActionButton, _React$Component);

  function FixedActionButton(props, context) {
    _classCallCheck(this, FixedActionButton);

    var _this = _possibleConstructorReturn(this, (FixedActionButton.__proto__ || Object.getPrototypeOf(FixedActionButton)).call(this, props, context));

    _this.state = { open: false, action: props.action };
    return _this;
  }

  _createClass(FixedActionButton, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps != this.props) {
        if (nextProps.action && this.state.action && this.state.action.length != nextProps.action.length) {
          nextState.reload = true;
        }
        nextState.action = nextProps.action;
      }
      return true;
    }
  }, {
    key: 'open',
    value: function open() {
      if (this.state.open) {
        this.close();
      } else {
        this.setState({ open: true });
        $('.fixed-action-btn').openFAB();; //FixedActionButton
      }
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ open: false });
      $('.fixed-action-btn').closeFAB();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.tooltipped').css({ "font-family": "sans-serif" });
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this2 = this;

      var tags = [];
      if (this.state.action) {
        var _loop = function _loop() {
          var item = _this2.state.action[i];
          tags.push(_react2.default.createElement(
            'li',
            { key: "action_bt_" + i },
            _react2.default.createElement(
              'a',
              { 'data-tooltip': item.title, className: 'btn-floating waves-effect waves-light red tooltipped', 'data-position': 'left', 'data-delay': '30',
                onClick: function onClick(e) {
                  _this2.open();
                  if (item.action) {
                    item.action(e);
                  }
                } },
              _react2.default.createElement('i', { className: "mdi mdi-" + item.icon })
            )
          ));
        };

        for (var i = 0; i < this.state.action.length; i++) {
          _loop();
        }
      }
      return tags;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.reload) {
        Materialize.fadeInImage('#FixedActionButton');
        setTimeout(function () {
          _this3.setState({ reload: false });
        }, 100);
        return _react2.default.createElement('div', null);
      } else {
        setTimeout(function () {
          if (_this3.state.open) {
            Materialize.fadeInImage('#FixedActionButton');
            $('.fixed-action-btn').openFAB();; //FixedActionButton
          } else {
            $('.fixed-action-btn').closeFAB();; //FixedActionButton
          }
        }, 100);
      }
      return _react2.default.createElement(
        'div',
        { id: "FixedActionButton", className: 'fixed-action-btn vertical click-to-toggle', style: { fontFamily: "sans-serif" } },
        _react2.default.createElement(
          'a',
          { className: 'btn-floating btn-large waves-effect waves-light red', onClick: function onClick() {
              _this3.setState({ open: !_this3.state.open });
            } },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            !this.state.open ? "add" : "remove"
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          this.getList()
        )
      );
    }
  }]);

  return FixedActionButton;
}(_react2.default.Component);

exports.default = FixedActionButton;