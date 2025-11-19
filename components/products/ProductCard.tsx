import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, GitCompare } from 'lucide-react';
import { Product } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProductComparison } from '../../hooks/useProductComparison';
import { usePendingAction } from '../../hooks/usePendingAction';
import ProductBadge from '../ui/ProductBadge';
import QuickViewModal from './QuickViewModal';
import { getImageUrl } from '../../utils/imageUrl';

interface ProductCardProps {
  product: Product;
  showFlashBadge?: boolean;
}

export default function ProductCard({ product, showFlashBadge = false }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { savePendingAction } = usePendingAction();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.productId === product.id);
  const { addToCompare, isInCompare, canAddMore } = useProductComparison();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      savePendingAction({
        type: 'add-to-cart',
        product: product,
        returnUrl: location.pathname,
      });
      toast.info(t('auth.pleaseLogin'));
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(
      addToCart({
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success(t('toast.itemAddedToCart', { name: product.name }));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      savePendingAction({
        type: 'add-to-wishlist',
        product: product,
        returnUrl: location.pathname,
      });
      toast.info(t('auth.pleaseLogin'));
      navigate('/login', { state: { from: location } });
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info(t('wishlist.removedFromWishlist'));
    } else {
      dispatch(
        addToWishlist({
          id: `wish-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      );
      toast.success(t('toast.itemAddedToWishlist', { name: product.name }));
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canAddMore && !isInCompare(product.id)) {
      toast.warning(t('product.maxComparisonReached'));
      return;
    }
    if (addToCompare(product)) {
      toast.success(t('product.addedToComparison'));
    } else {
      toast.info(t('product.alreadyInComparison'));
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  return (
    <>
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-soft hover:shadow-strong hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:-translate-y-1">
        <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {showFlashBadge && <ProductBadge type="hot" />}
            {discount > 0 && <ProductBadge type="sale" discount={discount} />}
            {product.stock < 10 && product.stock > 0 && <ProductBadge type="limited" />}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500">
            <button
              onClick={handleWishlist}
              className={`p-3 rounded-xl backdrop-blur-md shadow-lg transition-all duration-300 transform hover:scale-125 ${
                isInWishlist
                  ? 'bg-red-500 text-white scale-110 shadow-red-500/50'
                  : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white hover:shadow-red-500/30'
              }`}
              title={isInWishlist ? t('product.removeFromWishlist') : t('product.addToWishlist')}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleQuickView}
              className="p-3 rounded-xl bg-white/90 backdrop-blur-md shadow-lg text-gray-700 hover:bg-orange-500 hover:text-white hover:scale-125 hover:shadow-orange-500/30 transition-all duration-300 transform"
              title={t('product.quickView')}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleCompare}
              className={`p-3 rounded-xl backdrop-blur-md shadow-lg transition-all duration-300 transform hover:scale-125 ${
                isInCompare(product.id)
                  ? 'bg-green-500 text-white scale-110 shadow-green-500/50'
                  : 'bg-white/90 text-gray-700 hover:bg-green-500 hover:text-white hover:shadow-green-500/30'
              }`}
              title={isInCompare(product.id) ? t('product.inComparison') : t('product.compare')}
            >
              <GitCompare className="w-5 h-5" />
            </button>
          </div>

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
                {t('product.outOfStock')}
              </span>
            </div>
          )}
        </Link>

        <div className="p-5">
          <Link to={`/products/${product.id}`}>
            <p className="text-xs text-orange-500 dark:text-orange-400 mb-2 uppercase tracking-wider font-semibold">
              {typeof product.category === 'object' && product.category?.name 
                ? product.category.name 
                : typeof product.category === 'string' 
                  ? product.category 
                  : 'Uncategorized'}
            </p>
            <h3 className="mb-3 text-gray-900 dark:text-white line-clamp-2 font-semibold text-lg hover:text-orange-500 dark:hover:text-orange-400 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-bold">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({(product.reviewCount || 0).toLocaleString()})
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-semibold group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
            {product.stock === 0 ? t('product.outOfStock') : t('product.addToCart')}
          </button>

          {product.stock < 10 && product.stock > 0 && (
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-3 text-center font-semibold bg-orange-50 dark:bg-orange-900/20 py-2 rounded-lg animate-pulse">
              {t('product.limitedStock', { count: product.stock })}
            </p>
          )}
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}
