// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set axios default headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app load
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me');
          if (res.data.success) {
            setCurrentUser(res.data.user);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (err) {
          console.error('Error loading user:', err);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setCurrentUser(res.data.user);
        return res.data.user;
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Get a friendly error message from the response if available
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message || 'Login failed';
        
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);

    // Force navigation to home page
    window.location.href = '/';
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setCurrentUser(res.data.user);
        return res.data.user;
      } else {
        throw new Error(res.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err);
      
      // Format the error message to be more user-friendly
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message || 'Registration failed';
        
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};