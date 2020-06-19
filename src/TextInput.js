import React from "react";
import { TextField, AutoComplete } from "@material-ui/core";
import VMasker from "vanilla-masker";
import View from './View';
import Text from './Text';
// import { View, Text } from "react-1app";
var contador = 0;
export default class TextInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    contador++;
    this.id = contador+"input";
  }
  getStringLimit(text) {
    if (!this.props.limit || !text) {
      return text;
    }
    var limit = parseInt(this.props.limit);
    if (text && text.length) {
      if (text.length > limit && limit > 0) {
        text = text.substring(0, limit);
      }
    }
    return text;
  }
  onChange(text) {
    if (this.props.onChange) {
      if (this.props.mask) {
        text = VMasker.toPattern(text, this.props.mask);
      }
      text = this.getStringLimit(text);
      this.props.onChange(text);
    }
  }
  onKeyDown(e) {
    if (e.key == "Enter") {
      if (this.props.onSubmitEditing) {
        this.props.onSubmitEditing();
      }
      if (this.onSubmitEditingFunction) {
        this.onSubmitEditingFunction(e);
      }
    }
  }
  getStyle() {
    var style = {display:"flex",alignSelf:"stretch"};
    if (this.props.inputNative) {
      style.border = "none";
      style.background = "none";
      style.minHeight = 25;
      style.fontSize = 14;
    }
    // console.log(this.props.style);
    if (this.props.style) {
      var lista = [];
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
      }
      if (this.props.superStyle && typeof this.props.superStyle === "object") {
        lista.push(this.props.superStyle);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if (!st) {
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }
    style.display ="block"
    return style;
  }
  getValue() {
    return this.props.value ? this.props.value + "" : "";
  }
//   getAutoComplet() {
//     if (this.props.autocomplete) {
//       var list = [];
//       for (var i = 0; i < this.props.autocomplete.length; i++) {
//         var item = this.props.autocomplete[i];
//         list.push(<option key={"su"+i} value={item} />);
//       }
//       console.log(list)
//       return <datalist id={this.id+"_data"}>{list}</datalist>;
//     }
//     return null;
//   }
  render() {
     
    if (this.props.inputNative) {
      if (this.props.multiline) {
        return (
          <textarea
            type={"text"}
            {...this.props}
            multiline={null}
            keyboardType={null}
            inputNative={null}
            value={this.getValue()}
            onChange={event => {
              this.onChange(event.target.value);
            }}
            onKeyDown={event => {
              this.onKeyDown(event);
            }}
            style={this.getStyle()}
            children={null}
          />
        );
      }

      if (this.props.errorText || this.props.label) {
        var style = this.getStyle();
        style.flexDirection= "column";
        if(!style.color){
            style.color = "#000";
        }
         return (
          <div
            style={style}
            onClick={e => {
              if (this.props.onClick) {
                this.props.onClick(e);
              }
            }}
          >
            {this.props.label ? (
              <Text
                text={this.props.label}
                style={{
                  left: 0,
                  fontSize: 11,
                  marginTop: 2,
                  marginBottom: -2,
                  textAlign: style.textAlign,
                  opacity: 0.5,
                  color: style.color
                }}
              />
            ) : null}
            <input
               type={this.props.secureTextEntry ? "password" : "text"}
              {...this.props}
              inputNative={null}
              keyboardType={null}
                secureTextEntry={null}
              value={this.getValue()}
              onChange={event => {
                this.onChange(event.target.value);
              }}
              onKeyDown={event => {
                this.onKeyDown(event);
              }}
              style={{
                width: "100%",
                displa: "flex",
                textAlign: style.textAlign,
                fontSize: style.fontSize ? style.fontSize : 14,
                color: style.color,
                alignSelf: "stretch",
                border: "none",
                background: "none",
                minHeight: 25
              }}
              children={null}
            />
             <div
              style={{
                width: "100%",
                  opacity: 0.5,
                  color: style.color,
                alignSelf: "stretch",
                backgroundColor: "rgba(204,204,204,0.71)",
                height: 1
              }}
            />
            <Text
              style={{
                flex: 0,
                textAlign: style.textAlign,
                marginTop: 2,
                color: "rgba(0,0,0,1)",
                alignSelf: "stretch",
                fontWeight: "bold",
                fontSize: 11
              }}
              text={this.props.errorText}
            />
          </div>
        );
      }
      return (
        <input
          type={this.props.secureTextEntry ? "password" : "text"}
          {...this.props}
          inputNative={null}
          keyboardType={null}
            secureTextEntry={null}
          value={this.getValue()}
          onChange={event => {
            this.onChange(event.target.value);
          }}
          onKeyDown={event => {
            this.onKeyDown(event);
          }}
          style={this.getStyle()}
          children={null}
        />
      );
    }
    if (this.props.autocomplete && this.props.autocomplete.length > 0) {
      return (
        <AutoComplete
          fullWidth={true}
          floatingLabelStyle={{
            opacity: 0.5,
            color:
            this.props.style && this.props.style.color
            ? this.props.style.color
            : "#000"
          }}
          onNewRequest={(newValue)=>{
            this.onChange(newValue);
          }}
          dataSource={this.props.autocomplete}
          {...this.props}
          keyboardType={null}
          hintText={this.props.placeholder}
          placeholder={null}
          floatingLabelText={this.props.label}
          type={this.props.secureTextEntry ? "password" : "text"}
          searchText={this.getValue()}
          multiLine={this.props.multiline}
          onUpdateInput={( newValue) => {
            this.onChange(newValue);
          }}
          onKeyDown={event => {
            // this.onKeyDown(event);
          }}
          value={null}
          children={null}
          style={this.getStyle()}
          />
      );
    }
    return (
      <TextField
        fullWidth={true}
        floatingLabelStyle={{
          opacity: 0.5,
          color:
            this.props.style && this.props.style.color
              ? this.props.style.color
              : "#000"
        }}
        {...this.props}
        keyboardType={null}
        hintText={this.props.placeholder}
        placeholder={null}
        floatingLabelText={this.props.label}
        type={this.props.secureTextEntry ? "password" : "text"}
        value={this.getValue()}
        multiLine={this.props.multiline}
        onChange={(event) => {
            var newValue = event.target.value;
          this.onChange(newValue);
        }}
        onKeyDown={event => {
          this.onKeyDown(event);
        }}
        children={null}
        style={this.getStyle()}
      />
    );
  }
}
