import React from "react";
import ReactDOM from 'react-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import * as Util from "./Util"
let conte=0;
class SelectInput extends React.Component {
  getList(list=[]){
    if(list[0]&&(Util.isText(list[0])||Util.isInteger(list[0]))) return list.map(item=>({nome:item,value:item}));
    return list.map(item=>(Util.assign({value:item.id,nome:item.text},item)));
  }
  render(){
    conte++;
    const {label="-",onChange=()=>console.log("onChange"),list=[],value='',key_label='nome',key_value='value',style={}}=this.props;
    return(
      <FormControl key={"select_f"+conte} fullWidth variant={this.props.variant} margin="normal" style={style}>
        <InputLabel htmlFor={this.props.variant=="outlined"?"outlined-age-simple":''}>{label}</InputLabel>
          <Select
            key={"select"+conte}
            {...this.props}
            value={value||''}
            onChange={(event,value)=>{
              let data=(this.getList(list)||[]).find(item=>item[key_value]==event.target.value)
              onChange(event.target.value,data)
            }}
            autoWidth
            >
            <MenuItem value={null}>
              <em>Selecione</em>
            </MenuItem>
            {(this.getList(list)||[]).map((item,index)=>(
              <MenuItem key={conte+"select_key"+index} value={item[key_value]}>{item[key_label]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    }
  }


  export default SelectInput;
