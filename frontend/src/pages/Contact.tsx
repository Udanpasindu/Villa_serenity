
import { ChevronRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactMap from "@/components/ContactMap";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            opacity: 0.3
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-2">
              <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">Get in Touch</h1>
            <div className="flex items-center text-sm text-villa-600">
              <a href="/" className="hover:text-primary">Home</a>
              <ChevronRight size={16} className="mx-2" />
              <span>Contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-secondary p-8 rounded-lg text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-2">Our Location</h3>
              <p className="text-villa-600">
                123 Serenity Road<br />
                Paradise Island<br />
                Ocean State, 12345
              </p>
            </div>

            <div className="bg-secondary p-8 rounded-lg text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-2">Email Address</h3>
              <p className="text-villa-600 mb-1">
                <a href="mailto:info@villaserenity.com" className="hover:text-primary">info@villaserenity.com</a>
              </p>
              <p className="text-villa-600">
                <a href="mailto:reservations@villaserenity.com" className="hover:text-primary">reservations@villaserenity.com</a>
              </p>
            </div>

            <div className="bg-secondary p-8 rounded-lg text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-2">Phone Numbers</h3>
              <p className="text-villa-600 mb-1">
                <a href="tel:+12345678900" className="hover:text-primary">+1 (234) 567-8900</a>
              </p>
              <p className="text-villa-600">
                <a href="tel:+12345678901" className="hover:text-primary">+1 (234) 567-8901</a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Send Us a Message</h2>
              <p className="text-villa-700 mb-8">
                Have questions or ready to book your stay? Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  ></textarea>
                </div>
                
                <Button className="w-full sm:w-auto" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
            
            <ContactMap />
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-semibold mb-2">Opening Hours</h2>
                <p className="text-villa-700">
                  Our reception and concierge services are available to assist you at any time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-6 sm:border-r border-b sm:border-b-0 border-gray-100">
                  <h3 className="font-serif text-xl mb-4">Reception</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-villa-600">Monday - Friday</span>
                      <span className="font-medium">24 Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-villa-600">Saturday</span>
                      <span className="font-medium">24 Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-villa-600">Sunday</span>
                      <span className="font-medium">24 Hours</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl mb-4">Restaurant & Bar</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-villa-600">Breakfast</span>
                      <span className="font-medium">7:00 AM - 10:30 AM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-villa-600">Lunch</span>
                      <span className="font-medium">12:00 PM - 2:30 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-villa-600">Dinner</span>
                      <span className="font-medium">6:00 PM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-villa-600">Bar</span>
                      <span className="font-medium">11:00 AM - 12:00 AM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-villa-700 max-w-2xl mx-auto">
              Find quick answers to common questions about Villa Serenity.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-2">What are your check-in and check-out times?</h3>
                <p className="text-villa-600">
                  Standard check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged upon request, subject to availability.
                </p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-2">Do you offer airport transfers?</h3>
                <p className="text-villa-600">
                  Yes, we provide airport transfers for our guests. Please inform our reservations team of your flight details at least 48 hours prior to arrival to arrange this service.
                </p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-2">Is breakfast included in the room rate?</h3>
                <p className="text-villa-600">
                  Yes, our room rates include a complimentary gourmet breakfast buffet served at our restaurant from 7:00 AM to 10:30 AM daily.
                </p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-2">Do you accommodate special dietary requirements?</h3>
                <p className="text-villa-600">
                  Absolutely. Our chefs can accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergies. Please inform us of any specific requirements when making your reservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
