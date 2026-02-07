// Authentication service
// API calls for login, register, logout

import { jwtDecode } from 'jwt-decode';
import type { User, RegisterData } from '../types/user';
import api from './api';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

/**
 * Set a cookie
 */
const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

/**
 * Get a cookie by name
 */
const getCookie = (name: string): string | null => {
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
 */
const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

interface DecodedToken {
  sub?: string;
  id?: string;
  userId?: string;
  email?: string;
  name?: string;
  username?: string;
  role?: 'customer' | 'agent';
  customerId?: string;
  exp?: number;
  iat?: number;
}

/**
 * Decode JWT token and extract user data
 */
const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 */
const isTokenExpired = (decoded: DecodedToken): boolean => {
  if (!decoded || !decoded.exp) return true;
  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp * 1000 < Date.now();
};

/**
 * Extract user object from decoded token
 */
const getUserFromToken = (decoded: DecodedToken): User => {
  return {
    id: decoded.sub || decoded.id || decoded.userId || '',
    email: decoded.email || '',
    name: decoded.name || decoded.username || '',
    role: decoded.role || 'customer',
    customerId: decoded.customerId,
  };
};

interface LoginResponse {
  token: string;
  role?: 'customer' | 'agent';
  customerId?: string;
  user?: User;
}

export const authService = {
  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    // Call the real /auth/login API
    const response = await api.post<LoginResponse>('auth/login', { email, password });

    // Store token in cookie
    if (response.token) {
      setCookie(AUTH_TOKEN_KEY, response.token, 7); // 7 days expiration

      // Decode token to get user data
      const decoded = decodeToken(response.token);
      if (decoded) {
        // Merge response data with decoded token data
        const user: User = {
          ...getUserFromToken(decoded),
          role: response.role || decoded.role || 'customer',
          customerId: response.customerId || decoded.customerId,
        };
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
   */
  async register(userData: RegisterData): Promise<unknown> {
    return await api.post('/register', userData);
  },

  /**
   * Logout current user
   */
  logout(): void {
    deleteCookie(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  /**
   * Get stored user data from token
   */
  getStoredUser(): User | null {
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
   */
  getToken(): string | null {
    return getCookie(AUTH_TOKEN_KEY);
  },

  /**
   * Check if user is authenticated (has valid, non-expired token)
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = decodeToken(token);
    return decoded !== null && !isTokenExpired(decoded);
  },

  /**
   * Get user role from token
   */
  getUserRole(): 'customer' | 'agent' | null {
    const user = this.getStoredUser();
    return user?.role || null;
  },

  /**
   * Forgot password - send reset email
   */
  async forgotPassword(email: string): Promise<unknown> {
    return await api.post('/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<unknown> {
    return await api.post('/reset-password', { token, newPassword });
  },
};

export default authService;
