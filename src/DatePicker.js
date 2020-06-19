import React, { Component } from "react";
import moment from "moment";
import { MuiPickersUtilsProvider, TimePicker, DatePicker,DateTimePicker } from 'material-ui-pickers';
import "moment/locale/pt-br";
import MomentUtils from "@date-io/moment";
import * as Util from "./Util";

const DateP =(props) => {
  const Picker = getType(props.type);
  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"pt-br"}
    >
      <Picker fullWidth ampm={false} {...props} type={null} style={Util.styleMack([{ marginTop: 20}, props.style ])} />
    </MuiPickersUtilsProvider>
  );
}

function getType(type) {
  switch (type) {
    case "time":
      return TimePicker;
    case "date":
      return DatePicker;
    case "datetime-local":
      return DateTimePicker;
    default:
      return DateTimePicker;
  }
}


export default DateP;
