import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Eye, Lock, Database, UserCheck, Cookie } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('privacy.lastUpdated')}: {t('privacy.updateDate')}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.introduction')}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('privacy.infoWeCollect.title')}
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">{t('privacy.infoWeCollect.personalInfo.title')}</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t('privacy.infoWeCollect.personalInfo.name')}</li>
                  <li>{t('privacy.infoWeCollect.personalInfo.email')}</li>
                  <li>{t('privacy.infoWeCollect.personalInfo.phone')}</li>
                  <li>{t('privacy.infoWeCollect.personalInfo.address')}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('privacy.infoWeCollect.paymentInfo.title')}</h3>
                <p>{t('privacy.infoWeCollect.paymentInfo.description')}</p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('privacy.howWeUse.title')}
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.howWeUse.processOrders')}</li>
              <li>{t('privacy.howWeUse.communication')}</li>
              <li>{t('privacy.howWeUse.improvements')}</li>
              <li>{t('privacy.howWeUse.marketing')}</li>
              <li>{t('privacy.howWeUse.fraud')}</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('privacy.dataSecurity.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.dataSecurity.description')}
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('privacy.cookies.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('privacy.cookies.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.cookies.essential')}</li>
              <li>{t('privacy.cookies.analytics')}</li>
              <li>{t('privacy.cookies.marketing')}</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('privacy.yourRights.title')}
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.yourRights.access')}</li>
              <li>{t('privacy.yourRights.correction')}</li>
              <li>{t('privacy.yourRights.deletion')}</li>
              <li>{t('privacy.yourRights.optOut')}</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('privacy.contact.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('privacy.contact.description')}
              <a href="mailto:privacy@novashop.com" className="text-blue-600 hover:underline ml-1">
                privacy@novashop.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
