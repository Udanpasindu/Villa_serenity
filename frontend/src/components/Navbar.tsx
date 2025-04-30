import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-serif text-xl font-semibold">
            Villa Serenity
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  Welcome, {user.name || 'Guest'}
                </span>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1 text-villa-600 hover:text-villa-800 hover:bg-secondary/50"
                  onClick={logout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login" className="text-sm text-villa-600 hover:text-villa-800 px-3 py-1 rounded-md hover:bg-secondary/50 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;