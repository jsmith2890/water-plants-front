import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Comp,
  loggedIn,
  isLoading,
  path,
  ...rest
}) => {
  console.log(loggedIn, 'ifda')
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Comp {...props} {...rest} />
        ) : (
          <Redirect
            // to={{ pathname: '/login', state: { from: props.location } }}
            push to='/login'
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

