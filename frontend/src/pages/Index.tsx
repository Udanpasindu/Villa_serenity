
import Hero from "@/components/Hero";
import FeaturedRooms from "@/components/FeaturedRooms";
import Testimonials from "@/components/Testimonials";
import AmenitiesSection from "@/components/AmenitiesSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palmtree, UmbrellaOff, Utensils } from "lucide-react";

const Index = () => {
  return (
    <main>
      <Hero />
      
      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Welcome to Villa Serenity</h2>
              <p className="text-villa-700 mb-6">
                Nestled among lush tropical gardens with panoramic ocean views, Villa Serenity offers the perfect blend of luxury, comfort, and natural beauty. Our boutique hotel provides a tranquil escape where every detail is designed to create an unforgettable experience.
              </p>
              <p className="text-villa-700 mb-8">
                Whether you're seeking a romantic getaway, a family vacation, or a peaceful retreat, our dedicated staff is committed to making your stay exceptional.
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                Discover Our Story <ArrowRight size={16} />
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Villa Exterior" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Villa Interior" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Dining Area" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Garden View" 
                  className="rounded-lg object-cover h-64 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature highlights section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Palmtree className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Breathtaking Location</h3>
              <p className="text-villa-600">
                Set on a pristine beachfront with lush tropical gardens and stunning ocean views.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <UmbrellaOff className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Ultimate Privacy</h3>
              <p className="text-villa-600">
                Each villa is designed to offer maximum privacy with secluded spaces and private pools.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">Exquisite Dining</h3>
              <p className="text-villa-600">
                Indulge in culinary delights prepared by our talented chefs using fresh local ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedRooms />
      <Testimonials />
      <AmenitiesSection />
      
      {/* Call to Action */}
      <section className="py-20 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Book your stay today and discover the perfect balance of comfort, luxury, and natural beauty.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Reserve Your Stay Now
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
