import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Admin } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  token: string | null;
  adminToken: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  setAdminAuth: (admin: Admin | null, token: string | null) => void;
  logout: () => void;
  adminLogout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for saved auth data on component mount
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        const savedAdmin = localStorage.getItem('admin');
        const savedAdminToken = localStorage.getItem('adminToken');
        
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          // Validate user data structure
          if (parsedUser && parsedUser.id && parsedUser.email) {
            setUser(parsedUser);
            setToken(savedToken);
          } else {
            console.error('Invalid user data structure');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }

        if (savedAdmin && savedAdminToken) {
          const parsedAdmin = JSON.parse(savedAdmin);
          // Validate admin data structure
          if (parsedAdmin && parsedAdmin.id && parsedAdmin.email) {
            setAdmin(parsedAdmin);
            setAdminToken(savedAdminToken);
          } else {
            console.error('Invalid admin data structure');
            localStorage.removeItem('admin');
            localStorage.removeItem('adminToken');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setAuth = (newUser: User | null, newToken: string | null) => {
    try {
      setUser(newUser);
      setToken(newToken);
      
      if (newUser && newToken) {
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error setting auth:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const setAdminAuth = (newAdmin: Admin | null, newToken: string | null) => {
    try {
      setAdmin(newAdmin);
      setAdminToken(newToken);
      
      if (newAdmin && newToken) {
        localStorage.setItem('admin', JSON.stringify(newAdmin));
        localStorage.setItem('adminToken', newToken);
      } else {
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Error setting admin auth:', error);
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const adminLogout = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const value = {
    user,
    admin,
    token,
    adminToken,
    setAuth,
    setAdminAuth,
    logout,
    adminLogout,
    isAuthenticated: !!user,
    isAdmin: !!admin,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 