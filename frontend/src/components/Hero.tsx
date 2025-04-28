
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif font-semibold leading-tight mb-4">
              Experience Luxurious Comfort in Nature's Embrace
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Discover our exclusive villa retreat with breathtaking views and world-class amenities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Book Your Stay
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/20">
                <Link to="/about">
                  Explore More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
