import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './login.scss';
const API = 'http://localhost:3000/api/v1/login';

class LogIn extends Component {
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
        console.log('tight');
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

  render() {
    const { username, password, errors } = this.state;
    return (
      <div className='login-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              onChange={this.handleChange}
              type='text'
              name='username'
              value={username}
            />
          </label>
          {errors.username && !username ? (
            <div>Username {errors.username[0]}</div>
          ) : null}
          <label>
            Password
            <input
              onChange={this.handleChange}
              type='password'
              name='password'
              value={this.state.password}
            />
          </label>
          {errors.password && !password ? (
            <div>Password {errors.password[0]}</div>
          ) : null}
          <button type='submit' value='Submit'>
            Sign Up
          </button>
        </form>
        <Link to={'/signup'}>Need an account?</Link>
      </div>
    );
  }
}

export default withRouter(LogIn);
