import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On mount, try to get the user from localStorage
  useEffect(() => {
    const checkAuthOnMount = async () => {
      await checkAuth();
      setLoading(false);
    };
    
    checkAuthOnMount();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setUser(null);
      return false;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data);
        return true;
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Attempting login with:', { email });
      
      // Try to make the request with more detailed error handling
      let response;
      try {
        response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        console.log('Login response status:', response.status);
        
        // Handle different error status codes
        if (response.status === 500) {
          console.error('Server error occurred during login. Please check server logs.');
          throw new Error('Server error occurred. Please try again later or contact support.');
        }
        
        if (!response.ok) {
          // Try to get error details from response
          const errorData = await response.json().catch(() => ({}));
          console.error('Login failed with status:', response.status, errorData);
          throw new Error(errorData.error || `Login failed with status: ${response.status}`);
        }
      } catch (fetchError: any) {
        // Handle network errors or JSON parsing errors
        if (fetchError.message === 'Failed to fetch' || fetchError.name === 'TypeError') {
          console.error('Network error when connecting to server:', fetchError);
          throw new Error('Cannot connect to server. Please check your internet connection.');
        }
        throw fetchError;
      }
      
      // If we got here, we have a successful response
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        
        // Handle different user data formats from the backend
        if (data.user) {
          setUser(data.user);
        } else if (data.data) {
          // If backend returns data in a nested 'data' object
          setUser(data.data);
        } else {
          // If no user data in response, fetch it from /me endpoint
          await fetchUserData(data.token);
        }
        
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
        return true;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to fetch user data after login if not provided
  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      if (userData.success && userData.data) {
        setUser({
          id: userData.data._id,
          name: userData.data.name,
          email: userData.data.email,
          role: userData.data.role
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signup = async (name: string, email: string, password: string, role = 'user'): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast({
          title: 'Registration successful',
          description: `Welcome, ${data.user.name}!`,
        });
        return true;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Could not create account',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
