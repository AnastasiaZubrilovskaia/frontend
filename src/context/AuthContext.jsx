import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    console.log('AuthContext - Token changed:', token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      console.log('AuthContext - Attempting login');
      const data = await authService.login(credentials);
      console.log('AuthContext - Login successful:', data);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('AuthContext - Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('AuthContext - Attempting registration');
      const data = await authService.register(userData);
      console.log('AuthContext - Registration successful:', data);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('AuthContext - Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthContext - Logging out');
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout
  };

  console.log('AuthContext - Current state:', { user, token });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};