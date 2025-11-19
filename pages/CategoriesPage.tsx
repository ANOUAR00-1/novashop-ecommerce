import { Link } from 'react-router-dom';
import { Laptop, Shirt, Watch, Home, Dumbbell, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppSelector } from '../store';
import BackButton from '../components/BackButton';

export default function CategoriesPage() {
  const { t } = useLanguage();
  const products = useAppSelector((state) => state.products.items);

  const categories = [
    {
      name: 'Electronics',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      color: 'from-orange-500 to-cyan-600',
      description: t('categories.electronics.description'),
    },
    {
      name: 'Fashion',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      color: 'from-orange-600 to-orange-600',
      description: t('categories.fashion.description'),
    },
    {
      name: 'Wearables',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      color: 'from-green-600 to-teal-600',
      description: t('categories.wearables.description'),
    },
    {
      name: 'Home & Kitchen',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      color: 'from-orange-600 to-red-600',
      description: t('categories.homeKitchen.description'),
    },
    {
      name: 'Sports & Outdoors',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      color: 'from-indigo-600 to-orange-600',
      description: t('categories.sportsOutdoors.description'),
    },
    {
      name: 'Beauty & Personal Care',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      color: 'from-rose-600 to-orange-600',
      description: t('categories.beautyPersonalCare.description'),
    },
  ];

  const getCategoryCount = (categoryName: string) => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('categories.title')}</h1>
          <p className="text-xl opacity-90">{t('categories.subtitle')}</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <BackButton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const count = getCategoryCount(category.name);
            
            return (
              <Link
                key={index}
                to={`/products?category=${category.name}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="mb-4">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-sm opacity-90 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {count} {t('categories.products')}
                    </span>
                    <span className="text-sm font-semibold group-hover:translate-x-2 transition-transform">
                      {t('categories.shopNow')} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">{t('categories.featured.title')}</h3>
          <p className="text-xl mb-8 opacity-90">{t('categories.featured.description')}</p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('categories.featured.button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
