//TitleBar

import React from 'react';
import View from './View';


const TitleBar=(props)=>(
  <View {...props} style={[(!props.fixed?{zIndex:15}:{zIndex:1500,position:"fixed",left:0,right:0,top:0}),props.style]}/>
)

var corPadrao = null;
export default TitleBar;
