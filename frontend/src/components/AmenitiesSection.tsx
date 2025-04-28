
import { Check, Coffee, Utensils, Wifi, Fan, Dumbbell, Wine } from 'lucide-react';

const amenities = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the property."
  },
  {
    icon: Coffee,
    title: "Breakfast Included",
    description: "Start your day with our complimentary gourmet breakfast buffet featuring local specialties."
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Keep up with your fitness routine in our fully equipped modern gym."
  },
  {
    icon: Fan,
    title: "Spa Services",
    description: "Relax and rejuvenate with our range of spa treatments and massage therapies."
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Experience exquisite cuisine at our in-house restaurant featuring local and international dishes."
  },
  {
    icon: Wine,
    title: "Bar & Lounge",
    description: "Enjoy handcrafted cocktails and fine wines at our elegant bar and lounge area."
  },
];

const AmenitiesSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Amenities & Services</h2>
          <p className="text-lg text-villa-700 max-w-2xl mx-auto">
            We offer a range of premium amenities to make your stay comfortable and memorable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="flex space-x-4 p-6 rounded-lg transition-all hover:bg-secondary"
            >
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <amenity.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-medium text-xl mb-2">{amenity.title}</h3>
                <p className="text-villa-600">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
