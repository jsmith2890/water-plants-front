import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavBar({ logOut }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Water-Plants
          </Typography>
          <Button component={Link} to='/plants/new' color='inherit'>
            Add Plant
          </Button>
          <Button component={Link} to='/calendar' color='inherit'>
            Water Schedule
          </Button>
          <Button color='inherit' onClick={logOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
