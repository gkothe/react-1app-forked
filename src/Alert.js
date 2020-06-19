import React from "react";
import TextInput from "./TextInput";
import Text from "./Text";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

var AlertContext = null;
class Alert extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: props.title,
      discrition: props.descrition,
      bts: props.bts,
      open: props.open ? props.open : false,
      prompt: props.prompt
    };
    if (!AlertContext) {
      AlertContext = this;
    }
  }

  alert(titulo, descrition, bts, prompt) {
    this.setState({
      title: titulo,
      descrition: descrition,
      bts: bts,
      text: "",
      open: true,
      label: null,
      prompt: prompt
    });
    this.closeDialog=()=>{
      this.setState({open: !this.state.open })
    }
  }
  prompt(titulo, label, value, callback) {
    var bts = [
      {
        text: "Send",
        onPress: () => {
          if (callback) {
            callback(this.state.text);
          }
          this.setState({ open: false });
        }
      }
    ];

    this.setState({
      title: titulo,
      descrition: null,
      bts: bts,
      label: label,
      text: value,
      open: true,
      callback: callback,
      prompt: callback
    });
  }

  render() {
    return (
      <Dialog
        style={{ minWidth: 500 }}
        {...this.props}
        open={this.state.open}
        onRequestClose={() => {
          this.setState({ open: false });
          if (this.props.onClose) {
            this.props.onClose();
          }
        }}
      >
        {this.state.title ? (
          <DialogTitle>{this.state.title}</DialogTitle>
        ) : null}

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Text text={this.state.descrition} />
          </DialogContentText>
        </DialogContent>

        {this.state.prompt ? (
          <TextInput
            value={this.state.text}
            onChange={value => {
              this.setState({ text: value });
            }}
            onSubmitEditing={() => {
              if (this.state.callback) {
                this.state.callback(this.state.text);
              }
              this.setState({ open: false });
            }}
            ref={v => (this.textinput = v)}
            label={this.state.label}
          />
        ) : null}
        <DialogActions>
          {this.state.bts&&this.state.bts[0]&&this.state.bts.map((data,key) => {
            return (
              <Button key={"key_"+key} onClick={()=>{
                  if (data.onPress) data.onPress()
                  if(!data.notClose)this.closeDialog()
                }} color={data.color||"primary"}>
                {data.text}
              </Button>
            )})
            ||
            <Button onClick={()=>this.closeDialog()} color="default">
              OK
            </Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}

Alert.alert = (titulo, descricao, bts, prompt) => {
  // console.log("alert");
  // console.log(AlertContext);
  if (AlertContext) {
    AlertContext.alert(titulo, descricao, bts, prompt);
  }
};

Alert.prompt = (titulo, label, value, callback) => {
  if (AlertContext) {
    AlertContext.prompt(titulo, label, value, callback);
  }
};
export default Alert;
