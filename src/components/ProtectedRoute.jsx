import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Comp,
  loggedIn,
  isLoading,
  path,
  ...rest
}) => {
  console.log(loggedIn);
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

// const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
//   return (
//     <Route
//       path={path}
//       {...rest}
//       render={props => {
//         return loggedIn ? (
//           <Comp {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: {
//                 prevLocation: path,
//                 error: 'You need to login first!'
//               }
//             }}
//           />
//         );
//       }}
//     />
//   );
// };
