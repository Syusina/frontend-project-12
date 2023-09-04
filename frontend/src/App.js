/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './Components/LoginPage.jsx';
import Navigation from './Components/Navigation.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import SignUp from './Components/SignUp.jsx';
import routes from './routes.js';

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <Navigation />
        <Routes>
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignUp />} />
          <Route path={routes.chatPagePath()} element={(<PrivateRoute />)} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
    <div className="Toastify"><ToastContainer /></div>
  </AuthProvider>
);

export default App;
