import React, { Component } from "react";
import { Content, View, StyleSheet, Progress } from "../";
import moment from "moment";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
var id = 0;
export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.id = id++;
  }
  isObject(val) {
    if (val === null) {
      return false;
    }
    return typeof val === "function" || typeof val === "object";
  }
  getLista() {
    var tags = [];
    var lista = this.props.list;
    if (!lista || !lista[0]) return null;

    for (var i = 0; i < lista.length; i++) {
      let item = lista[i];
      var name = "";
      var value = "";
      if (this.isObject(item)) {
        if (!item.value && item.objectId) {
          item.value = item.objectId;
        }
        if (!item.value && item.id) {
          item.value = item.id + "";
        }
        if (!item.text && item.nome) {
          item.text = item.nome;
        }
        if (!item.text && item.name) {
          item.text = item.name;
        }

        name = item.text ? item.text : item.value;
        if (item.nome) {
          name = item.nome;
        }
        value = item.value;
      } else {
        name = item;
        value = item;
      }
      if (this.props.inputNative) {
        tags.push(
          <option key={i + "_sel"} style={{ color: "#777" }} value={value + ""}>
            {name}
          </option>
        );
      } else {
        tags.push(
          <MenuItem key={i + "_sel"} value={value + ""}>
            {name}
          </MenuItem>
        );
      }
    }
    if (lista[0]) {
      let item = lista[0];
      let value = this.isObject(item) ? item.value : item;
      setTimeout(() => {
        if (
          this.props.onChange &&
          value &&
          (this.props.value + "" == "undefined" ||
            this.props.value + "" == "null")
        ) {
          //   this.props.onChange(value, value, 0);
        }
      }, 100);
    }
    return tags;
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (nextProps.value !== this.state.value) {
  //         nextState.value = nextProps.value
  //       return true;
  //     }
  //     return false;
  //   }

  render() {
    return (
      <FormControl
        style={{
          width: "100%"
        }}
      >
        <InputLabel htmlFor={this.id + "select"}>{this.props.label}</InputLabel>
        <Select
          autoWidth={true}
          value={this.props.value ? this.props.value +"" : ""}
          onChange={e => {
            var value = e.target.value;
            this.setState({ value: value });
            if (this.props.onChange) this.props.onChange(value, value, 0);
          }}
          inputProps={{
            name: this.id + "select",
            id: this.id + "select"
          }}
        >
          {this.getLista()}
        </Select>
      </FormControl>
    );
  }
}
