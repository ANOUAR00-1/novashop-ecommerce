import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ShoppingCart, Heart, Star, Minus, Plus, Share2 } from 'lucide-react';
import { Product } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { RootState } from '../../store';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { usePendingAction } from '../../hooks/usePendingAction';
import { useLanguage } from '../../contexts/LanguageContext';
import ProductBadge from '../ui/ProductBadge';
import { getProductNameKey, getProductDescriptionKey } from '../../utils/translateProduct';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.variants?.sizes?.[0] || '');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const { savePendingAction } = usePendingAction();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const images = product.images || [product.image];
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      savePendingAction({
        type: 'add-to-cart',
        product: product,
        returnUrl: location.pathname,
      });
      toast.info(t('toast.loginRequired'));
      onClose();
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    }));
    toast.success(t('toast.itemAddedToCart', { name: product.name }));
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      savePendingAction({
        type: 'add-to-wishlist',
        product: product,
        returnUrl: location.pathname,
      });
      toast.info(t('toast.loginRequired'));
      onClose();
      navigate('/login', { state: { from: location } });
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info(t('toast.itemRemovedFromWishlist', { name: product.name }));
    } else {
      dispatch(addToWishlist(product));
      toast.success(t('toast.itemAddedToWishlist', { name: product.name }));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('product.linkCopied'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('product.quickView')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4">
                  <ProductBadge type="sale" discount={discount} />
                </div>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-4 right-4">
                  <ProductBadge type="limited" />
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-orange-500 scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t(getProductNameKey(product.id))}
            </h3>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t(getProductDescriptionKey(product.id))}
            </p>

            {product.variants?.colors && product.variants.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t('product.color')}</label>
                <div className="flex gap-2">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.sizes && product.variants.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t('product.size')}</label>
                <div className="flex gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{t('product.quantity')}</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('product.available', { count: product.stock })}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {t('product.addToCart')}
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isInWishlist
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500'
                    : 'border-gray-300 dark:border-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {product.stock < 10 && product.stock > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ {t('product.limitedStock', { count: product.stock })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
