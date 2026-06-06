import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('hotel_token');
    const user = localStorage.getItem('hotel_user');
    return token && user ? { token, user: JSON.parse(user) } : { token: null, user: null };
  });

  const login = (token, user) => {
    localStorage.setItem('hotel_token', token);
    localStorage.setItem('hotel_user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('hotel_token');
    localStorage.removeItem('hotel_user');
    setAuth({ token: null, user: null });
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};
