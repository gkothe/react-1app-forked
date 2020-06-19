import React from 'react';
import { Slider } from '@material-ui/core';
export default  class Progress extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
     <Slider {...this.props} />
    )
  }
}
