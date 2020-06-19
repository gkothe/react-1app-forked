import React, { Component } from "react";


import SnackBar from "./SnackBar";
import Modal from "./PgModal";
import DialogAlert from "./DialogAlert";
import DialogOptions from "./DialogOptions";

import Alert from "./Alert";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return [
      <SnackBar key="snackbar" {...this.props}/>,
      <Modal key="modal" {...this.props}/>,
      <DialogAlert key="dialogalert" {...this.props}/>,
      <DialogOptions key="dialogoptions" {...this.props}/>,
      <Alert key="alert" {...this.props}/>
    ];
  }
}
