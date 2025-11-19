import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAppSelector } from '../store';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function DiagnosticPage() {
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const cart = useAppSelector((state) => state.cart);
  const wishlist = useAppSelector((state) => state.wishlist);
  const products = useAppSelector((state) => state.products);

  const checks = [
    {
      name: 'React Router',
      status: true,
      message: 'Working - you can see this page',
    },
    {
      name: 'Redux Store',
      status: !!cart && !!wishlist && !!products,
      message: cart ? 'Connected' : 'Not connected',
    },
    {
      name: 'Auth Context',
      status: true,
      message: isAuthenticated ? `Logged in as ${user?.email}` : 'Not logged in',
    },
    {
      name: 'Theme Context',
      status: !!theme,
      message: `Current theme: ${theme}`,
    },
    {
      name: 'Local Storage',
      status: typeof localStorage !== 'undefined',
      message: typeof localStorage !== 'undefined' ? 'Available' : 'Not available',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-gray-900 dark:text-white mb-2">
          NovaShop Diagnostics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          System status and configuration
        </p>

        <div className="grid gap-6 mb-8">
          {/* System Checks */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-gray-900 dark:text-white mb-4">System Checks</h2>
            <div className="space-y-3">
              {checks.map((check) => (
                <div
                  key={check.name}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded"
                >
                  {check.status ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">{check.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {check.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redux State */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-gray-900 dark:text-white mb-4">Redux State</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Cart Items:</span>
                <span className="text-gray-900 dark:text-white">{cart.items.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Cart Total:</span>
                <span className="text-gray-900 dark:text-white">${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Wishlist Items:</span>
                <span className="text-gray-900 dark:text-white">{wishlist.items.length}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Products Loaded:</span>
                <span className="text-gray-900 dark:text-white">{products.items.length}</span>
              </div>
            </div>
          </div>

          {/* Environment Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-gray-900 dark:text-white mb-4">Environment</h2>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">URL:</span>
                <span className="text-gray-900 dark:text-white truncate ml-4">
                  {window.location.href}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Pathname:</span>
                <span className="text-gray-900 dark:text-white">{window.location.pathname}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">User Agent:</span>
                <span className="text-gray-900 dark:text-white text-xs truncate ml-4">
                  {navigator.userAgent.slice(0, 50)}...
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-orange-50 dark:bg-orange-500/10 rounded-lg p-6 border border-orange-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white/70 mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link
                to="/"
                className="px-4 py-2 bg-orange-500 text-white rounded text-center hover:bg-orange-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="px-4 py-2 bg-orange-500 text-white rounded text-center hover:bg-orange-600 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="px-4 py-2 bg-orange-500 text-white rounded text-center hover:bg-orange-600 transition-colors"
              >
                Cart
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-500 text-white rounded text-center hover:bg-orange-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-orange-500 text-white rounded text-center hover:bg-orange-600 transition-colors"
              >
                Register
              </Link>
              <Link
                to="/admin"
                className="px-4 py-2 bg-orange-500 text-white rounded text-center hover:bg-orange-600 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-900 dark:text-orange-300 mb-2">
                  <strong>Note:</strong> This is a diagnostic page for development purposes.
                </p>
                <p className="text-sm text-orange-800 dark:text-orange-400">
                  If you're seeing a 404 page instead of the homepage, check the browser console
                  for errors and verify that you're accessing the root path (/).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
