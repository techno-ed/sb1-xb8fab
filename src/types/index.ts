export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  points: number;
  email: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  imageUrl: string;
  description: string;
  experience: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}