import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

type BookingDetails = {
  _id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  guests: {
    adults: number;
    children: number;
  };
  room: {
    name: string;
    price: number;
    images: string[];
  };
  createdAt: string;
};

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setBooking(data.data);
        } else {
          setError(data.error || "Failed to load booking details");
        }
      } catch (err) {
        setError("An error occurred while fetching booking details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-serif mb-4">Error Loading Booking</h1>
        <p className="text-villa-700 mb-6">{error || "Booking not found"}</p>
        <Button asChild>
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    );
  }

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <main className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-semibold">Booking Confirmed!</h1>
            <p className="text-villa-700 mt-2">
              Your reservation at Villa Serenity has been confirmed.
            </p>
            <div className="mt-2 text-sm text-villa-600">
              Booking Reference: #{booking._id.substring(booking._id.length - 8).toUpperCase()}
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-lg mb-8">
            <h2 className="font-serif text-xl mb-4">Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Check-in</h3>
                  <p>{format(checkInDate, "EEEE, MMMM d, yyyy")}</p>
                  <p className="text-sm text-villa-600">From 3:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Check-out</h3>
                  <p>{format(checkOutDate, "EEEE, MMMM d, yyyy")}</p>
                  <p className="text-sm text-villa-600">Until 11:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Guests</h3>
                  <p>{booking.guests.adults} {booking.guests.adults === 1 ? 'Adult' : 'Adults'}</p>
                  {booking.guests.children > 0 && (
                    <p>{booking.guests.children} {booking.guests.children === 1 ? 'Child' : 'Children'}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">Status</h3>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-xl mb-4">Room Details</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={booking.room.images[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={booking.room.name}
                  className="rounded-lg w-full h-40 object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="font-serif text-lg">{booking.room.name}</h3>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-villa-600">Price per night</span>
                    <span>${booking.room.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-villa-600">Nights</span>
                    <span>{nights}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-primary">${booking.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-villa-700">
              We've sent a confirmation email with these details to your email address.
              If you have any questions, please contact our concierge service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link to="/">Return to Homepage</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmation;
