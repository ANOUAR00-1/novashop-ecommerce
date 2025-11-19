import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeFromWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { toast } from 'sonner';
import BackButton from '../../components/BackButton';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  const handleRemove = (productId: string) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item: typeof items[0]) => {
    dispatch(
      addToCart({
        id: `${item.productId}-${Date.now()}`,
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
    toast.success('Added to cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <BackButton />
        <h1 className="mb-8 text-gray-900 dark:text-white">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
            <Heart className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="mb-2 text-gray-900 dark:text-white">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add products you love to your wishlist
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group"
              >
                <div className="relative">
                  <Link to={`/products/${item.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </button>
                </div>

                <div className="p-4">
                  <Link
                    to={`/products/${item.productId}`}
                    className="block mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                  <p className="mb-4 text-blue-600 dark:text-blue-400">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
