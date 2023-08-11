/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LoginPage from './Components/LoginPage.jsx';
import Chat from './Components/Chat.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AuthContext from './context/AuthContext.jsx';
import AuthButton from './Components/AuthButton.jsx';
import { propTypes } from 'react-bootstrap/esm/Image.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node,
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Hexlet Chat</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
        </Routes>
    </Router>
  </AuthProvider>
);

export default App;
