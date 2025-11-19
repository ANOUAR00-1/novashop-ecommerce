import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Customer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    comment: 'Amazing quality products! Fast shipping and excellent customer service. Will definitely shop here again.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Premium Member',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    comment: 'Best online shopping experience I\'ve had. The product descriptions are accurate and delivery was super quick.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Verified Customer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    comment: 'Love the variety of products available. Found everything I needed in one place. Highly recommend!',
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 relative hover:shadow-xl transition-shadow"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-200 dark:text-blue-900" />
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
