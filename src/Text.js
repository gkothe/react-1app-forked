import React from 'react';
// import View from './View';
import Typography from '@material-ui/core/Typography';

import * as Util from "./Util"

const Text=(props)=>{
  let style=Util.styleMack([{marginBottom:0,display:"flex",lineHeight:1},props.style,props.superStyle])
  if(style.textAlign =="center") style.justifyContent= "center";
  if(style.textAlign == "right") style.justifyContent= "flex-end";

  let text = (props.children||props.text)+'';
  if(!text||text==="undefined") return <div style={style}/>;
  var array = text.split("\n");
  var views = [];
  for (var i = 0; i < array.length; i++) {
    if(i>0) views.push(<br key={"bar_"+i} />);
    views.push(array[i]);
  }
  return (
    <Typography variant="subtitle1" gutterBottom {...props} style={style}>
      {views}
    </Typography>
  );
}


export default Text;
