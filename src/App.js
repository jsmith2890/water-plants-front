import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import {
  Calendar,
  Login,
  NavBar,
  ProtectedRoute,
  SignUp,
  PlantForm
} from './components';
const API = 'http://localhost:3000/api/v1/profile';
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
    console.log(json);
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
    const { loggedIn, plants, isLoading, user } = this.state;
    return (
      <div>
        {loggedIn ? <NavBar logOut={this.logOut} /> : null}
        <Switch>
          <Route
            path='/login'
            render={() => <Login setUser={this.setUser} />}
          />
          <Route path='/signup' render={() => <SignUp />} />
          <ProtectedRoute
            loggedIn={loggedIn}
            isLoading={isLoading}
            path={'/calendar'}
            plants={plants}
            setUser={this.setUser}
            component={Calendar}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            isLoading={isLoading}
            path={'/plant/new'}
            user={user}
            component={PlantForm}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
