// User type definitions

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'agent';
  customerId?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'agent';
}

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface RegisterResult {
  success: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<RegisterResult>;
  getUserRole: () => 'customer' | 'agent' | null;
  hasRole: (role: string) => boolean;
}
