import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={onClose}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            All Products
          </Link>
          <Link
            to="/products?category=Electronics"
            onClick={onClose}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            Electronics
          </Link>
          <Link
            to="/products?category=Fashion"
            onClick={onClose}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            Fashion
          </Link>
          <Link
            to="/products?category=Wearables"
            onClick={onClose}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            Wearables
          </Link>

          {isAuthenticated && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <Link
                to="/profile"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                Profile
              </Link>
              <Link
                to="/orders"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                Wishlist
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={onClose}
              className="block px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
