
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className={`font-serif text-2xl font-semibold ${isScrolled ? 'text-villa-900' : 'text-white'}`}>
              Villa Serenity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isScrolled ? 'text-villa-800' : 'text-white'} hover:text-accent transition-colors`}>
              Home
            </Link>
            <Link to="/about" className={`${isScrolled ? 'text-villa-800' : 'text-white'} hover:text-accent transition-colors`}>
              About Us
            </Link>
            <Link to="/services" className={`${isScrolled ? 'text-villa-800' : 'text-white'} hover:text-accent transition-colors`}>
              Services
            </Link>
            <Link to="/contact" className={`${isScrolled ? 'text-villa-800' : 'text-white'} hover:text-accent transition-colors`}>
              Contact
            </Link>
            <Button variant="outline" className={`${isScrolled ? 'border-primary text-primary' : 'border-white text-white'} hover:bg-primary hover:text-white`}>
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-villa-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-villa-900' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white mt-4 py-4 px-4 rounded-md shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-villa-800 hover:text-accent" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="text-villa-800 hover:text-accent" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/services" className="text-villa-800 hover:text-accent" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link to="/contact" className="text-villa-800 hover:text-accent" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
