
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Chat from './Chat';
import routes from '../routes';

const PrivateRoute = () => {
  const { user } = useAuth();

  return (
    user ? (<Chat />) : (<Navigate to={routes.loginPagePath()} />)
  );
};

export default PrivateRoute;