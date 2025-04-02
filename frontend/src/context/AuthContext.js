import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Al cargar la app, verificar si hay usuario en localStorage
  // Puedes inicializar el estado a partir de localStorage si ya existe un token
 
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if(savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

  
};

export function useAuth() {
  return useContext(AuthContext);
}