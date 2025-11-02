import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Customer' | 'Admin' | 'Chef';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  register: (name: string, email: string, phone: string, password: string, role: string) => Promise<{ error: string | null }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const bcrypt = await import('bcryptjs');

      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (fetchError || !users) {
        return { user: null, error: 'Invalid email or password' };
      }

      const isValidPassword = await bcrypt.compare(password, users.password);

      if (!isValidPassword) {
        return { user: null, error: 'Invalid email or password' };
      }

      const userData: User = {
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return { user: userData, error: null };
    } catch (error) {
      return { user: null, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (name: string, email: string, phone: string, password: string, role: string) => {
    try {
      const bcrypt = await import('bcryptjs');

      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        return { error: 'Email already registered' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            name,
            email,
            phone,
            password: hashedPassword,
            role,
          },
        ]);

      if (insertError) {
        return { error: 'Registration failed. Please try again.' };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
