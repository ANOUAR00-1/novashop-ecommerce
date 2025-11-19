import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { usePendingAction } from '../../hooks/usePendingAction';
import { useAppDispatch } from '../../store';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist } from '../../store/slices/wishlistSlice';
import { ShoppingCart, Heart, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { getPendingAction, clearPendingAction } = usePendingAction();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingActionInfo, setPendingActionInfo] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/';
  const pendingAction = getPendingAction();

  useEffect(() => {
    if (pendingAction) {
      if (pendingAction.type === 'add-to-cart' && pendingAction.product) {
        setPendingActionInfo(t('auth.loginToAddCart', { product: pendingAction.product.name }));
      } else if (pendingAction.type === 'add-to-wishlist' && pendingAction.product) {
        setPendingActionInfo(t('auth.loginToAddWishlist', { product: pendingAction.product.name }));
      } else if (pendingAction.type === 'checkout') {
        setPendingActionInfo(t('auth.loginToCheckout'));
      }
    }
  }, [pendingAction, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      
      toast.success(t('auth.loginSuccess'));

      if (pendingAction) {
        if (pendingAction.type === 'add-to-cart' && pendingAction.product) {
          dispatch(
            addToCart({
              id: `${pendingAction.product.id}-${Date.now()}`,
              productId: pendingAction.product.id,
              name: pendingAction.product.name,
              price: pendingAction.product.price,
              image: pendingAction.product.image,
              quantity: 1,
            })
          );
          toast.success(t('toast.itemAddedToCart', { name: pendingAction.product.name }));
        } else if (pendingAction.type === 'add-to-wishlist' && pendingAction.product) {
          dispatch(
            addToWishlist({
              id: `wish-${pendingAction.product.id}`,
              productId: pendingAction.product.id,
              name: pendingAction.product.name,
              price: pendingAction.product.price,
              image: pendingAction.product.image,
            })
          );
          toast.success(t('toast.itemAddedToWishlist', { name: pendingAction.product.name }));
        }

        clearPendingAction();
        
        if (pendingAction.returnUrl) {
          navigate(pendingAction.returnUrl);
        } else {
          navigate(from, { replace: true });
        }
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="mb-2 text-gray-900 dark:text-white">{t('auth.welcomeBack')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {pendingActionInfo && (
          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-500/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              {pendingAction?.type === 'add-to-cart' && (
                <ShoppingCart className="w-5 h-5 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              )}
              {pendingAction?.type === 'add-to-wishlist' && (
                <Heart className="w-5 h-5 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              )}
              {pendingAction?.type === 'checkout' && (
                <AlertCircle className="w-5 h-5 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Action Pending
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  {pendingActionInfo}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                {t('auth.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                {t('auth.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={t('auth.passwordPlaceholder')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('auth.rememberMe')}
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-orange-500 dark:text-orange-400 hover:underline"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t('auth.loggingIn') : t('auth.signIn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('auth.dontHaveAccount')}{' '}
              <Link
                to="/register"
                className="text-orange-500 dark:text-orange-400 hover:underline"
              >
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
