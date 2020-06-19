"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = (_module$exports = {
  parseMoney: function parseMoney(value) {
    value = this.parseNumeroDuasCasas(value);
    if (!value) {
      return "R$ 0,00";
    }
    value = value + "";
    return "R$ " + value.replace(".", ",");
  },
  loginFacebook: function loginFacebook(retorno) {
    if (!FB) {
      console.log("not FB.login");
      if (retorno) {
        retorno(null);
      }
      return;
    }
    if (navigator && navigator.userAgent && navigator.userAgent.match('iPhone') && navigator.userAgent.match('Chrome'))
      // alert(navigator.userAgent)
      // alert("Android|webOS|iPhone|iPad|iPod|BlackBerry".test(navigator.userAgent))
      // if( "Android|webOS|iPhone|iPad|iPod|BlackBerry".test(navigator.userAgent) )
      {
        ///tratar retirno code
        window.location.href = 'https://www.facebook.com/dialog/oauth?response_type=token&client_id=' + "937131409727341" + '&redirect_uri=' + document.location.href + '&scope=email,public_profile';
        // window.open('https://www.facebook.com/dialog/oauth?response_type=token&client_id='+"937131409727341"+'&redirect_uri='+ document.location.href +'&scope=email,public_profile', '', null);
      } else {
      FB.login(function (response) {
        console.log(response);
        if (response.authResponse) {
          if (retorno) {
            retorno(response.authResponse.accessToken);
          }
        } else {
          if (retorno) {
            retorno(null);
          }
        }
      }, { scope: 'email,user_friends' }); //user_birthday
    }
  },
  email: function email(listaEmail) {
    window.location.href = "mailto:" + listaEmail[0];
  },
  web: function web(url) {
    if (!(url.indexOf("http") >= 0)) {
      url = "http://" + url;
    }
    var win = window.open(url, '_blankFromWebApp');
    win.focus();
  },
  capitalizar: function capitalizar(string) {
    if (!string) {
      return "";
    }
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  parseNumeroDuasCasas: function parseNumeroDuasCasas(string) {
    if (!string) {
      return 0.00;
    }
    try {
      string = string + "";
      var val = string.replace(',', '.');
      var nnn = parseFloat(val);
      if (!nnn) {
        nnn = 0.00;
      }
      var num = nnn.toFixed(2);
      //        return parseFloat(val);
      if (!num || num < 0) {
        num = 0.00;
      }
      return num;
    } catch (e) {
      console.log(e);
      return 0.00;
    }
  },
  parseNumeroIntero: function parseNumeroIntero(string) {
    if (!string) {
      return 0;
    }
    try {
      string = string + "";
      var val = string.replace(',', '.');
      var nnn = parseInt(val);
      if (!nnn) {
        nnn = 0;
      }
      return nnn;
    } catch (e) {
      console.log(e);
      return 0;
    }
  },
  parseNumeroBR: function parseNumeroBR(string) {
    try {
      string = string + "";
      var val = string.replace(',', '.');
      var nnn = parseFloat(val);
      var num = nnn.toFixed(2);
      //        return parseFloat(val);
      var val = num + "".replace('.', ',');
      return num;
    } catch (e) {
      return "0,00";
    }
  },
  getHeight: function getHeight() {
    if (self.innerHeight) {
      return self.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
      return document.documentElement.clientHeight;
    }
    if (document.body) {
      return document.body.clientHeight;
    }
  },
  getWidth: function getWidth() {
    if (self.innerHeight) {
      return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }
    if (document.body) {
      return document.body.clientWidth;
    }
  },
  createDateAsUTC: function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  },
  convertDateToUTC: function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  },
  humanizarDistancia: function humanizarDistancia(metros) {
    if (metros < 50) {
      return "aqui";
    } else if (metros < 1000) {
      return parseInt(metros + "") + " mts";
    } else {
      return parseInt(metros / 1000 + "") + " Kms";
    }
  },
  removerAcentos: function removerAcentos(s) {
    if (!s) {
      return "";
    }
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "_");
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
  },
  distLatLongEmMt: function distLatLongEmMt(lat1, lon1, lat2, lon2) {
    lat1 = Number(lat1);
    lon1 = Number(lon1);
    lat2 = Number(lat2);
    lon2 = Number(lon2);
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371; // Radius of the earth in kilometers
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in KM
    // console.log(d);
    // console.log(lat1,lat2,lon1,lon2);
    return d * 1000;
  },
  getPartLocation: function getPartLocation(tag, json) {
    var lista = json.results[0].address_components;
    for (var i = 0; i < lista.length; i++) {
      var item = lista[i];
      if (item.types.indexOf(tag) >= 0) {
        return item.long_name;
      }
    }
  },
  geoLocalizacao: function geoLocalizacao(endereco, retorno) {
    var _this = this;

    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(endereco) + '&sensor=true&key=AIzaSyAdBVSO_pMhwOzOvCKtvWPpjVRyFJlh4yI';
    console.log(url);
    this.getRequest(url, function (json) {
      if (json.results && json.results[0] && json.results[0].geometry) {
        var address = {};
        if (json.results[0].address_components) {
          address.numero = _this.getPartLocation("street_number", json);
          address.rua = _this.getPartLocation("route", json);
          address.bairro = _this.getPartLocation("sublocality", json);
          address.cidade = _this.getPartLocation("administrative_area_level_2", json);
          address.estado = _this.getPartLocation("administrative_area_level_1", json);
          address.pais = _this.getPartLocation("country", json);
          address.cep = _this.getPartLocation("postal_code", json);
        }
        address.endereco = json.results[0].formatted_address;

        var geometry = json.results[0].geometry;
        if (geometry && geometry.location) {
          retorno(geometry.location.lat, geometry.location.lng, address);
        } else {
          retorno(0, 0);
        }
      } else {
        retorno(0, 0);
      }
    });
  },
  getRequest: function getRequest(url, retorno, backErro) {
    // fetch('/package.json').then(function(response) {
    //   return response.json()
    // }).then(function(json) {
    //   console.log('parsed json', json)
    // }).catch(function(ex) {
    //   console.log('parsing failed', ex)
    // })
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      // console.log('parsed json', json)
      retorno(json);
    }).catch(function (error) {
      if (backErro) {
        backErro(error);
      }
    });
  },
  request: function request(url, config, retorno) {
    fetch(url, config).then(function (response) {
      return response.text();
    }).then(function (json) {
      // console.log(json);
      try {
        retorno(JSON.parse(json));
      } catch (e) {
        console.log(e);
        retorno(json);
      }
    }).catch(function (error) {
      console.log('Erro:', error);
      if (retorno) {
        retorno({});
      }
    });
  },
  getRequestData: function getRequestData(url, retorno, backErro) {
    fetch(url).then(function (json) {
      // console.log('parsed json', json)
      retorno(json);
    }).catch(function (error) {
      if (backErro) {
        backErro(error);
      }
    });
  },
  postRequest: function postRequest(url, data, retorno, backErro) {
    // console.log(url);
    var config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, config).then(function (response) {
      return response.json();
    }).then(function (json) {
      retorno(json);
    }).catch(function (error) {
      console.log('Erro:', error);
      if (backErro) {
        backErro(error);
      }
    });
  },
  postRequestHeaders: function postRequestHeaders(url, data, headers, retorno, backErro) {
    // headers['Content-Type']='application/json';
    // headers["Access-Control-Allow-Headers"]= "*";
    // console.log(headers);
    // headers = {};
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    // headers.key_user="ekdd";
    // console.log(headers);
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      // console.log('parsed json', json)
      retorno(json);
    }).catch(function (error) {
      console.log('Erro:', error);
      if (backErro) {
        backErro(error);
      }
    });
  },
  allRequest: function allRequest(url, data, headers, metodo, retorno, backErro) {
    fetch(url, {
      method: metodo,
      headers: headers,
      body: JSON.stringify(data)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      // console.log('parsed json', json)
      retorno(json);
    }).catch(function (error) {
      console.log('Erro:', error);
      if (backErro) {
        backErro(error);
      }
    });
  },
  replaceAll: function replaceAll(string, str, key) {
    try {
      if (!string) {
        return "";
      }
      if (!str) {
        return string;
      }
      if (!key) {
        key = "";
      }
      return string.replace(new RegExp(str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), key);
    } catch (e) {
      return string;
    }
  },
  recortaString: function recortaString(string, pos) {
    if (!string) {
      return "";
    }
    if (!pos) {
      return string;
    }
    var re = "";
    // if (contemString(string, "#")) {
    //   var numero = string.split("#")[1];
    var pos = parseInt(pos + "");
    if (pos < string.length - 1) {
      re = string.substring(0, pos) + "...";
    } else {
      re = string;
    }
    // }
    return re;
  },
  contemString: function contemString(string, key) {
    if (!string || !key) {
      return false;
    }
    try {
      string = string + "";
      if (string && string.indexOf(key) >= 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },
  startsWith: function startsWith(string, key) {
    if (string) {
      string = string + "";
    } else {
      return false;
    }
    if (string && string.indexOf(key) === 0) {
      return true;
    } else {
      return false;
    }
  },
  endWith: function endWith(string, key) {
    if (string) {
      string = string + "";
    } else {
      return false;
    }
    if (string && string.indexOf(key, string.length - key.length) === 0) {
      return true;
    } else {
      return false;
    }
  },
  getDataBR: function getDataBR(string_data) {
    if (!string_data) {
      return '';
    }
    var st = "";

    var d = string_data;
    if (typeof string_data === 'string' || string_data instanceof String) {
      d = new Date(string_data);
    }
    var mes = d.getUTCMonth() + 1;
    var dia = d.getUTCDate();
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (dia < 10) {
      dia = "0" + dia;
    }
    var re = dia + "/" + mes + "/" + d.getFullYear();
    // alerta_em_json(d);
    return re;
  },
  getHoraBR: function getHoraBR(string_data) {
    if (!string_data) {
      return '';
    }
    function pad(num, size) {
      var s = num + "";
      while (s.length < size) {
        s = "0" + s;
      }return s;
    }
    if (!string_data || !string_data.toJSON) {
      return "";
    }
    // var st = string_data.toJSON();
    var d = string_data; //Uteis.DateISO(st);
    var h = d.getUTCHours();
    var m = d.getUTCMinutes();
    var re = pad(h, 2) + ":" + pad(m, 2);
    // alerta_em_json(h);
    return re;
  },


  // parseToDateISO (dateStr) {
  //   if (!dateStr || dateStr === "") {
  //     return new Date();
  //   }
  //   try {
  //     var a = dateStr.split(" ");
  //     var d = a[0].split("/");
  //     ///2015-04-01T19:30:48.552Z
  //     var ano = d[2];
  //     var mes = d[1];
  //     var dia = d[0];
  //     var h = "12";
  //     var m = "00";
  //     //        console.log(d);
  //     //        console.log(dateStr);
  //     if (a[1]) {
  //       var t = a[1].split(":");
  //       //            console.log(t);
  //       if (t.length === 2) {
  //         h = t[0];
  //         m = t[1];
  //       }
  //     }
  //     //     function dateObjectFromUTC(s) {
  //     //       s = s.split(/\D/);
  //     //       return new Date(Date.UTC(+s[0], --s[1], +s[2], +s[3], +s[4], +s[5], 0));
  //     //     }
  //     var date = "" + ano + "-" + mes + "-" + dia + "T" + h + ":" + m + ":00.184Z";
  //            console.log(date);
  //            console.log(dateStr);
  //            console.log( new Date().toISOString());
  //     return new Date(date);
  //   } catch (e) {
  //     console.log(e);
  //     return new Date();
  //   }
  //
  // },
  //
  parseToDateISO: function parseToDateISO(dateStr) {
    if (!dateStr || dateStr === "") {
      return new Date();
    }
    try {
      var dateObjectFromUTC = function dateObjectFromUTC(s) {
        s = s.split(/\D/);
        var hora = +s[3];
        hora = parseInt(hora) + 3;
        return new Date(Date.UTC(+s[0], --s[1], +s[2], hora, +s[4], +s[5], 0));
      };

      var a = dateStr.split(" ");
      var d = a[0].split("/");
      ///2015-04-01T19:30:48.552Z
      var ano = d[2];
      var mes = d[1];
      var dia = d[0];
      var h = "12";
      var m = "00";
      //        console.log(d);
      //        console.log(dateStr);
      if (a[1]) {
        var t = a[1].split(":");
        //            console.log(t);
        if (t.length === 2) {
          h = t[0];
          m = t[1];
        }
      }

      var date = dateObjectFromUTC("" + ano + "-" + mes + "-" + dia + "T" + h + ":" + m + ":0");
      //        console.log(date);
      return date;
    } catch (e) {
      console.log(e);
      return new Date();
    }
  },
  salvarWeb: function salvarWeb(data, config, retorno) {
    data = data.replace("data:image/jpeg;base64,", "");
    data = data.replace("data:image/png;base64,", "");
    data = data.replace("data:application/pdf;base64,", "");

    if (!config || !config.small) {
      config = { data: data, small: { w: 75, h: 75, tipo: "small" }, large: { w: 150, h: 150, tipo: "large" }, nome: "image.png" };
    } else {
      config.data = data;
    }
    config.nome = !config.nome ? "image.png" : config.nome;
    retorno(data, config);
    // $.post("http://maranhaotel.parseapp.com/imageMake",config, function (re) {
    //   retorno(re);
    // });
  },
  salvarImagem: function salvarImagem(blob, config, retorno) {
    var _this2 = this;

    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      _this2.salvarWeb(base64data, config, retorno);
      // console.log(base64data );
    };
  },
  salvarImageFromPromisa: function salvarImageFromPromisa(promise, config, retorno) {
    var _this3 = this;

    promise.then(function (result) {
      _this3.salvarImagem(result, config, retorno);
    }, function (err) {
      console.log(err); // Error: "It broke"
    });
  },
  getBase64File: function getBase64File(file, retorno) {
    var reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      var base64data = reader.result;
      retorno(base64data);
    };
  },
  resizeImage: function resizeImage(data, width, retorno) {
    var img = new Image();
    img.onload = function () {
      var oc = document.createElement('canvas');
      var octx = oc.getContext('2d');

      if (img.width <= width) {
        width = img.width;
        // retorno(di);
        // return;
      }

      oc.width = width;
      oc.height = img.height * (width / img.width);
      console.log(img.height + " -- " + img.width);
      console.log(oc.height + " -- " + oc.width);
      octx.drawImage(img, 0, 0, oc.width, oc.height);
      var base64 = oc.toDataURL("image/jpeg");
      base64 = base64.replace("data:image/jpeg;base64,", "");
      base64 = base64.replace("data:image/png;base64,", "");
      base64 = base64.replace("data:application/pdf;base64,", "");

      retorno(base64);
    };
    img.src = data;
  },
  isNumber: function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  limparNumero: function limparNumero(string) {
    try {
      string = string + "";
      // console.log(string);
      var val = string.replace(',', '.');
      val = val.replace(/[^,.,0-9]/g, '');
      return val;
    } catch (e) {
      // console.log(e);
      return "0";
    }
  },
  parseNumero: function parseNumero(string) {
    try {
      string = string + "";
      // console.log(string);
      var val = string.replace(',', '.');
      var nnn = parseFloat(val);
      // console.log(nnn);
      //        return parseFloat(val);
      return nnn;
    } catch (e) {
      // console.log(e);
      return 0.0;
    }
  }
}, _defineProperty(_module$exports, "parseNumeroDuasCasas", function parseNumeroDuasCasas(string) {
  try {
    string = string + "";
    var val = string.replace(',', '.');
    var nnn = parseFloat(val);
    var num = nnn.toFixed(2);
    //        return parseFloat(val);
    return num;
  } catch (e) {
    return 0.0;
  }
}), _defineProperty(_module$exports, "getImageMore", function getImageMore() {
  return "";
}), _defineProperty(_module$exports, "getImageUp", function getImageUp() {
  return "";
}), _module$exports);

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};
