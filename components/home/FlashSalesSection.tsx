import { useState, useEffect } from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { Product } from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';

interface FlashSalesSectionProps {
  products: Product[];
}

export default function FlashSalesSection({ products }: FlashSalesSectionProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjczMzMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtOC44MzcgNy4xNjMtMTYgMTYtMTZzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTYtMTYtNy4xNjMtMTYtMTZ6bS0yMCAwYzAtOC44MzcgNy4xNjMtMTYgMTYtMTZzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTYtMTYtNy4xNjMtMTYtMTZ6bS0yMCAwYzAtOC44MzcgNy4xNjMtMTYgMTYtMTZzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTYtMTYtNy4xNjMtMTYtMTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-orange-500 via-red-500 to-orange-500 rounded-2xl shadow-2xl animate-pulse">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t('home.flashSales.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{t('home.flashSales.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-orange-200 dark:border-orange-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent relative z-10">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-2">{t('home.flashSales.hours')}</span>
              </div>
              <div className="flex items-center text-3xl font-bold text-orange-600 pb-6">:</div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-orange-200 dark:border-orange-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent relative z-10">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-2">{t('home.flashSales.minutes')}</span>
              </div>
              <div className="flex items-center text-3xl font-bold text-orange-600 pb-6">:</div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-orange-200 dark:border-orange-900 relative overflow-hidden animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent relative z-10">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-2">{t('home.flashSales.seconds')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} showFlashBadge />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white rounded-2xl hover:from-orange-600 hover:via-red-600 hover:to-orange-600 transition-all font-bold shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transform"
          >
            {t('home.flashSales.viewAllDeals')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
