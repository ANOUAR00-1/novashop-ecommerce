import { useLanguage } from '../contexts/LanguageContext';
import { Cookie, Settings, BarChart, Target, Shield } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function CookiePolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-6">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('cookies.lastUpdated')}: {t('cookies.updateDate')}
            </p>
          </div>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.whatAreCookies.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.whatAreCookies.description')}
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('cookies.types.title')}
            </h2>

            {/* Essential Cookies */}
            <div className="mb-6 p-6 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('cookies.types.essential.title')}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('cookies.types.essential.description')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('cookies.types.essential.auth')}</li>
                <li>{t('cookies.types.essential.cart')}</li>
                <li>{t('cookies.types.essential.security')}</li>
              </ul>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <BarChart className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('cookies.types.analytics.title')}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('cookies.types.analytics.description')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('cookies.types.analytics.traffic')}</li>
                <li>{t('cookies.types.analytics.behavior')}</li>
                <li>{t('cookies.types.analytics.performance')}</li>
              </ul>
            </div>

            {/* Marketing Cookies */}
            <div className="mb-6 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('cookies.types.marketing.title')}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('cookies.types.marketing.description')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('cookies.types.marketing.ads')}</li>
                <li>{t('cookies.types.marketing.social')}</li>
                <li>{t('cookies.types.marketing.retargeting')}</li>
              </ul>
            </div>

            {/* Preference Cookies */}
            <div className="mb-6 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('cookies.types.preference.title')}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('cookies.types.preference.description')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('cookies.types.preference.language')}</li>
                <li>{t('cookies.types.preference.theme')}</li>
                <li>{t('cookies.types.preference.layout')}</li>
              </ul>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.managing.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('cookies.managing.description')}
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="text-yellow-800 dark:text-yellow-400">
                  {t('cookies.managing.warning.title')}:
                </strong>{' '}
                {t('cookies.managing.warning.description')}
              </p>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.thirdParty.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('cookies.thirdParty.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('cookies.thirdParty.googleAnalytics')}</li>
              <li>{t('cookies.thirdParty.stripe')}</li>
              <li>{t('cookies.thirdParty.social')}</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('cookies.contact.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('cookies.contact.description')}
              <a href="mailto:privacy@novashop.com" className="text-orange-600 hover:underline ml-1">
                privacy@novashop.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
