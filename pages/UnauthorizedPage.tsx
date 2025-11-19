import { Link } from 'react-router-dom';
import { Home, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function UnauthorizedPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-100 dark:bg-red-900/20 rounded-full">
            <ShieldAlert className="w-24 h-24 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">{t('unauthorized.code')}</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {t('unauthorized.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t('unauthorized.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            <Home className="w-6 h-6" />
            {t('unauthorized.backToHome')}
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-lg"
          >
            {t('unauthorized.browseProducts')}
          </Link>
        </div>

        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('unauthorized.supportText')}
          </p>
        </div>
      </div>
    </div>
  );
}
