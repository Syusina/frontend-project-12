/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import MainPage from './Components/MainPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import Chat from './Components/Chat.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import AuthContext from './context/AuthContext.jsx';
import useAuth from './hooks/useAuth.jsx';
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

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Войти</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/public">Главная</Nav.Link>
          <Nav.Link as={Link} to="/">Личный кабинет</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>

      <div className="container p-3">
        <h1 className="text-center mt-5 mb-4">Добро пожаловать в чат!</h1>
        <Routes>
          <Route path="/public" element={<MainPage />} />
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
      </div>
    </Router>
  </AuthProvider>
);

export default App;
