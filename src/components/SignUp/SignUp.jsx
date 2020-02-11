import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './signup.scss';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography
} from '@material-ui/core/';

import { withStyles } from '@material-ui/core/styles';
// const API = 'http://localhost:3000/api/v1/users';
const API = 'https://water-plants.herokuapp.com/api/v1/users';

const styles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
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

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: '' });
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
      } else {
        this.setState({ errors: json.errors, username: '', password: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   render() {
  //     const { username, password, errors } = this.state;
  //     return (
  //       <div className='sign-up-container'>
  //         <form onSubmit={this.handleSubmit}>
  //           <label>
  //             Username
  //             <input
  //               onChange={this.handleChange}
  //               type='text'
  //               name='username'
  //               value={username}
  //             />
  //           </label>
  //           {errors.username && !username ? (
  //             <div>Username {errors.username[0]}</div>
  //           ) : null}
  //           <label>
  //             Password
  //             <input
  //               onChange={this.handleChange}
  //               type='password'
  //               name='password'
  //               value={this.state.password}
  //             />
  //           </label>
  //           {errors.password && !password ? (
  //             <div>Password {errors.password[0]}</div>
  //           ) : null}
  //           <button type='submit' value='Submit'>
  //             Sign Up
  //           </button>
  //           <Link to={'/login'}>Have an account?</Link>
  //         </form>
  //       </div>
  //     );
  //   }
  // }

  // export default withRouter(SignUp);

  render() {
    const { classes } = this.props;
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
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
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
                  <Link href='#' variant='body2'>
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

export default withRouter(withStyles(styles)(SignUp));
