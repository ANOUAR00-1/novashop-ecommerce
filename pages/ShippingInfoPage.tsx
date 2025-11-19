import { useLanguage } from '../contexts/LanguageContext';
import { Truck, Package, Globe, Clock, DollarSign, MapPin } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function ShippingInfoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('shipping.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('shipping.subtitle')}
            </p>
          </div>

          {/* Shipping Methods */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('shipping.methods.title')}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Standard Shipping */}
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t('shipping.methods.standard.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('shipping.methods.standard.delivery')}
                    </p>
                  </div>
                  <span className="text-green-600 font-bold">{t('shipping.methods.standard.price')}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {t('shipping.methods.standard.description')}
                </p>
              </div>

              {/* Express Shipping */}
              <div className="p-6 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t('shipping.methods.express.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('shipping.methods.express.delivery')}
                    </p>
                  </div>
                  <span className="text-orange-500 font-bold">{t('shipping.methods.express.price')}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {t('shipping.methods.express.description')}
                </p>
              </div>

              {/* Overnight Shipping */}
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t('shipping.methods.overnight.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('shipping.methods.overnight.delivery')}
                    </p>
                  </div>
                  <span className="text-purple-600 font-bold">{t('shipping.methods.overnight.price')}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {t('shipping.methods.overnight.description')}
                </p>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('shipping.international.title')}
              </h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('shipping.international.description')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{t('shipping.international.duties')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{t('shipping.international.time')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{t('shipping.international.restrictions')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Processing Time */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('shipping.processing.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('shipping.processing.description')}
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="text-yellow-800 dark:text-yellow-400">
                  {t('shipping.processing.note.title')}:
                </strong>{' '}
                {t('shipping.processing.note.description')}
              </p>
            </div>
          </section>

          {/* Free Shipping */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('shipping.freeShipping.title')}
              </h2>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-300">
                {t('shipping.freeShipping.description')}
              </p>
            </div>
          </section>

          {/* Tracking */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('shipping.tracking.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('shipping.tracking.description')}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('shipping.tracking.step1')}</li>
              <li>{t('shipping.tracking.step2')}</li>
              <li>{t('shipping.tracking.step3')}</li>
            </ol>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('shipping.contact.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('shipping.contact.description')}
              <a href="mailto:shipping@novashop.com" className="text-green-600 hover:underline ml-1">
                shipping@novashop.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
