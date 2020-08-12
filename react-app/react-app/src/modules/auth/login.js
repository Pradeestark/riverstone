import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import API from '../../api/api';
import { isLoggedIn, redirectToDashboard } from './action';
import LocalStorageServices from '../../services/localStorageService';
import CircularLoader from '../../uiComponents/progress';

const styles = theme => ({
  root: {
    fontFamily: 'Roboto',
    fontWeight: 'normel'
  },
  body: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5)
  },
  paper: {
    padding: theme.spacing(3, 2),
    width: '400px',
    height: '300px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
    // box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12);
  },
  logo: {
    justifyContent: 'center',
    display: 'flex',
    borderRadius: '7px'
  },
  form: {
    margin: 'auto',
    position: 'absolute'
  },
  field: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
    width: 300,
    display: 'flex'
  },
  loginButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(18)
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      loader: true
    };
  }

  componentWillMount() {
    if (isLoggedIn()) redirectToDashboard(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) === JSON.stringify(this.props);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loader: false }));
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  afterLoginSetUserData = res => {
    try {
      window.location.reload();
      setTimeout(() => {
        this.setState({ loader: false });
        redirectToDashboard(this.props);
      }, 1000);
    } catch (err) {
      console.log('afterLoginSetUserData', err);
    }
  };

  handleLogin = () => {
    const { username, password } = this.state;
    this.setState({ loader: true });

    API.post(`user/login`, {
      email : username,
      password
    })
      .then(res => {
        const { accessToken, username } = res.data.data;
        LocalStorageServices.setAccessToken(accessToken);
        LocalStorageServices.setUserDetails(username);
        this.afterLoginSetUserData(res);
      })
      .catch(err => {
        console.log("sdfs",err)
        this.setState({ loader: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { username, password, loader } = this.state;

    return (
      <div className={classes.root}>
        {loader ? (
          <div className={classes.paper}>
            <CircularLoader />
          </div>
        ) : (
          <Paper className={classes.paper} elevation={10}>
            <div className={classes.form}>
              <ValidatorForm
                onSubmit={this.handleLogin}
                autoComplete="off"
                noValidate
              >
                <TextValidator
                  id="username"
                  label="Username"
                  placeholder="Username"
                  className={classes.field}
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  margin="normal"
                  validators={['required']}
                  errorMessages={['User Name is required']}
                />
                <TextValidator
                  id="password"
                  label="Password"
                  placeholder="Password"
                  className={classes.field}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  validators={['required']}
                  errorMessages={['Password  is required']}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className={classes.loginButton}
                >
                  Login
                </Button>
              </ValidatorForm>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(Login);