import React from 'react';
import { CircularProgress } from '@material-ui/core';

import View from './View';

export default class RefreshControl extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {refreshing:props.refreshing};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.refreshing =nextProps.refreshing;
    }
    return true;
  }

  render() {
    if(!this.state.refreshing  ){
      return (
        <div/>
      );
    }else{
      return (
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <View style={{
              alignItems:"center",
              justifyContent:"center",
              background: "#fff",
              width: 44,
              borderRadius: 22,
              height: 44,
              marginBottom: -60,
              zIndex: 500,
              boxShadow: "0px 0px 8px 1px rgba(0, 0,0 , 0.5)",
              border: "#ccc 1px solid"
            }}>
            <CircularProgress />
          </View>
        </View>
      );
    }

  }

}
