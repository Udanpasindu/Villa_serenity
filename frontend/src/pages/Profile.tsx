import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Edit2, Save, LogOut } from 'lucide-react'; // Added LogOut to imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally update user profile via API
    // For now, let's just show a success message
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="bg-primary/10 p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User size={40} />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-serif font-semibold">{user.name}</h1>
                  <p className="text-villa-600">Member since {new Date().getFullYear()}</p>
                </div>
                <div className="ml-auto">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Edit2 size={16} className="mr-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} className="mr-2" /> Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Name</label>
                      {isEditing ? (
                        <Input 
                          type="text" 
                          name="name" 
                          value={userData.name} 
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      ) : (
                        <div className="flex items-center gap-2 py-2">
                          <User size={16} className="text-primary" />
                          <span>{userData.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Email</label>
                      {isEditing ? (
                        <Input 
                          type="email" 
                          name="email" 
                          value={userData.email} 
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      ) : (
                        <div className="flex items-center gap-2 py-2">
                          <Mail size={16} className="text-primary" />
                          <span>{userData.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      {isEditing ? (
                        <Input 
                          type="tel" 
                          name="phone" 
                          value={userData.phone} 
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Your phone number"
                        />
                      ) : (
                        <div className="flex items-center gap-2 py-2">
                          <Phone size={16} className="text-primary" />
                          <span>{userData.phone || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Address</label>
                      {isEditing ? (
                        <Input 
                          type="text" 
                          name="address" 
                          value={userData.address} 
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Your address"
                        />
                      ) : (
                        <div className="flex items-center gap-2 py-2">
                          <MapPin size={16} className="text-primary" />
                          <span>{userData.address || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </form>

              <Separator className="my-8" />

              <h2 className="text-xl font-serif mb-4">Booking History</h2>
              {/* This would normally fetch and display the user's booking history */}
              <div className="bg-secondary p-8 rounded-lg text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                <p className="text-villa-600 mb-4">You haven't made any reservations with us yet.</p>
                <Button variant="outline" onClick={() => navigate('/booking')}>
                  Make Your First Booking
                </Button>
              </div>

              <div className="mt-8 text-right">
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
