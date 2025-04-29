import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { 
  Home, Hotel, CalendarCheck, Users, Settings, LogOut,
  Menu, X, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is admin
    if (!user) {
      // If not authenticated, redirect to login
      navigate('/login', { state: { from: location } });
    } else if (user.role !== 'admin') {
      // If authenticated but not admin, redirect to home
      navigate('/');
    }
  }, [user, navigate, location]);
  
  // If user is not admin, show loading
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }
  
  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: <Home className="w-5 h-5" /> },
    { name: 'Room Management', path: '/admin/rooms', icon: <Hotel className="w-5 h-5" /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck className="w-5 h-5" /> },
    { name: 'User Management', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  const isActiveLink = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className={`bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} hidden md:block`}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between h-16 px-4">
              {sidebarOpen && (
                <Link to="/" className="font-serif text-xl font-semibold text-primary">
                  Villa Serenity
                </Link>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`${sidebarOpen ? 'ml-auto' : 'mx-auto'} p-2 rounded-md hover:bg-gray-100`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
            <Separator />
            <div className="mt-6 px-3 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                    isActiveLink(link.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {sidebarOpen && <span>{link.name}</span>}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="p-4">
            <Button 
              variant="ghost" 
              className={`${sidebarOpen ? 'w-full' : 'w-auto mx-auto'} justify-start text-red-500 hover:text-red-600 hover:bg-red-50`}
              onClick={logout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-serif text-xl font-semibold text-primary">
            Villa Serenity
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-2 py-3 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                    isActiveLink(link.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} pt-16 md:pt-0 transition-all duration-300`}>
        <div className="py-6 px-4 sm:px-6 md:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
