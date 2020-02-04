import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Calendar from './components/Calendar';
import LogIn from './components/LogIn';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { tr } from 'date-fns/locale';
const API = 'http://localhost:3000/api/v1/profile';
class App extends Component {
  state = {
    user: {},
    plants: [],
    loggedIn: false,
    isLoading: true
  };

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

      this.setUser(json);
    } catch (error) {
      console.error(error);
    }
  };

  setUser = json => {
    const user = json.user.data.attributes;
    const plants = json.user.included.map(data => data.attributes);
    this.setState({ user, plants, loggedIn: true, isLoading: false });
  };

  logOut = () => {
    localStorage.removeItem('token');
    this.setState({
      user: {},
      plants: [],
      loggedIn: false,
      isLoading: true
    });
    this.props.history.push('/login');
  };

  render() {
    const { loggedIn, plants, isLoading } = this.state;
    return (
      <div>
        {loggedIn ? <NavBar logOut={this.logOut} /> : null}
        <Switch>
          <Route
            path='/login'
            render={() => <LogIn setUser={this.setUser} />}
          />
          <Route
            path='/signup'
            render={() => <SignUp setUser={this.setUser} />}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            isLoading={isLoading}
            path={'/calendar'}
            plants={plants}
            component={Calendar}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
