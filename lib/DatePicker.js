"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _materialUiPickers = require("material-ui-pickers");

require("moment/locale/pt-br");

var _moment3 = require("@date-io/moment");

var _moment4 = _interopRequireDefault(_moment3);

var _Util = require("./Util");

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateP = function DateP(props) {
  var Picker = getType(props.type);
  return _react2.default.createElement(
    _materialUiPickers.MuiPickersUtilsProvider,
    {
      libInstance: _moment2.default,
      utils: _moment4.default,
      locale: "pt-br"
    },
    _react2.default.createElement(Picker, _extends({ fullWidth: true, ampm: false }, props, { type: null, style: Util.styleMack([{ marginTop: 20 }, props.style]) }))
  );
};

function getType(type) {
  switch (type) {
    case "time":
      return _materialUiPickers.TimePicker;
    case "date":
      return _materialUiPickers.DatePicker;
    case "datetime-local":
      return _materialUiPickers.DateTimePicker;
    default:
      return _materialUiPickers.DateTimePicker;
  }
}

exports.default = DateP;