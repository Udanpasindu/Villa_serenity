
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-villa-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="font-serif text-2xl mb-4">Villa Serenity</h3>
            <p className="text-gray-300 mb-6">
              Experience luxury and comfort in our serene retreat away from the city's hustle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Luxury Accommodation</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Spa & Wellness</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Fine Dining</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Events & Celebrations</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contact Us</h4>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Serenity Road</p>
              <p className="mb-2">Paradise Island</p>
              <p className="mb-2">Email: info@villaserenity.com</p>
              <p>Phone: +1 234 567 8900</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Villa Serenity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
