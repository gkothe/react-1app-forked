"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleMack = styleMack;
exports.onFetch = onFetch;
exports.isText = isText;
exports.isInteger = isInteger;
var assign = exports.assign = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

// export function assign;

function tratarList(item) {
  var style = {};
  if (item && Array === item.constructor) {
    item.map(function (st) {
      style = assign(style, tratarList(st));
    });
  } else {
    return item || {};
  }
  return style;
}

function styleMack(style) {
  var styles = tratarList(style);
  if ((styles.alignSelf == "stretch" || styles.alignSelf == "auto") && styles.width == "100%") {
    styles.width = "none";
  }
  // if(!styles.alignSelf  && styles.width=="100%"){
  //   styles.width = "none";
  // }
  if (styles.elevation) {
    styles.boxShadow = "0px 0px " + parseInt(styles.elevation) * 2 + "px 0px rgba(0,0,0,0.4)";
  }
  if (styles.alignSelf == "stretch" && !styles.display) styles.display = 'flex';
  return styles;
}

function onFetch() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var retorno = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;

  fetch(url, config).then(function (response) {
    onResolverResponse(response, function (sucess, error) {
      if (error) console.log(error);
      retorno(sucess, error);
    });
  }).catch(function (error) {
    if (retorno) retorno(undefined, error);
  });
}

function onResolverResponse(response, retorno) {
  if (!response || !response.json) return retorno(undefined, { msg: 'not JSON' });
  var p1 = response.json();
  p1.then(function (responseData, error) {
    if (response.status != 200) {
      retorno(undefined, responseData);
    } else if (error) {
      retorno(undefined, error);
    } else {
      retorno(responseData);
    }
  });
}

function isText(val) {
  return typeof val === 'string' || val instanceof String;
}
function isInteger(val) {
  return Number.isInteger(val);
}