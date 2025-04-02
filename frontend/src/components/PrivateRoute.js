// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
