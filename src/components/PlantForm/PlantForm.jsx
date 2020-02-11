import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WithAuth from '../withAuth';

// const API = 'http://localhost:3000/api/v1/plants';
const API = 'https://water-plants.herokuapp.com/api/v1/plants';

class PlantForm extends Component {
  state = {
    nick_name: '',
    plant_type: '',
    water_frequency: '',
    first_watered: '',
    notes: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const {
      nick_name,
      plant_type,
      water_frequency,
      first_watered
    } = this.state;

    const token = localStorage.getItem('token');
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        plant: {
          nick_name,
          plant_type,
          water_frequency,
          first_watered,
          user_id: this.props.user.id
        }
      })
    };
    try {
      const response = await fetch(API, reqObj);
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      nick_name,
      plant_type,
      water_frequency,
      first_watered
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Plant Type
            <input
              onChange={this.handleChange}
              type='text'
              name='plant_type'
              value={plant_type}
            />
          </label>
          <label>
            Plant Nickname
            <input
              onChange={this.handleChange}
              type='input'
              name='nick_name'
              value={nick_name}
            />
          </label>
          <label>
            Water Frequency
            <input
              onChange={this.handleChange}
              type='input'
              name='water_frequency'
              value={water_frequency}
            />
          </label>
          <label>
            First Watered
            <input
              onChange={this.handleChange}
              type='input'
              name='first_watered'
              value={first_watered}
            />
          </label>
          <button type='submit' value='Submit'>
            Add Plant
          </button>
        </form>
      </div>
    );
  }
}

export default WithAuth(withRouter(PlantForm));
