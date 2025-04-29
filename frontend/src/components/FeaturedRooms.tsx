import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const rooms = [
  {
    id: 1,
    name: "Deluxe Ocean Suite",
    description: "Spacious suite with panoramic ocean views, king-size bed, and luxury amenities.",
    price: 350,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["King-size bed", "Ocean view", "Free Wi-Fi", "Minibar"]
  },
  {
    id: 2,
    name: "Garden Villa",
    description: "Private villa surrounded by lush tropical gardens with private pool and terrace.",
    price: 550,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Private pool", "2 bedrooms", "Garden view", "Butler service"]
  },
  {
    id: 3,
    name: "Mountain View Room",
    description: "Cozy room offering stunning mountain views, perfect for nature lovers.",
    price: 250,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Queen bed", "Mountain view", "Breakfast included", "Balcony"]
  }
];

const FeaturedRooms = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Our Accommodations</h2>
          <p className="text-lg text-villa-700 max-w-2xl mx-auto">
            Choose from our range of luxurious rooms and villas, each designed for ultimate comfort and relaxation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <Card key={room.id} className="overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="h-60 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-serif">{room.name}</CardTitle>
                <CardDescription className="text-villa-600">Starting from ${room.price} per night</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{room.description}</p>
                <ul className="space-y-1">
                  {room.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-villa-600">
                      <span className="mr-2">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to={`/booking?roomId=${room.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
