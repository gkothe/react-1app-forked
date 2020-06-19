import React from 'react';
import View from './View';

class Fragment extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { page : null  };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
    }
    return true;
  }
  setPage(view){
    this.setState({page:view});
  }
  open(view){
    this.setState({page:  <view.component  {...this.props}   {...view.props} fragment={this}  />});
  } 
  close(){
    this.setState({page:null});
  }
  render() {
 
    var children =this.props.children;
    if(this.state.page){
      children = this.state.page;
    }

     return (
      <View   style={this.props.style}>
        {children}
      </View>
    );
  }

}

export default Fragment;
