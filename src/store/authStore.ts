import create from 'zustand';
import axios from 'axios';
import { AuthState } from '../types';

const API_URL = 'http://localhost:3000/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));