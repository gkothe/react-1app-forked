import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
let _ref=null;

export default class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    _ref=this;
    this.state = {
      heranca: {},
      open:false,
      prop:{},
      Component:Grid,
      propsModal:{},
      action:[],
      input:null,
      texto:'',
      title:''
    };
    this.openDialog=({Component=Grid,prop={},propsDialog={},title='',description='',texto='',action=[],input=null})=>{
      this.setState({Component,prop,propsDialog,
        open:true,title,description,action,input,texto})
        // this.refs.modal1.open()
      }
      this.closeDialog=()=>{
        this.setState({open: !this.state.open })
        // this.refs.modal1.close()
      }
    }
    render() {
      const{Component,prop,propsDialog,title,description,action,input}=this.state;

      return (

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{zIndex: 1400}}
          {...propsDialog}
          >
          <DialogTitle id="alert-dialog-slide-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {description}
            </DialogContentText>
            <Component {...prop}  onClose={this.closeDialog}/>
            {input&&<TextField
              autoFocus
              margin="dense"
              id="name"
              // label="Email Address"
              // type="email"
              fullWidth
              {...input}
              value={this.state.texto}
              onChange={event => {
                if(input.onChange)input.onChange(event.target.value)
                this.setState({texto:event.target.value});
              }}
              />}
            </DialogContent>
            <DialogActions>
              {action[0]&&action.map((data,key) => {
                return (
                  <Button key={"key_"+key} color={data.color||"primary"} onClick={()=>{
                      if (data.onClick) data.onClick()
                      if(!data.notClose)this.closeDialog()
                    }} >
                    {data.label}
                  </Button>
                )})
                ||
                <Button onClick={this.closeDialog} color="primary">
                  OK
                </Button>
              }

            </DialogActions>
          </Dialog>

        );
      }
    }

    export function OpenDialog(...args) {
      if (_ref) {
        _ref.openDialog(...args);
      }
    }
    export function CloseDialog(...args) {
      if (_ref) {
        _ref.closeDialog(...args);
      }
    }
