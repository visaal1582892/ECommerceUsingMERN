import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    if (storedAuth && storedIsLoggedIn) {
      setAuth(storedAuth);
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setAuth(userData);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuth(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, auth, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
