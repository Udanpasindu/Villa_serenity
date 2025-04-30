import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ChevronRight, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  roomId: z.string().optional(),
  checkIn: z.date({ required_error: "Please select a check-in date" }),
  checkOut: z.date({ required_error: "Please select a check-out date" }),
  adults: z.number().min(1, "At least 1 adult is required").max(10),
  children: z.number().min(0).max(10),
  specialRequests: z.string().optional(),
});

// Room type for display
type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  capacity: number;
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRoomAvailable, setIsRoomAvailable] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      adults: 1,
      children: 0,
      specialRequests: "",
      // Initialize with empty room selection
      roomId: undefined,
      // Initialize with today's date and tomorrow's date
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 86400000), // Tomorrow
    }
  });

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // For development purposes, let's create mock room data
        // This ensures rooms are always available even if the API is down
        const mockRooms = [
          {
            id: "1",
            name: "Deluxe Ocean Suite",
            description: "Spacious suite with panoramic ocean views, king-size bed, and luxury amenities.",
            price: 350,
            images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            features: ["King-size bed", "Ocean view", "Free Wi-Fi", "Minibar"],
            capacity: 2
          },
          {
            id: "2",
            name: "Garden Villa",
            description: "Private villa surrounded by lush tropical gardens with private pool and terrace.",
            price: 550,
            images: ["https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            features: ["Private pool", "2 bedrooms", "Garden view", "Butler service"],
            capacity: 4
          },
          {
            id: "3",
            name: "Mountain View Room",
            description: "Cozy room offering stunning mountain views, perfect for nature lovers.",
            price: 250,
            images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            features: ["Queen bed", "Mountain view", "Breakfast included", "Balcony"],
            capacity: 2
          }
        ];
        
        // Set the mock rooms for development
        setRooms(mockRooms);
        
        // Try to get rooms from API in production
        try {
          const response = await fetch("http://localhost:5000/api/rooms");
          const data = await response.json();
          
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setRooms(data.data);
          }
        } catch (apiError) {
          console.log("Using mock rooms data for development");
        }
        
        // If roomId is in URL params, select that room
        const roomIdFromParams = searchParams.get("roomId");
        if (roomIdFromParams) {
          const room = mockRooms.find((r) => r.id === roomIdFromParams);
          if (room) {
            setSelectedRoom(room);
            form.setValue("roomId", roomIdFromParams);
          }
        }
      } catch (error) {
        console.error("Error setting up rooms:", error);
        toast({
          title: "Error",
          description: "Failed to load room data. Please refresh the page.",
          variant: "destructive",
        });
      }
    };
    
    fetchRooms();
  }, [searchParams, form, toast]);

  // Check room availability when dates change
  const checkAvailability = async (roomId: string, checkIn: Date, checkOut: Date) => {
    if (!roomId || !checkIn || !checkOut) return true;
    
    try {
      const response = await fetch("http://localhost:5000/api/rooms/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          checkIn,
          checkOut,
        }),
      });
      
      const data = await response.json();
      return data.isAvailable;
    } catch (error) {
      console.error("Error checking availability:", error);
      return false;
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormError(null);
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your booking",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/booking" } });
      return;
    }

    if (!selectedRoom) {
      toast({
        title: "Room Selection Required",
        description: "Please select a room to continue",
        variant: "destructive",
      });
      setFormError("Please select a room to continue");
      return;
    }

    // Validate dates (check-in must be before check-out)
    if (values.checkIn >= values.checkOut) {
      toast({
        title: "Invalid Dates",
        description: "Check-in date must be before check-out date",
        variant: "destructive",
      });
      setFormError("Check-in date must be before check-out date");
      return;
    }

    // Check if room is available for the selected dates
    const available = await checkAvailability(
      selectedRoom.id,
      values.checkIn,
      values.checkOut
    );

    if (!available) {
      setIsRoomAvailable(false);
      toast({
        title: "Room Not Available",
        description: "The selected room is not available for the chosen dates",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Ensure we're sending data in the correct format for MongoDB
      const bookingData = {
        room: selectedRoom.id,
        checkIn: values.checkIn.toISOString(),  // Convert dates to ISO string
        checkOut: values.checkOut.toISOString(),
        guests: {
          adults: values.adults,
          children: values.children,
        },
        specialRequests: values.specialRequests || "",
        name: values.name,
        email: values.email,
        phone: values.phone
        // Don't include totalPrice - server will calculate it
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success) {
        setBookingSuccess(true);
        toast({
          title: "Booking Confirmed!",
          description: "Your booking has been successfully confirmed.",
        });
        // Navigate to confirmation page with the MongoDB _id
        setTimeout(() => {
          navigate(`/booking-confirmation/${data.data._id}`);
        }, 1500);
      } else {
        setFormError(data.error || "There was an error processing your booking");
        toast({
          title: "Booking Failed",
          description: data.error || "There was an error processing your booking",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setFormError("There was an error processing your booking. Please try again.");
      toast({
        title: "Booking Error",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // When a room is selected from the URL params
  useEffect(() => {
    if (searchParams.get("roomId") && rooms.length > 0) {
      const roomId = searchParams.get("roomId");
      const selectedRoom = rooms.find(room => room.id === roomId);
      
      if (selectedRoom) {
        setSelectedRoom(selectedRoom);
        form.setValue("roomId", selectedRoom.id);
      }
    }
  }, [rooms, searchParams, form]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            opacity: 0.3
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-2">
              <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium">Book Your Stay</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">Reserve Your Escape</h1>
            <div className="flex items-center text-sm text-villa-600">
              <a href="/" className="hover:text-primary">Home</a>
              <ChevronRight size={16} className="mx-2" />
              <span>Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-semibold mb-8 text-center">Complete Your Reservation</h2>
            
            {bookingSuccess ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center mb-8">
                <h3 className="font-semibold text-lg mb-2">Booking Successfully Submitted!</h3>
                <p className="mb-4">Your booking has been confirmed. You will be redirected to the confirmation page shortly.</p>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="default">
                    <Link to="/">Return to Homepage</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                {formError && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
                    <p className="font-medium">{formError}</p>
                    <p className="text-sm mt-1">Please review your information and try again.</p>
                  </div>
                )}
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Room Selection */}
                  <div>
                    <h3 className="text-xl font-serif mb-4">Select Your Room</h3>
                    {rooms.length === 0 ? (
                      <div className="p-4 border rounded-lg text-center">
                        <p>Loading available rooms...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rooms.map((room) => (
                          <div 
                            key={room.id}
                            className={`p-4 border rounded-lg cursor-pointer ${
                              selectedRoom?.id === room.id 
                                ? "border-primary bg-primary/5" 
                                : "border-gray-200 hover:border-primary/50"
                            }`}
                            onClick={() => {
                              console.log("Room selected:", room);
                              setSelectedRoom(room);
                              form.setValue("roomId", room.id);
                              setFormError(null);
                              // Show confirmation that room was selected
                              toast({
                                title: "Room Selected",
                                description: `You selected ${room.name}`,
                              });
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{room.name}</h4>
                              <span className="text-primary font-medium">${room.price}/night</span>
                            </div>
                            <p className="text-sm text-villa-600">{room.description.substring(0, 80)}...</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Dates Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Check-in Date */}
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-in Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Check-out Date */}
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-out Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => 
                                  date < new Date() || 
                                  (form.getValues().checkIn && date <= form.getValues().checkIn)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Guest Information */}
                  <div>
                    <h3 className="text-xl font-serif mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (234) 567-8900" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adults</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              max={10} 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Children</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={0} 
                              max={10} 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Special Requests */}
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Let us know if you have any special requests or requirements..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Booking Summary */}
                  {selectedRoom && (
                    <div className="bg-secondary p-6 rounded-lg">
                      <h3 className="text-xl font-serif mb-4">Booking Summary</h3>
                      <div className="space-y-2 text-villa-700">
                        <div className="flex justify-between">
                          <span>Room:</span>
                          <span className="font-medium">{selectedRoom.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price per night:</span>
                          <span className="font-medium">${selectedRoom.price}</span>
                        </div>
                        {form.getValues().checkIn && form.getValues().checkOut && (
                          <>
                            <div className="flex justify-between">
                              <span>Check-in:</span>
                              <span className="font-medium">{format(form.getValues().checkIn, "PPP")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Check-out:</span>
                              <span className="font-medium">{format(form.getValues().checkOut, "PPP")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Nights:</span>
                              <span className="font-medium">
                                {Math.ceil(
                                  (form.getValues().checkOut.getTime() - form.getValues().checkIn.getTime()) / 
                                  (1000 * 60 * 60 * 24)
                                )}
                              </span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-lg">
                              <span>Total:</span>
                              <span className="font-medium text-primary">
                                ${selectedRoom.price * 
                                  Math.ceil(
                                    (form.getValues().checkOut.getTime() - form.getValues().checkIn.getTime()) / 
                                    (1000 * 60 * 60 * 24)
                                  )
                                }
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {!isRoomAvailable && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-md">
                      The selected room is not available for these dates. Please select different dates or another room.
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="px-8" 
                      size="lg" 
                      disabled={isLoading || (!selectedRoom)}
                      onClick={() => {
                        if (!selectedRoom) {
                          toast({
                            title: "Room Selection Required",
                            description: "Please select a room to continue",
                            variant: "destructive",
                          });
                          setFormError("Please select a room to continue");
                        }
                      }}
                    >
                      {isLoading ? "Processing..." : "Complete Booking"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Booking;
