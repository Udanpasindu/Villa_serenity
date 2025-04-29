import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Hotel, Users, CalendarCheck, TrendingUp,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    revenueThisMonth: 0,
    bookedRoomsPercentage: 0,
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      // In a real app, we would fetch these stats from the API
      // For now, let's simulate some data
      setTimeout(() => {
        setStats({
          totalRooms: 12,
          totalUsers: 85,
          totalBookings: 47,
          pendingBookings: 3,
          revenueThisMonth: 28750,
          bookedRoomsPercentage: 75,
        });
        setLoading(false);
      }, 800);
    };
    
    fetchStats();
  }, []);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's an overview of your hotel stats.</p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="w-24 h-6 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="w-16 h-8 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <Hotel className="mr-2 text-primary h-5 w-5" /> Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalRooms}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="flex items-center text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" /> {stats.bookedRoomsPercentage}% booked
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <Users className="mr-2 text-primary h-5 w-5" /> Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="flex items-center text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" /> 12% this month
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <CalendarCheck className="mr-2 text-primary h-5 w-5" /> Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalBookings}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className={`flex items-center ${stats.pendingBookings > 0 ? "text-amber-500" : "text-green-600"}`}>
                    {stats.pendingBookings > 0 ? (
                      <>
                        <ArrowUpRight className="h-4 w-4 mr-1" /> {stats.pendingBookings} pending
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-4 w-4 mr-1" /> None pending
                      </>
                    )}
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <TrendingUp className="mr-2 text-primary h-5 w-5" /> Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${stats.revenueThisMonth.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="flex items-center text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" /> 8% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest bookings and user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 p-2 bg-primary/10 rounded-full">
                    <CalendarCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">New booking: Deluxe Ocean Suite</p>
                    <p className="text-sm text-muted-foreground">John Smith booked for Jun 15-18, 2024</p>
                    <p className="text-xs text-muted-foreground">10 mins ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-2 bg-primary/10 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">New user registration</p>
                    <p className="text-sm text-muted-foreground">Emma Johnson created an account</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-2 bg-primary/10 rounded-full">
                    <CalendarCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Booking modified: Garden Villa</p>
                    <p className="text-sm text-muted-foreground">Michael Davis changed dates to Jul 22-26, 2024</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminHome;
