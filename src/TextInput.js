import React from "react";
import TextField from "@material-ui/core/TextField";
import VMasker from "vanilla-masker";
import View from "./View";
import Text from "./Text";
import * as Util from "./Util";
import withStyles from "@material-ui/core/styles/withStyles";

import "./styles.css";

var contador = 0;

const TextInput = props => {
  let id = props.id || "Input" + contador++;
  let style = Util.styleMack([props.style, props.style, props.superStyle]);
  if (props.inputNative) return <Input {...props} style={style} id={id} />;

  return (
    <TextField
      {...props}
      id={id}
      margin="normal"
      fullWidth
      value={props.value || ""}
      onChange={(event, value) => {
        if (props.mask && props.onChange)
          return props.onChange(
            VMasker.toPattern(event.target.value, props.mask)
          );
        if (props.onChange) props.onChange(event.target.value);
      }}
      onKeyDown={event => {
        if (props.onSubmitEditing && event.key == "Enter") {
          props.onSubmitEditing();
        }
      }}
      style={style}
    />
  );
};

const Input = props => {
  return (
    <RenderInput
      type={"text"}
      {...props}
      style={Util.styleMack([
        { border: "none", background: "none", minHeight: 25, fontSize: 14 },
        props.style
      ])}
      ref={props.refInput}
      inputNative={null}
      keyboardType={null}
      secureTextEntry={null}
      value={props.value}
      onChange={event => {
        props.onChange(event.target.value);
      }}
      onKeyDown={e => {
        if (e.key == "Enter") {
          if (props.onSubmitEditing) {
            props.onSubmitEditing();
          }
        }
      }}
      children={null}
    />
  );
};
let RenderInput = props => {
  let style = Util.styleMack([{ color }, props.style]);
  if (!props.multiline) return <input {...props} style={style} />;
  return <textarea {...props} style={style} />;
};
let color = "";
const styles = theme => {
  color = theme.typography.h1.color;
  return {};
};

const RenderInputThema = withStyles(styles)(RenderInput);

export default TextInput;
let style = {};
