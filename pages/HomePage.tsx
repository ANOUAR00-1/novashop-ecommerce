import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { productsApi, Product } from '../services/api';
import ProductCard from '../components/products/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🏠 HomePage: Component mounted');
    
    const loadProducts = async () => {
      try {
        console.log('📦 HomePage: Loading featured products...');
        const response = await productsApi.getAll({ limit: 6 });
        console.log('✅ HomePage: Products loaded successfully', response.products.length);
        setFeaturedProducts(response.products);
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
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-white">
              Welcome to NovaShop
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover premium electronics, fashion, and accessories. Quality products with fast shipping and excellent customer service.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">Free Shipping</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">Secure Payment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">Fast Delivery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2-3 business days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <HeadphonesIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-white">24/7 Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dedicated support team
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
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/products?category=Electronics"
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600"
                alt="Electronics"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white mb-2">Electronics</h3>
                  <p className="text-white/80 text-sm">Laptops, phones & more</p>
                </div>
              </div>
            </Link>
            <Link
              to="/products?category=Fashion"
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
                alt="Fashion"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white mb-2">Fashion</h3>
                  <p className="text-white/80 text-sm">Clothing & accessories</p>
                </div>
              </div>
            </Link>
            <Link
              to="/products?category=Wearables"
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                alt="Wearables"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white mb-2">Wearables</h3>
                  <p className="text-white/80 text-sm">Smart watches & fitness</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-gray-900 dark:text-white">Featured Products</h2>
            <Link
              to="/products"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
              View All
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers. Get exclusive deals and fast shipping on all orders.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
