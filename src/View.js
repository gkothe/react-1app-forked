import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as Util from "./Util"

let View=(props)=>{
  if(props.container || props.item || props.sx || props.sm || props.md || props.xl || props.lg){
    return <Grid {...props} style={Util.styleMack([props.style,props.superStyle])} />
  }

  if(props.type=="Paper"||props.type=="Card"){
    return <Paper {...props} style={Util.styleMack([props.style,props.superStyle])} />
  }

  return (
    <div 
      {...props}
      onClick={(e)=>{
        if(props.onClick){
          props.onClick(e);
        }
      }} style={Util.styleMack([{ display:"flex",boxSizing: "border-box",width:"100%",flex: "0 1 auto"},props.style,props.superStyle])}>
      {props.clild}
      {props.children}
    </div>
  );
}

export default View;
