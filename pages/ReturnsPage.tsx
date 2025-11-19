import { useLanguage } from '../contexts/LanguageContext';
import { RefreshCw, Package, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function ReturnsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-indigo-600 rounded-2xl mb-6">
              <RefreshCw className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('returns.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('returns.subtitle')}
            </p>
          </div>

          {/* Return Policy */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('returns.policy.title')}
              </h2>
            </div>
            <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl p-6 mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('returns.policy.description')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.policy.condition1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.policy.condition2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.policy.condition3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.policy.condition4')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How to Return */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('returns.howTo.title')}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center text-orange-500 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {t('returns.howTo.step1.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('returns.howTo.step1.description')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center text-orange-500 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {t('returns.howTo.step2.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('returns.howTo.step2.description')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center text-orange-500 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {t('returns.howTo.step3.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('returns.howTo.step3.description')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center text-orange-500 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {t('returns.howTo.step4.title')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('returns.howTo.step4.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exchange Policy */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('returns.exchange.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('returns.exchange.description')}
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-300">
                {t('returns.exchange.process')}
              </p>
            </div>
          </section>

          {/* Non-Returnable Items */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('returns.nonReturnable.title')}
              </h2>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.nonReturnable.item1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.nonReturnable.item2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.nonReturnable.item3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{t('returns.nonReturnable.item4')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Refund Processing */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('returns.refund.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('returns.refund.description')}
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong className="text-yellow-800 dark:text-yellow-400">
                    {t('returns.refund.note.title')}:
                  </strong>{' '}
                  {t('returns.refund.note.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('returns.contact.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('returns.contact.description')}
              <a href="mailto:returns@novashop.com" className="text-orange-500 hover:underline ml-1">
                returns@novashop.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
