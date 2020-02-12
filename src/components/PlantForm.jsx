import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WithAuth from './withAuth';
import { TextField, Button, Grid } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

// const API = 'http://localhost:3000/api/v1/plants';
const API = 'https://water-plants.herokuapp.com/api/v1/plants';

class PlantForm extends Component {
  state = {
    nick_name: '',
    plant_type: '',
    water_frequency: '',
    first_watered: Date.new,
    notes: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDate = date => {
    this.setState({ first_watered: date });
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
      this.props.history.push('/calendar');
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
      <Grid container direction='column' justify='center' alignItems='center'>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id='outlined-secondary'
            label='Plant Type'
            variant='outlined'
            color='secondary'
            onChange={this.handleChange}
            name='plant_type'
            value={plant_type}
          />
          <TextField
            id='outlined-secondary'
            label='Plant Nickname'
            variant='outlined'
            color='secondary'
            onChange={this.handleChange}
            name='nick_name'
            value={nick_name}
          />
          <TextField
            id='standard-number'
            type='number'
            InputLabelProps={{
              shrink: true
            }}
            label='Water Frequency'
            variant='outlined'
            color='secondary'
            onChange={this.handleChange}
            name='water_frequency'
            value={water_frequency}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date picker inline'
              onChange={this.handleDate}
              value={first_watered}
              name='first_watered'
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            value='Submit'
          >
            Add Plant
          </Button>
        </form>
      </Grid>
    );
  }
}

export default WithAuth(withRouter(PlantForm));
