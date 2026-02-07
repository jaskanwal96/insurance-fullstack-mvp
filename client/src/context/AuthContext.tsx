// Authentication context provider
// Manages user authentication state

import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, RegisterData, LoginResult, RegisterResult, AuthContextType } from '../types/user';
import authService from '../services/authService';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const token = authService.getToken();

    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);

      setUser(response.user ?? null);
      setIsAuthenticated(true);

      return { success: true, user: response.user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const register = useCallback(async (userData: RegisterData): Promise<RegisterResult> => {
    try {
      setIsLoading(true);
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserRole = useCallback((): 'customer' | 'agent' | null => {
    return user?.role ?? null;
  }, [user]);

  const hasRole = useCallback((role: string): boolean => {
    return user?.role === role;
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    getUserRole,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
