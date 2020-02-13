import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from './withAuth';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Container } from '@material-ui/core/';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

// const API = 'http://localhost:3000/api/v1/plants';
const API = 'https://water-plants.herokuapp.com/api/v1/plants';

const styles = theme => ({
  root: {
    height: '100vh'
  },
  container: {
    topPadding: '15rem'
  },
  paper: {
    marginTop: theme.spacing(8),
  },
  // button: {
  //   width: 150,
  //   height: 50
  // }
});

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

  handleDateChange = date => {
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
    const { classes } = this.props;
    const {
      nick_name,
      plant_type,
      water_frequency,
      first_watered
    } = this.state;

    return (
      <Container component='main' maxWidth='s' className={classes.container}>
        <div className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <Grid
              container
              direction='column'
              spacing={2}
              justify='space-evenly'
              alignItems='center'
            >
              <Grid item xs={12}>
                <TextField
                  id='outlined-secondary'
                  label='Plant Type'
                  variant='outlined'
                  color='secondary'
                  onChange={this.handleChange}
                  name='plant_type'
                  value={plant_type}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='outlined-secondary'
                  label='Plant Nickname'
                  variant='outlined'
                  color='secondary'
                  onChange={this.handleChange}
                  name='nick_name'
                  value={nick_name}
                />
              </Grid>
              <Grid item>
                <TextField
                  id='standard-number'
                  type='number'
                  InputLabelProps={{
                    shrink: true
                  }}
                  label='Water Frequency in days'
                  variant='outlined'
                  color='secondary'
                  onChange={this.handleChange}
                  name='water_frequency'
                  value={water_frequency}
                />
              </Grid>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Date picker inline'
                    onChange={this.handleDateChange}
                    value={first_watered}
                    name='first_watered'
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  type='submit'
                  value='Submit'
                >
                  Add Plant
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withAuth(withRouter(withStyles(styles)(PlantForm)));
