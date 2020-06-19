import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Icon from "./Icon";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dividerInset: {
    margin: `5px 0 0 2px`,
  },
  paper:{
    minWidth:400
  }
};
let _ref=null;

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);

    _ref=this;
    this.state={
      open:false,
      title:"",
      action:[]
    }
  }
  openDialog({title='',description='',texto='',action=[]}){
    this.setState({open:true,title,description,action})
    // this.refs.modal1.open()
  }
  closeDialog(){
    this.setState({open: !this.state.open })
    // this.refs.modal1.close()
  }

  render() {
    const{title,description,action}=this.state;
    let {classes}=this.props
    return (
      <Dialog onClose={()=>this.closeDialog()} aria-labelledby="simple-dialog-title" open={this.state.open} classes={classes} >
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <div>
          <List
             subheader={<ListSubheader component="div">{description}</ListSubheader>}>
            {action.map(data => ([
              (data.separa&&[
                <Divider component="li" variant="inset"  style={{marginTop:7}}/>,
                <li>
                  <Typography className={classes.dividerInset} color="textSecondary" variant="caption">
                    {data.separa}
                  </Typography>
                </li>
              ]),
              <ListItem button onClick={() => {
                  if (data.onPress) data.onPress()
                  this.closeDialog()
                }} key={data.label}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    {data.icon!=false&&<Icon name={data.icon||"settings_input_component"}/>}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={data.label} />
              </ListItem>
            ]))||
            <Button onClick={this.closeDialog} color="primary">
              OK
            </Button>
          }
        </List>
      </div>
    </Dialog>
  );
}
}



export function OpenDialogOption(...args) {
  if (_ref) {
    _ref.openDialog(...args);
  }
}
export function CloseDialogOption(...args) {
  if (_ref) {
    _ref.closeDialog(...args);
  }
}
export default withStyles(styles)(SimpleDialog);
