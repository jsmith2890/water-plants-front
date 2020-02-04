import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './login.scss';
const API = 'http://localhost:3000/api/v1/login';

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
        console.log('tight');
        this.setState({ username: '', password: '' });
        this.props.setUser(json);
        localStorage.setItem('token', json.jwt);
        this.props.history.push('/calendar');
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className='login-container'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              required
              onChange={this.handleChange}
              type='text'
              name='username'
              value={username}
            />
          </label>
          <label>
            Password
            <input
              required
              onChange={this.handleChange}
              type='password'
              name='password'
              value={password}
            />
          </label>
          <button type='submit' value='Submit'>
            Log In
          </button>
          <Link to={'/signup'}>Need an account?</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
