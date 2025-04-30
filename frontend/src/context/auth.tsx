import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  address: string;
  phone: string;
  email: string;
  id: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Using a real API call would be better in production
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Create a proper user object with all required fields
        const userObj = {
          id: data.user?.id || '123',
          name: data.user?.name || email.split('@')[0], // Use part of email as name if not provided
          email,
          role: data.user?.role || 'user',
          address: data.user?.address || '',
          phone: data.user?.phone || '',
        };
        
        // Update state first
        setUser(userObj);
        
        // Then store in localStorage
        localStorage.setItem('user', JSON.stringify(userObj));
        
        return true;
      }
      
      // Fallback to mock for development if API fails
      const mockUser = { 
        id: '123', 
        name: 'Test User', 
        email, 
        role: 'user' as const, 
        address: '', 
        phone: '' 
      };
      
      // Update state first
      setUser(mockUser);
      
      // Then store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (err) {
      setError('Failed to login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const mockUser = { id: '123', name, email, role: 'user' as const, address: '', phone: '' };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (err) {
      setError('Failed to sign up');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
