import { Link, useLocation } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.error('❌ 404 Page Not Found');
    console.log('📍 Attempted Path:', location.pathname);
    console.log('🔍 Search:', location.search);
    console.log('🎯 Full URL:', window.location.href);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl text-orange-500 dark:text-orange-400 mb-4">404</h1>
        <h2 className="mb-4 text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
          If you expected to see the homepage, please click "Back to Home" below.
        </p>

        {/* Debug Info */}
        <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-left">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-orange-800 dark:text-orange-300 mb-2">
                <strong>Debug Information:</strong>
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-400 font-mono mb-1">
                Attempted Path: {location.pathname}
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-400 font-mono">
                Full URL: {window.location.href}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-gray-800 rounded-lg">
          <p className="text-sm text-orange-600 dark:text-white/70 mb-2">
            <strong>Available Routes - Click to test:</strong>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-orange-600 dark:text-orange-400">
            <Link to="/" className="hover:underline">• Home (/)</Link>
            <Link to="/test" className="hover:underline">• Test Page (debug)</Link>
            <Link to="/diagnostic" className="hover:underline">• Diagnostic</Link>
            <Link to="/products" className="hover:underline">• Products</Link>
            <Link to="/cart" className="hover:underline">• Cart</Link>
            <Link to="/login" className="hover:underline">• Login</Link>
            <Link to="/register" className="hover:underline">• Register</Link>
            <Link to="/profile" className="hover:underline">• Profile (auth)</Link>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-300 mb-2">
            <strong>Troubleshooting Steps:</strong>
          </p>
          <ol className="text-xs text-green-700 dark:text-green-400 space-y-1 list-decimal list-inside">
            <li>Open browser console (F12) and check for errors</li>
            <li>Click "Home" button above to navigate to root path</li>
            <li>Visit /test to verify routing works</li>
            <li>Visit /diagnostic for full system status</li>
            <li>Check console logs for initialization messages</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
