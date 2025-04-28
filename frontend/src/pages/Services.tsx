
import { ChevronRight, Palmtree, Utensils, GlassWater, UmbrellaOff, Wine, Dumbbell, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    id: 1,
    title: "Luxury Accommodation",
    description: "Experience the pinnacle of comfort in our meticulously designed rooms, suites, and private villas. Each space features premium bedding, thoughtful amenities, and stunning views.",
    icon: Bed,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Fine Dining",
    description: "Our restaurant offers an exquisite culinary journey featuring fresh local ingredients, international influences, and an extensive wine selection. Private dining experiences can be arranged for special occasions.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Spa & Wellness",
    description: "Rejuvenate your body and mind at our spa sanctuary. Choose from a variety of treatments including massages, facials, and holistic therapies performed by our skilled therapists.",
    icon: GlassWater,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Private Beach Access",
    description: "Enjoy exclusive access to our pristine private beach. Relax on comfortable loungers, take a refreshing swim, or partake in various water activities with equipment available for guest use.",
    icon: UmbrellaOff,
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Bar & Lounge",
    description: "Unwind with handcrafted cocktails, premium spirits, and fine wines at our elegant bar. The perfect setting for pre-dinner drinks or nightcaps with stunning sunset views.",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Fitness Center",
    description: "Maintain your workout routine in our state-of-the-art fitness center featuring modern equipment. Personal training sessions and yoga classes are also available upon request.",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const packages = [
  {
    title: "Romantic Getaway",
    description: "Perfect for couples, this package includes luxury accommodation, couples massage, private candlelit dinner, and champagne on arrival.",
    price: "From $750 per night"
  },
  {
    title: "Family Adventure",
    description: "Designed for families, featuring connecting rooms or a villa, kids activities, family dining experiences, and local excursions.",
    price: "From $950 per night"
  },
  {
    title: "Wellness Retreat",
    description: "Focus on rejuvenation with daily spa treatments, yoga sessions, nutritionist-designed meals, and meditation classes.",
    price: "From $850 per night"
  }
];

const Services = () => {
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
              <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">Experience Luxury</h1>
            <div className="flex items-center text-sm text-villa-600">
              <a href="/" className="hover:text-primary">Home</a>
              <ChevronRight size={16} className="mx-2" />
              <span>Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Our Premium Services</h2>
            <p className="text-lg text-villa-700 max-w-2xl mx-auto">
              Discover the range of exclusive services available during your stay at Villa Serenity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-lg shadow-md object-cover w-full h-64"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl">{service.title}</h3>
                  </div>
                  <p className="text-villa-700 mb-4">
                    {service.description}
                  </p>
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Packages */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Special Packages</h2>
            <p className="text-lg text-villa-700 max-w-2xl mx-auto">
              Enhance your stay with our carefully curated experience packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm flex flex-col h-full">
                <h3 className="font-serif text-xl mb-3">{pkg.title}</h3>
                <p className="text-villa-600 flex-grow mb-4">{pkg.description}</p>
                <div>
                  <Separator className="my-4" />
                  <p className="font-medium text-primary mb-4">{pkg.price}</p>
                  <Button className="w-full">Book This Package</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Additional Services</h2>
              <p className="text-villa-700 mb-8">
                Beyond our standard offerings, we provide a range of personalized services to enhance your stay. Our concierge team is available 24/7 to assist with any special requests you might have.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Private Events & Celebrations</h4>
                    <p className="text-villa-600">
                      Host unforgettable special occasions, from intimate weddings to milestone celebrations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Excursions & Activities</h4>
                    <p className="text-villa-600">
                      Explore local attractions with our curated tours, water sports, and nature experiences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Private Chef Experience</h4>
                    <p className="text-villa-600">
                      Enjoy personalized menus prepared in the comfort of your villa by our expert chefs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Childcare Services</h4>
                    <p className="text-villa-600">
                      Professional childcare allowing parents to enjoy some well-deserved relaxation time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Concierge Service" 
                className="rounded-lg shadow-lg object-cover h-full"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="italic text-villa-600 mb-2">
                  "Whatever you need to make your stay perfect, our team is here to make it happen."
                </p>
                <p className="font-medium">— Our Concierge Promise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Contact our concierge team to customize your perfect stay at Villa Serenity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Your Stay
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              Contact Concierge
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
