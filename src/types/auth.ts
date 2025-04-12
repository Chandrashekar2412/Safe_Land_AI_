export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  phone?: string;
  createdAt?: string;
  isActive?: boolean;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  isSuperAdmin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
} 