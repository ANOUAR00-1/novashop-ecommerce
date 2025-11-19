import { useState, useEffect } from 'react';
import { Tag, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/products/ProductCard';
import { useAppSelector } from '../store';
import BackButton from '../components/BackButton';

export default function DealsPage() {
  const { t } = useLanguage();
  const products = useAppSelector((state) => state.products.items);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products on sale
  const dealProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);
  const flashDeals = dealProducts.slice(0, 4);
  const dailyDeals = dealProducts.slice(4, 8);
  const weeklyDeals = dealProducts.slice(8);

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Tag className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">{t('deals.title')}</h1>
          <p className="text-xl opacity-90">{t('deals.subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <BackButton />
        {/* Flash Deals */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('deals.flashDeals')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t('deals.flashDescription')}</p>
            </div>
            <div className="flex items-center gap-4 bg-red-100 dark:bg-red-900/20 px-6 py-4 rounded-xl">
              <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('home.flashSales.hours')}</div>
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">:</span>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('home.flashSales.minutes')}</div>
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">:</span>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('home.flashSales.seconds')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map(product => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                  -{calculateDiscount(product.originalPrice!, product.price)}%
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-orange-500 dark:text-orange-400" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('deals.dailyDeals')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t('deals.dailyDescription')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Weekly Deals */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('deals.weeklyDeals')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{t('deals.weeklyDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">{t('deals.subscribe.title')}</h3>
          <p className="text-xl mb-8 opacity-90">{t('deals.subscribe.description')}</p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('home.newsletter.placeholder')}
              className="flex-1 px-6 py-3 rounded-lg text-gray-900"
            />
            <button className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('home.newsletter.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
