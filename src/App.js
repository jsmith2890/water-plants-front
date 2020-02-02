import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import LogIn from './components/LogIn'
const API = 'http://localhost:3000/api/v1/users/1';
class App extends Component {
  state = {
    user: {},
    plants: []
  };

 
  async componentDidMount() {
    const response = await fetch(API);
    const json = await response.json();
    const user = json.data.attributes;
    const plants = json.included.map(data => data.attributes);
    this.setState({ user, plants });
  }

  render() {
    
    return (
      <div>
        <Switch>
          <Route
            exact
            path='/login'
            render={() => <LogIn />}
          />
          <Route
          exact
          path='/calendar'
          render={() => <Calendar plants={this.state.plants} />}
        />

        </Switch>
      </div>
    );
  }
}

export default App;
