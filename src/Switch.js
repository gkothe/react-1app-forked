import React, { Component } from "react";

import { Content, View, Icon, Text, StyleSheet } from "../";
import TextField from "@material-ui/core/TextField";
import { FormControl, FormControlLabel } from "@material-ui/core";
import moment from "moment";
import Switch from "@material-ui/core/Switch";

export default class SwitchViews extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "Ok" };
  }
  getValue() {}

  render() {
    return (
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={this.props.value ? this.props.value : false}
            onChange={e => {
              var value = e.target.checked;
              if (this.props.onChange) {
                this.props.onChange(value);
              }
            }}
            value={this.props.value ? this.props.value : false}
          />
        }
        label={this.props.label}
      />
    );
  }
}
