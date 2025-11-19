import { useState } from 'react';
import { Package, Search, CheckCircle, Clock, Truck, Home, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import BackButton from '../components/BackButton';

export default function OrderTrackingPage() {
  const { t } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock order data
      setOrderData({
        trackingNumber: trackingNumber,
        status: 'shipped',
        estimatedDelivery: '2025-11-15',
        currentLocation: 'New York, NY',
        timeline: [
          {
            status: 'ordered',
            label: t('tracking.timeline.ordered'),
            date: '2025-11-08 10:30 AM',
            completed: true,
          },
          {
            status: 'confirmed',
            label: t('tracking.timeline.confirmed'),
            date: '2025-11-08 11:15 AM',
            completed: true,
          },
          {
            status: 'processing',
            label: t('tracking.timeline.processing'),
            date: '2025-11-09 09:00 AM',
            completed: true,
          },
          {
            status: 'shipped',
            label: t('tracking.timeline.shipped'),
            date: '2025-11-10 02:30 PM',
            completed: true,
            current: true,
          },
          {
            status: 'out_for_delivery',
            label: t('tracking.timeline.outForDelivery'),
            date: 'Pending',
            completed: false,
          },
          {
            status: 'delivered',
            label: t('tracking.timeline.delivered'),
            date: 'Pending',
            completed: false,
          },
        ],
        items: [
          {
            name: 'Wireless Headphones',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
          },
        ],
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main Street',
          city: 'New York, NY 10001',
        },
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ordered':
      case 'confirmed':
        return CheckCircle;
      case 'processing':
        return Package;
      case 'shipped':
        return Truck;
      case 'out_for_delivery':
        return MapPin;
      case 'delivered':
        return Home;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('tracking.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('tracking.subtitle')}
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={t('tracking.placeholder')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {t('common.loading')}
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {t('tracking.track')}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('tracking.order')} #{orderData.trackingNumber}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('tracking.estimatedDelivery')}: <span className="font-semibold text-orange-500 dark:text-orange-400">{orderData.estimatedDelivery}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-500/10 rounded-lg">
                  <Truck className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  <span className="font-semibold text-orange-500 dark:text-orange-400">
                    {t('tracking.currentLocation')}: {orderData.currentLocation}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {orderData.timeline.map((step: any, index: number) => {
                  const Icon = getStatusIcon(step.status);
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? 'bg-green-100 dark:bg-green-900/20'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              step.completed
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-400'
                            }`}
                          />
                        </div>
                        {index < orderData.timeline.length - 1 && (
                          <div
                            className={`absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 ${
                              step.completed ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          ></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-semibold ${
                              step.completed
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {step.label}
                          </h3>
                          {step.current && (
                            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 text-xs font-semibold rounded">
                              {t('tracking.current')}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Items */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {t('tracking.items')}
                </h3>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t('tracking.quantity')}: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {t('tracking.shippingAddress')}
                </h3>
                <div className="text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {orderData.shippingAddress.name}
                  </p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>{orderData.shippingAddress.city}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-orange-50 dark:bg-orange-500/10 rounded-xl p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {t('tracking.needHelp')}
          </p>
          <a
            href="/contact"
            className="text-orange-500 dark:text-orange-400 font-semibold hover:underline"
          >
            {t('tracking.contactSupport')}
          </a>
        </div>
      </div>
    </div>
  );
}
