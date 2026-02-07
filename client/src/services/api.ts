// Base API configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Custom API Error class with status code
export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// Get user-friendly error message based on status code
const getErrorMessage = (status: number, serverMessage?: string): { message: string; code: string } => {
  switch (status) {
    case 400:
      return {
        message: serverMessage || 'Invalid request. Please check your input and try again.',
        code: 'BAD_REQUEST'
      };
    case 401:
      return {
        message: serverMessage || 'Invalid email or password. Please try again.',
        code: 'UNAUTHORIZED'
      };
    case 403:
      return {
        message: 'Access denied. You do not have permission to perform this action.',
        code: 'FORBIDDEN'
      };
    case 404:
      return {
        message: serverMessage || 'The requested resource was not found.',
        code: 'NOT_FOUND'
      };
    case 409:
      return {
        message: serverMessage || 'This email is already registered. Please use a different email or login.',
        code: 'CONFLICT'
      };
    case 422:
      return {
        message: serverMessage || 'Invalid data provided. Please check your input.',
        code: 'VALIDATION_ERROR'
      };
    case 429:
      return {
        message: 'Too many attempts. Please wait a moment and try again.',
        code: 'RATE_LIMITED'
      };
    case 500:
      return {
        message: 'Server error. Please try again later.',
        code: 'SERVER_ERROR'
      };
    case 502:
    case 503:
    case 504:
      return {
        message: 'Service temporarily unavailable. Please try again later.',
        code: 'SERVICE_UNAVAILABLE'
      };
    default:
      return {
        message: serverMessage || 'An unexpected error occurred. Please try again.',
        code: 'UNKNOWN_ERROR'
      };
  }
};

// Simple fetch wrapper for API calls
const api = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // Get token from cookie
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

    const token = getCookie('authToken');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const serverMessage = errorData.message || errorData.error;
        const { message, code } = getErrorMessage(response.status, serverMessage);
        throw new ApiError(message, response.status, code);
      }

      return await response.json() as T;
    } catch (error) {
      // Re-throw ApiError as-is
      if (error instanceof ApiError) {
        console.error('API Error:', error.code, error.message);
        throw error;
      }

      // Network failure - couldn't reach the server (covers all network errors)
      console.error('Network Error:', error);
      throw new ApiError(
        'Unable to connect to the server. Please check your internet connection and try again.',
        0,
        'NETWORK_ERROR'
      );
    }
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },
};

export default api;
