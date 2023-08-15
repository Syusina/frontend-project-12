
import React from 'react';
import useAuth from '../hooks/useAuth';
import Chat from './Chat';
import LoginPage from './LoginPage';

const PrivateRoute = () => {
  const { user } = useAuth();

  return (
    user ? (<Chat />) : (<LoginPage />)
  );
};

export default PrivateRoute;