import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Comp,
  loggedIn,
  isLoading,
  path,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn || isLoading ? (
          <Comp {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

