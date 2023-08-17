/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider } from 'react-redux';
import LoginPage from './Components/LoginPage.jsx';
import Chat from './Components/Chat.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AuthButton from './Components/AuthButton.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import store from './slices/index.js';

const App = () => (
  <AuthProvider>
    <Provider store={store}>
      <div className="d-flex flex-column h-100">
        <Router>
          <Navbar bg="white" expand="lg" className="shadow-sm">
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
      </div>
    </Provider>
  </AuthProvider>
);

export default App;
