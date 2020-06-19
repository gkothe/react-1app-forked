import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});
let _ref=null;

class SimpleSnackbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open:false,
      type:"default"
    };
    _ref=this;

    this.OpenSnack = ({message='',type="default"}) => {
      this.setState({ open: true,message,type });
    };


    this.handleClose = (event, reason) => {
      console.log(reason);
      if (reason === 'clickaway') {
        return;
      }

      this.setState({ open: false });
    };
  }

  render() {
    const { classes } = this.props;
    const { message,type } = this.state;

    return ([
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={type}
          message={message}
          />
      </Snackbar>,
    ]
  );
}
}





const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  default: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  default: {

  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: "sans-serif"
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant} = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      {...props}
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
          >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      />
  );
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export function OpenSnack(...args) {
  if (_ref) {
    _ref.OpenSnack(...args);
  }
}


export default withStyles(styles)(SimpleSnackbar);

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'default']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
