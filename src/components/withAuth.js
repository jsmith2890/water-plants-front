import React, { Component } from 'react';
// const API = 'http://localhost:3000/api/v1/profile';
const API = 'https://water-plants.herokuapp.com/api/v1/profile';

export default function WithAuth(WrappedComponent) {
  return class Auth extends Component {
    componentDidMount() {
      const token = localStorage.getItem('token');
      if (token) this.fetchCurrentUser(token);
    }

    fetchCurrentUser = async token => {
      try {
        const response = await fetch(API, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const json = await response.json();
        this.props.setUser(json);
      } catch (error) {
        console.error(error);
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
