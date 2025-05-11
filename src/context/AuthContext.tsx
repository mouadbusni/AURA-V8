import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email === 'admin@aura.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@aura.com',
          role: 'admin' as const,
          phone: '',
          addresses: [],
          orders: []
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else if (email && password) {
        const customerUser = {
          id: '2',
          name: 'Customer',
          email,
          role: 'customer' as const,
          phone: '',
          addresses: [],
          orders: []
        };
        setUser(customerUser);
        localStorage.setItem('user', JSON.stringify(customerUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'customer' as const,
        phone: '',
        addresses: [],
        orders: []
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated,
        isAdmin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};