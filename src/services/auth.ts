import { toast } from "@/components/ui/use-toast";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organization?: string;
  role?: string;
  secretKey?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    organization?: string;
    role?: string;
  };
  token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || 'Registration failed');
  }

  return response.json();
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    console.log('Attempting login with email:', data.email);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Login response status:', response.status);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Login error:', error);
      throw new Error(error.message || error.error || 'Login failed');
    }

    const result = await response.json();
    console.log('Login successful, storing token');
    
    // Store the token in localStorage
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters and include a number and symbol
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasNumber && hasSymbol;
}; 