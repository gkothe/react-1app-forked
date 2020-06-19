import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  renderBts() {
    if (!this.props.bts || this.props.bts.length == 0) return;
    var bts = [];
    for (let i = 0; i < this.props.bts.length; i++) {
      let item = this.props.bts[i];
      bts.push(
        <Button
          key={i + "_" + item.text}
          onClick={() => {
            if (item.action) item.action();
          }}
          color="primary"
        >
          {item.text}
        </Button>
      );
    }
    return <DialogActions>{bts}</DialogActions>;
  }
  render() {
    return (
      <Dialog
        scroll={"body"}
        maxWidth={this.props.maxWidth ? this.props.maxWidth : "md"}
        aria-labelledby="responsive-dialog-title"
        open={this.props.visible}
        onClose={() => {
          if (this.props.onRequestClose) {
            this.props.onRequestClose();
          }
        }}
      >
        {this.props.title ? (
          <DialogTitle>{this.props.title}</DialogTitle>
        ) : null}

        <DialogContent>{this.props.children}</DialogContent>

        {this.props.actions && this.props.actions.length > 0 ? (
          <div
            className="modal-footer"
            style={{
              flexDirection: "row-reverse",
              display: "flex",
              padding: 20
            }}
          >
            {this.props.actions}
          </div>
        ) : null}
        {this.renderBts()}
      </Dialog>
    );
  }
}
