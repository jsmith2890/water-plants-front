import React, { Component } from 'react';
const API = 'http://localhost:3000/api/v1/users/';

class LogIn extends Component {
  state = {
    username: ''
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type='text'
          name='username'
          value={this.state.username}
        />
        <button type='submit' value='Submit'>
          Submit
        </button>
      </form>
    );
  }
}

export default LogIn;
