// Authentication service
// API calls for login, register, logout

import { jwtDecode } from 'jwt-decode';
import api from './api';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

/**
 * Set a cookie
 * @param {string} name 
 * @param {string} value 
 * @param {number} days - expiration in days
 */
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

/**
 * Get a cookie by name
 * @param {string} name 
 * @returns {string|null}
 */
const getCookie = (name) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Delete a cookie
 * @param {string} name 
 */
const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Decode JWT token and extract user data
 * @param {string} token 
 * @returns {object|null}
 */
const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {object} decoded 
 * @returns {boolean}
 */
const isTokenExpired = (decoded) => {
  if (!decoded || !decoded.exp) return true;
  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp * 1000 < Date.now();
};

/**
 * Extract user object from decoded token
 * @param {object} decoded 
 * @returns {object}
 */
const getUserFromToken = (decoded) => {
  return {
    id: decoded.sub || decoded.id || decoded.userId || '',
    email: decoded.email || '',
    name: decoded.name || decoded.username || '',
    role: decoded.role || 'customer',
  };
};

export const authService = {
  /**
   * Login user with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{user: object, token: string}>}
   */
  async login(email, password) {
    // Call the real /auth/login API
    const response = await api.post('auth/login', { email, password });

    // Store token in cookie
    if (response.token) {
      setCookie(AUTH_TOKEN_KEY, response.token, 7); // 7 days expiration

      // Decode token to get user data
      const decoded = decodeToken(response.token);
      if (decoded) {
        const user = getUserFromToken(decoded);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
        return { token: response.token, user };
      }
    }

    // Fallback if user data is provided directly in response
    if (response.user) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
      return response;
    }

    throw new Error('Invalid response from server');
  },

  /**
   * Register new user
   * @param {object} userData 
   * @returns {Promise<object>}
   */
  async register(userData) {
    return await api.post('/register', userData);
  },

  /**
   * Logout current user
   */
  logout() {
    deleteCookie(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  /**
   * Get stored user data from token
   * @returns {object|null}
   */
  getStoredUser() {
    const token = this.getToken();

    if (token) {
      const decoded = decodeToken(token);

      // Check if token is valid and not expired
      if (decoded && !isTokenExpired(decoded)) {
        return getUserFromToken(decoded);
      }

      // Token expired or invalid, clear storage
      this.logout();
      return null;
    }

    return null;
  },

  /**
   * Get stored auth token
   * @returns {string|null}
   */
  getToken() {
    return getCookie(AUTH_TOKEN_KEY);
  },

  /**
   * Check if user is authenticated (has valid, non-expired token)
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    const decoded = decodeToken(token);
    return decoded && !isTokenExpired(decoded);
  },

  /**
   * Get user role from token
   * @returns {string|null}
   */
  getUserRole() {
    const user = this.getStoredUser();
    return user?.role || null;
  },

  /**
   * Forgot password - send reset email
   * @param {string} email 
   * @returns {Promise<object>}
   */
  async forgotPassword(email) {
    return await api.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   * @param {string} token 
   * @param {string} newPassword 
   * @returns {Promise<object>}
   */
  async resetPassword(token, newPassword) {
    return await api.post('/auth/reset-password', { token, newPassword });
  },
};

export default authService;
