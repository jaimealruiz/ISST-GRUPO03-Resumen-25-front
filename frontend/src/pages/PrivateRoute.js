// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(useAuth);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated
          ? <Component {...props} />
          : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
