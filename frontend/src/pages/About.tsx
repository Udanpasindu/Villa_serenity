
import { ChevronRight } from "lucide-react";

const teamMembers = [
  {
    name: "Elena Rodriguez",
    position: "General Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "With over 15 years in luxury hospitality, Elena brings expertise and passion to ensure every guest has an exceptional experience."
  },
  {
    name: "Michael Chen",
    position: "Executive Chef",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "Chef Michael creates culinary masterpieces inspired by local ingredients and international techniques from his extensive travels."
  },
  {
    name: "Sarah Johnson",
    position: "Spa Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "Sarah specializes in holistic wellness and has designed our signature treatments to rejuvenate both body and mind."
  },
  {
    name: "David Williams",
    position: "Guest Relations Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "David excels at anticipating guests' needs and creating personalized experiences that exceed expectations."
  }
];

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            opacity: 0.3
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-2">
              <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">Our Story</h1>
            <div className="flex items-center text-sm text-villa-600">
              <a href="/" className="hover:text-primary">Home</a>
              <ChevronRight size={16} className="mx-2" />
              <span>About Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">The Villa Serenity Story</h2>
              <p className="text-villa-700 mb-4">
                Founded in 2005 by the Wellington family, Villa Serenity began as a personal retreat before opening its doors to guests seeking a unique luxury experience. What started as a single beachfront property has grown into our current collection of exclusive villas and suites.
              </p>
              <p className="text-villa-700 mb-4">
                Our philosophy is simple: provide unparalleled hospitality in harmony with nature. Every aspect of Villa Serenity has been thoughtfully designed to blend luxury with sustainability, creating an environment where guests can reconnect with themselves and the natural world.
              </p>
              <p className="text-villa-700 mb-4">
                Over the years, we've welcomed guests from around the world, from celebrities seeking privacy to families creating lasting memories. Our dedication to personalized service has earned us numerous accolades in the hospitality industry, including recognition as a "Top Boutique Hotel" for five consecutive years.
              </p>
              <p className="text-villa-700">
                Today, Villa Serenity continues to evolve while staying true to its founding vision of offering a tranquil luxury escape that nourishes the soul.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Villa Serenity Exterior" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-10 -left-10 w-2/3 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="italic text-villa-600">
                  "We created Villa Serenity as a place where luxury meets authenticity, where every guest becomes part of our extended family."
                </p>
                <p className="mt-2 font-medium">— Margaret Wellington, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Our Values</h2>
            <p className="text-lg text-villa-700 max-w-2xl mx-auto">
              The principles that guide everything we do at Villa Serenity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
                <span className="text-primary text-2xl font-serif">01</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Exceptional Hospitality</h3>
              <p className="text-villa-600">
                We go beyond service to create meaningful connections and anticipate guests' needs before they arise.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
                <span className="text-primary text-2xl font-serif">02</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Respect for Nature</h3>
              <p className="text-villa-600">
                Our operations prioritize sustainability and harmony with our beautiful natural surroundings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
                <span className="text-primary text-2xl font-serif">03</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Attention to Detail</h3>
              <p className="text-villa-600">
                We believe the smallest details create the most memorable experiences for our guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Meet Our Team</h2>
            <p className="text-lg text-villa-700 max-w-2xl mx-auto">
              The passionate professionals dedicated to making your stay exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.position}</p>
                <p className="text-villa-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Awards & Recognition</h2>
            <p className="text-lg text-villa-700 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by leading industry authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-block mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15L8.5359 17.5147L9.5 13.5L6 11L10.2679 10.7353L12 7L13.7321 10.7353L18 11L14.5 13.5L15.4641 17.5147L12 15Z" fill="#B38C6C" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2">Luxury Hotel of the Year</h3>
              <p className="text-villa-600">Travel Excellence Awards, 2023</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-block mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6H17V4C17 2.89 16.11 2 15 2H9C7.89 2 7 2.89 7 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM9 4H15V6H9V4Z" fill="#B38C6C" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2">Best Boutique Experience</h3>
              <p className="text-villa-600">Hospitality Global Awards, 2022</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-block mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#B38C6C" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2">Five-Star Excellence</h3>
              <p className="text-villa-600">International Hotel Ratings, 2021-2023</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
