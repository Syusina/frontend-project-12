import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Войти</Button>
  );
};

export default AuthButton;