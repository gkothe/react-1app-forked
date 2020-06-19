import React, { Component } from "react";

import { Content, View, Icon, Text, StyleSheet } from "../";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import moment from "moment";
export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "Ok" };
  }
  getValue() {
    var v = this.props.value;
    if (!v) {
      v = moment().format("YYYY-MM-DD");
      if (this.props.onChange) this.props.onChange(v);
    }
    var value = moment(v).format("YYYY-MM-DD");
    return value;
  }

  render() {
    return (
      <FormControl
        style={{
          width: "100%"
        }}
      >
        <TextField
          id="date"
          label={this.props.label}
          type="date"
          value={this.getValue()}
          onChange={e => {
            var value = e.target.value;
            value = moment(value).toJSON();
            if (this.props.onChange) this.props.onChange(value);
          }}
          InputLabelProps={{
            // shrink: true
          }}
        />
      </FormControl>
    );
  }
}
