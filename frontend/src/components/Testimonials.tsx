
import { Separator } from "@/components/ui/separator";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Our stay at Villa Serenity was absolutely magical. The attention to detail, the friendly staff, and the stunning views made it an unforgettable experience.",
    author: "Sarah Johnson",
    position: "Travel Blogger"
  },
  {
    id: 2,
    content: "We celebrated our 10th anniversary here and it exceeded all expectations. The private dinner on the beach was a highlight we'll cherish forever.",
    author: "Michael & Rebecca Davis",
    position: "Texas, USA"
  },
  {
    id: 3,
    content: "As someone who travels frequently for business, I can confidently say Villa Serenity offers the perfect balance of luxury and functionality. It's my new favorite retreat.",
    author: "Daniel Wong",
    position: "Business Executive"
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Guest Experiences</h2>
          <p className="text-lg text-villa-700 max-w-2xl mx-auto">
            Hear what our guests have to say about their stay with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className="bg-secondary p-8 rounded-lg flex flex-col relative"
            >
              <Quote className="text-primary/20 w-12 h-12 absolute top-6 right-6" />
              <p className="text-villa-700 mb-6 relative z-10">"{testimonial.content}"</p>
              <div className="mt-auto">
                <Separator className="mb-4" />
                <div>
                  <h4 className="font-semibold text-villa-900">{testimonial.author}</h4>
                  <p className="text-sm text-villa-600">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
