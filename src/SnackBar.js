import React from 'react';
import { Snackbar } from '@material-ui/core';
export default  class ViewSnackbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state ={open:false}
  }

  render(){
    //   return <div />
    // return (
      <Snackbar
          open={this.state.open}
          message={this.state.text}
          autoHideDuration={4000}
        />
    // )
  }
}
