import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6">
              Experience Luxury & Comfort at Villa Serenity
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Discover our exclusive villa retreat with breathtaking views and world-class amenities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                <Link to="/booking">Book Your Stay</Link>
              </Button>
                <Button variant="outline" size="lg" asChild className="border-2 border-emerald-500 text-white hover:bg-black/20 bg-black/30">
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
