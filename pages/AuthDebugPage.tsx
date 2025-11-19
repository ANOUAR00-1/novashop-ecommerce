import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function AuthDebugPage() {
  const { user, token, isAuthenticated, hasRole, loading } = useAuth();

  const checkLocalStorage = () => {
    const savedToken = localStorage.getItem('novashop_token');
    const savedUser = localStorage.getItem('novashop_user');
    return { savedToken, savedUser };
  };

  const { savedToken, savedUser } = checkLocalStorage();

  const clearAuth = () => {
    localStorage.removeItem('novashop_token');
    localStorage.removeItem('novashop_user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Authentication Debug
        </h1>

        {/* Auth Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Current Auth Status
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {loading ? (
                <RefreshCw className="w-6 h-6 text-orange-500 animate-spin" />
              ) : isAuthenticated ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
              </span>
            </div>

            {user && (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>User Email:</strong> {user.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {hasRole('admin') ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Role:</strong> {user.role}
                  </span>
                </div>
              </>
            )}

            {token && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div className="flex-1 text-gray-700 dark:text-gray-300">
                  <strong>Token:</strong>
                  <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono break-all">
                    {token.substring(0, 50)}...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LocalStorage */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            LocalStorage Data
          </h2>

          <div className="space-y-4">
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Token in localStorage:</strong>
              {savedToken ? (
                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono break-all text-gray-700 dark:text-gray-300">
                  {savedToken.substring(0, 50)}...
                </div>
              ) : (
                <p className="mt-2 text-red-600">No token found</p>
              )}
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">User in localStorage:</strong>
              {savedUser ? (
                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono break-all text-gray-700 dark:text-gray-300">
                  {savedUser}
                </div>
              ) : (
                <p className="mt-2 text-red-600">No user found</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isAuthenticated && (
              <Link
                to="/login"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-center"
              >
                Go to Login
              </Link>
            )}

            {isAuthenticated && hasRole('admin') && (
              <Link
                to="/admin"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Go to Admin Dashboard
              </Link>
            )}

            <button
              onClick={clearAuth}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Auth & Reload
            </button>

            <Link
              to="/"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
            >
              Go to Home
            </Link>
          </div>
        </div>

        {/* Admin Credentials */}
        <div className="mt-8 bg-orange-50 dark:bg-orange-500/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            Admin Credentials
          </h3>
          <div className="space-y-2 text-blue-800 dark:text-blue-200">
            <p><strong>Email:</strong> admin@novashop.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
