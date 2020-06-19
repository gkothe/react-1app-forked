import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Switch from "@material-ui/core/Switch";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";

export default function (props){
  if(props.type=="checkbox") return(<SwitchC {...props}/>);
  return(
    <SwitchS {...props}/>
  )
}

const SwitchS =(props)=>(
  <FormControlLabel
    control={
      <Switch
        color="primary"
        {...props}
        onChange={()=>{
          props.onChange(!props.value);
        }}
        checked={Boolean(props.value==undefined?false:props.value)}
      />
    }
    label={props.label}
  />
)

const SwitchC =(props)=>(
  <FormControlLabel
    control={
      <Checkbox
        color="primary"
        checkedIcon={<RadioButtonChecked />}
        icon={<RadioButtonUnchecked />}
        {...props}
        onChange={()=>{
          props.onChange(!props.value);
        }}
        checked={Boolean(props.value==undefined?false:props.value)}
      />
    }
    label={props.label}
  />
)
