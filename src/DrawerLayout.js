import React from 'react';
import { Drawer } from '@material-ui/core';
export default  class ViewDatePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render(){
    return (
      <Drawer {...this.props} >
        {this.props.children}
      </Drawer>
    )
  }
}
