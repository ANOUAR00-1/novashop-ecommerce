import { Users, Award, Globe, Heart } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: Award, label: 'Awards Won', value: '15+' },
    { icon: Globe, label: 'Countries', value: '120+' },
    { icon: Heart, label: 'Product Reviews', value: '100K+' }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Product Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    },
    {
      name: 'Emma Davis',
      role: 'Customer Success Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <BackButton />

        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About NovaShop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're on a mission to revolutionize online shopping by providing premium products, exceptional service, and an unforgettable customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                  <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2020, NovaShop started with a simple vision: to make premium shopping accessible to everyone. What began as a small startup has grown into a trusted platform serving customers across 120+ countries.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                We believe that great products should be affordable, and exceptional service should be the standard, not the exception. Every day, our team works tirelessly to bring you the best selection of products at unbeatable prices.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our commitment to sustainability and ethical sourcing means you can shop with confidence, knowing that your purchases support responsible business practices.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">2020</div>
                <p className="text-xl">Founded with a vision</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Customer First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every decision we make is guided by what's best for our customers. Your satisfaction is our ultimate goal.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to reducing our environmental impact and supporting sustainable practices throughout our supply chain.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We constantly innovate to provide better products, services, and experiences for our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose NovaShop?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            With over 50,000 happy customers and a 4.9-star rating, we're committed to delivering excellence in every interaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2">✓</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-blue-100">Carefully curated products from trusted brands</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">✓</div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-blue-100">Free shipping on orders over $50</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">✓</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-blue-100">Dedicated customer service team</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
