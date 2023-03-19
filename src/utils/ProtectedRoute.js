import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from 'context/auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/auth/login' />
      }
    />
  );
};

export default ProtectedRoute;
