import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const Navigation = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const handlerClick = () => {
    logOut();
    navigate(routes.chatPagePath());
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Nav.Link as={Link} to="/" className="navbar-brand">Hexlet Chat</Nav.Link>
        {user ? <Button type="button" className="btn btn-primary" onClick={handlerClick}>Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Navigation;