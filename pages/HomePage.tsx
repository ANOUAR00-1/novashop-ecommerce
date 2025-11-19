import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { productsApi, Product } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/products/ProductCard';
import HeroSlider from '../components/home/HeroSlider';
import FlashSalesSection from '../components/home/FlashSalesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import RecentlyViewedSection from '../components/products/RecentlyViewedSection';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('🏠 HomePage: Component mounted');
    
    const loadProducts = async () => {
      try {
        console.log('📦 HomePage: Loading featured products...');
        const response = await productsApi.getAll({ limit: 12 });
        console.log('✅ HomePage: Products loaded successfully', response.products.length);
        setFeaturedProducts(response.products.slice(0, 6));
        setFlashSaleProducts(response.products.filter(p => p.originalPrice).slice(0, 4));
        setError(null);
      } catch (err) {
        console.error('❌ HomePage: Failed to load products:', err);
        setError('Failed to load products. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 py-4">
          <div className="container mx-auto px-4">
            <p className="text-red-800 dark:text-red-300 text-center">{error}</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSlider />

      {/* Features */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Truck className="w-6 h-6 text-orange-500 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">{t('home.features.freeShipping.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('home.features.freeShipping.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">{t('home.features.secure.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('home.features.secure.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">{t('home.features.returns.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('home.features.returns.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <HeadphonesIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">{t('home.features.support.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('home.features.support.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-gray-900 dark:text-white">
            {t('home.categories.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/products?category=electronics"
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600"
                alt={t('home.categories.electronics')}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white mb-2">{t('home.categories.electronics')}</h3>
                  <p className="text-white/80 text-sm">{t('header.electronics')}</p>
                </div>
              </div>
            </Link>
            <Link
              to="/products?category=fashion"
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
                alt={t('home.categories.fashion')}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white mb-2">{t('home.categories.fashion')}</h3>
                  <p className="text-white/80 text-sm">{t('header.fashion')}</p>
                </div>
              </div>
            </Link>
            <Link
              to="/products?category=wearables"
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                alt={t('header.wearables')}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white mb-2">{t('header.wearables')}</h3>
                  <p className="text-white/80 text-sm">{t('header.wearables')}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      {!loading && flashSaleProducts.length > 0 && (
        <FlashSalesSection products={flashSaleProducts} />
      )}

      {/* Recently Viewed */}
      <RecentlyViewedSection />

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-gray-900 dark:text-white">{t('home.featuredProducts.title')}</h2>
            <Link
              to="/products"
              className="text-orange-500 dark:text-orange-400 hover:underline flex items-center gap-2"
            >
              {t('common.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Only show when not logged in */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-white">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
            >
              {t('home.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );
}
