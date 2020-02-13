import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container
} from '@material-ui/core/';

import { withStyles } from '@material-ui/core/styles';
 //const API = 'http://localhost:3000/api/v1/users';
const API = 'https://water-plants.herokuapp.com/api/v1/users';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: '10rem',
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    errors: {}
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
        this.props.setUser(json);
        localStorage.setItem('token', json.jwt);
        this.props.history.push('/calendar');
      } else {
        console.log(json)
        this.setState({
          errors: json.errors,
          username: '',
          password: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { classes } = this.props;
    const { username, email, password } = this.state;

    return (
      <Container component='main' maxWidth='xs' className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  value={username}
                  autoComplete='username'
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  value={password}
                  autoComplete='current-password'
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to={'/'}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(SignUp));
