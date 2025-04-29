import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';

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
              <button onClick={logout} className="text-sm text-villa-600 hover:text-villa-800">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-sm text-villa-600 hover:text-villa-800">
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