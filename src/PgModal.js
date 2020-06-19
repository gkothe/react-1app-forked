"use strict";
import React from "react";
import View from "./View";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";

// import { KeyboardAvoidingView, Platform, Linking, Share } from "react-native-1app";
let _ref = null;
let conte = 0;
//nao atualizar

export class PgModal extends React.Component {
  constructor(props) {
    super(props);
    if (!_ref) {
      _ref = this;
      this.gobal = true;
    }
    this.state = {
      heranca: {},
      open: false,
      prop: {},
      Component: View,
      propsModal: {}
    };
    this.openModal = (Component = View, prop = {}, propsModal = {}) => {
      conte++;
      this.setState({ Component, prop, propsModal, open: true });
      if (this.props.OnOpen) this.props.OnOpen(prop);
    };
    this.closeModal = isKeyBack => {
      if (!this.state.open) return false;
      this.setState({ open: false, Component: View });
      if (this.props.OnClose) this.props.OnClose(isKeyBack);
      return true;
    };
  }

  componentWillUnmount() {
    if (this.gobal) _ref = null;
  }

  render() {
    const { Component, prop, propsModal } = this.state;
    return (
      <Dialog
        fullScreen
        open={Boolean(this.state.open)}
        onClose={this.closeModal}
        style={{ overflowX: "auto" }}
        PaperProps={
          this.props.classes && {
            classes: { root: this.props.classes.root }
          }
        }
      >
        <Component
          key={"compe_modal" + conte}
          {...prop}
          closeModal={this.closeModal}
          screenProps={this.props.screenProps}
        />
      </Dialog>
    );
  }
}

const styles = theme => ({
  root: {
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});

export function OpenModal(...args) {
  if (_ref) {
    _ref.openModal(...args);
  }
}
export function CloseModal(...args) {
  if (_ref) {
    return _ref.closeModal(...args);
  }
}

export let Modal = PgModal;

export default withStyles(styles)(PgModal);
