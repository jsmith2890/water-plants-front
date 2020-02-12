import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography
} from '@material-ui/core/';

// const API = 'http://localhost:3000/api/v1/login';
const API = 'https://water-plants.herokuapp.com/api/v1/login';

const styles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const user = this.state;
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user })
    };
    try {
      const response = await fetch(API, reqObj);
      const json = await response.json();
      if (json.user) {
        this.setState({ username: '', password: '' });
        this.props.setUser(json);
        localStorage.setItem('token', json.jwt);
        this.props.history.push('/calendar');
      }
      if (json.error) json.alert(json.error);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;
    return (
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                onChange={this.handleChange}
                value={username}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.handleChange}
                value={password}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to={'/signup'} variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
