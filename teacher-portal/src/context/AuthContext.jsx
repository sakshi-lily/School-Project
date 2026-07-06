import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('teacher_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        if (response.data.success && response.data.user.role === 'teacher') {
          setUser(response.data.user);
        } else {
          // Logout if not teacher role
          logout();
        }
      } catch (err) {
        console.error('Teacher session validation failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: userToken, user: userData } = response.data;

      if (userData.role !== 'teacher') {
        throw new Error('Access denied. This portal is reserved for teachers.');
      }

      localStorage.setItem('teacher_token', userToken);
      setToken(userToken);
      setUser(userData);
      return true;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errMsg);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('teacher_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
