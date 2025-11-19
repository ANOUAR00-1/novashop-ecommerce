import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCategoryTranslationKey } from '../../utils/translateCategory';
import { getProductNameKey, getProductDescriptionKey } from '../../utils/translateProduct';

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.productId === product.id);

  const handleAddToCart = () => {
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

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error(t('toast.loginRequired'));
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success(t('toast.itemRemovedFromWishlist', { name: product.name }));
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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex gap-4">
      <Link to={`/products/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {t(getCategoryTranslationKey(product.category))}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="mb-2 text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400">
            {t(getProductNameKey(product.id))}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {t(getProductDescriptionKey(product.id))}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl text-orange-500 dark:text-orange-400">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-lg transition-colors ${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {t('product.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
