import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image.js';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData || null);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node,
};

export default AuthProvider;