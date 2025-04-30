import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth'; // Changed to use context/auth instead of hooks/use-auth
import { toast } from '@/hooks/use-toast'; // Add toast for better error feedback

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path if coming from a protected route
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the backend API directly for more reliable behavior
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store token
        localStorage.setItem('token', data.token);
        
        // If the data includes user info, store it
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Use login from context to ensure state is updated
        await login(email, password);
        
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
        
        // Navigate only after login is processed
        navigate(from);
      } else {
        setError(data.error || 'Login failed');
        toast({
          title: 'Login failed',
          description: data.error || 'Invalid credentials',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Server connection error. Please try again later.');
      toast({
        title: 'Login error',
        description: 'Could not connect to server',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <h1 className="text-3xl font-serif font-semibold mb-6 text-center">Login</h1>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-villa-600">Don't have an account? </span>
          <Link to="/signup" className="text-sm text-primary hover:text-primary/90">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
