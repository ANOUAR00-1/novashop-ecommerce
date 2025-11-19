import { useLanguage } from '../contexts/LanguageContext';
import { FileText, ShoppingBag, Ban, AlertCircle, Scale, RefreshCw } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function TermsOfServicePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('terms.lastUpdated')}: {t('terms.updateDate')}
            </p>
          </div>

          {/* Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.acceptance.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.acceptance.description')}
            </p>
          </section>

          {/* Use of Service */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('terms.useOfService.title')}
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">{t('terms.useOfService.eligibility.title')}</h3>
                <p>{t('terms.useOfService.eligibility.description')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('terms.useOfService.account.title')}</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t('terms.useOfService.account.accuracy')}</li>
                  <li>{t('terms.useOfService.account.security')}</li>
                  <li>{t('terms.useOfService.account.responsibility')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Product Information */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('terms.products.title')}
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('terms.products.accuracy')}</li>
              <li>{t('terms.products.pricing')}</li>
              <li>{t('terms.products.availability')}</li>
              <li>{t('terms.products.modifications')}</li>
            </ul>
          </section>

          {/* Orders and Payments */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('terms.orders.title')}
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>{t('terms.orders.acceptance')}</p>
              <p>{t('terms.orders.payment')}</p>
              <p>{t('terms.orders.cancellation')}</p>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('terms.returns.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.returns.description')}
            </p>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('terms.prohibited.title')}
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('terms.prohibited.fraud')}</li>
              <li>{t('terms.prohibited.unauthorized')}</li>
              <li>{t('terms.prohibited.harmful')}</li>
              <li>{t('terms.prohibited.intellectual')}</li>
              <li>{t('terms.prohibited.spam')}</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.liability.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.liability.description')}
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('terms.contact.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.contact.description')}
              <a href="mailto:legal@novashop.com" className="text-purple-600 hover:underline ml-1">
                legal@novashop.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
