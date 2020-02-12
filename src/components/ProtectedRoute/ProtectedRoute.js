import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Comp,
  loggedIn,
  isLoading,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Comp {...props} {...rest} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
);

export default ProtectedRoute;

