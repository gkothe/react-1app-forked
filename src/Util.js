export var assign = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// export function assign;

function tratarList(item){
  let style={}
  if( item && Array === item.constructor){
    item.map(st=>{style=assign(style,tratarList(st))})
  }else{
    return item||{};
  }
  return style;
}

export function styleMack(style){
  let styles=tratarList(style);
  if((styles.alignSelf ==  "stretch" || styles.alignSelf ==  "auto")  && styles.width=="100%"){
    styles.width = "none";
  }
  // if(!styles.alignSelf  && styles.width=="100%"){
  //   styles.width = "none";
  // }
  if( styles.elevation){
    styles.boxShadow = "0px 0px "+(parseInt(styles.elevation)*2)+"px 0px rgba(0,0,0,0.4)";
  }
  if(styles.alignSelf ==  "stretch"&&!styles.display)styles.display='flex';
  return styles;
}


export function onFetch(url='',config={},retorno=console.log){
  fetch(url, config)
  .then(response => {
    onResolverResponse(response,(sucess,error)=>{
      if(error)console.log(error);
      retorno(sucess,error);
    })
  })
  .catch(error => {
    if (retorno) retorno(undefined, error);
  });
}

function onResolverResponse(response, retorno) {
  if(!response||!response.json) return retorno(undefined, {msg:'not JSON'});
  var p1 = response.json();
  p1.then((responseData, error) => {
    if (response.status != 200) {
      retorno(undefined, responseData);
    } else if (error) {
      retorno(undefined, error);
    } else {
      retorno(responseData);
    }
  });
}


export function isText(val) {
  return typeof val === 'string' || val instanceof String;
}
export function isInteger(val) {
  return Number.isInteger(val);
}
