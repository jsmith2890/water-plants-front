import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  Calendar,
  Login,
  NavBar,
  ProtectedRoute,
  SignUp,
  PlantForm
} from './components';

class App extends Component {
  state = {
    user: {},
    plants: [],
    loggedIn: false,
    isLoading: true
  };

  setUser = json => {
    const user = {
      id: json.user.data.id,
      username: json.user.data.attributes.username
    };
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
    this.props.history.push('/');
  };

  render() {
    const { loggedIn, plants, isLoading, user } = this.state;
    return (
      <div>
        {loggedIn ? <NavBar logOut={this.logOut} /> : null}
        <Switch>
          <Route
            exact
            path='/'
            render={() => <Login setUser={this.setUser} />}
          />
          <Route
            path='/signup'
            render={() => <SignUp setUser={this.setUser} />}
          />
          <Calendar
            path={'/calendar'}
            plants={plants}
            setUser={this.setUser}
            component={Calendar}
          />
          <PlantForm
            path={'/plants/new'}
            user={user}
            setUser={this.setUser}
            component={PlantForm}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
