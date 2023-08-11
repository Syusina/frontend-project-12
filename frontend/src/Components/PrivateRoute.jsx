
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { propTypes } from 'react-bootstrap/esm/Image';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  children: propTypes.node,
};

export default PrivateRoute;