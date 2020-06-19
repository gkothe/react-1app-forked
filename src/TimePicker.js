import React, { Component } from "react";
import moment from "moment";
import TextInput from "./TextInput"
var contador = 0;


const DatePicker =(props)=> {
  let id=props.id||"DateImput"+(contador++);
  return (
    <TextInput
      InputLabelProps={{
        shrink:true
      }}
      {...props}
      type={"time"}
      value={getValue(props)}
      onChange={value => {
        if (props.onChange) props.onChange(value);
      }}
      />
  );
}


function getValue(props) {
  if(!props.value) return "";
  return moment(props.value,"HH:mm").format("HH:mm");
}

export default DatePicker;
