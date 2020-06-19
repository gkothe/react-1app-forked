import React from 'react';
import { TimePicker } from '@material-ui/core';
import moment from 'moment';
import View from './View';
import Text from './Text';

export default  class ViewTimePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  getStyle(){
    var style = {
      display:"flex",
      flexDirection:"column",
      alignSelf:"stretch",
    };

    if(this.props.style){
      var lista = [];
      if( Array === this.props.style.constructor){
        lista = this.props.style;
      }else{
        lista.push(this.props.style);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if(!st){
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }
    return style;
  }
  render(){
    return (
      <View   style={this.getStyle()}>
        {this.props.label ?(
          <Text style={[{fontSize:11,padding:0,margin:0, color:"#999"} ]} >
            {this.props.label}
          </Text>
        ):("")}
        <TimePicker
          format="24hr"
          {...this.props}
          style={null}
          fullWidth={true}
          value={new Date(this.props.value?this.props.value:new Date())}
          onChange={(event, date) => {
            if(this.props.onChange){
              this.props.onChange(moment(date).toJSON(),moment(date).format("HH:MM"))
            }
          }}
          />

      </View>
    )
  }
}
