import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { useLanguage } from '../../contexts/LanguageContext';
import { getProductNameKey } from '../../utils/translateProduct';

export default function RecentlyViewedSection() {
  const { t } = useLanguage();
  const { recentProducts } = useRecentlyViewed();

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('product.recentlyViewed')}
            </h2>
          </div>
          <Link
            to="/products"
            className="text-orange-500 hover:underline flex items-center gap-2"
          >
            {t('cart.continueShopping')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentProducts.slice(0, 5).map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white dark:bg-gray-900 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-2">
                {t(getProductNameKey(product.id))}
              </h3>
              <p className="text-lg font-bold text-orange-500">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
