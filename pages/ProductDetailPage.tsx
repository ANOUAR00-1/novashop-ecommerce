import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProductById, clearCurrentProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { reviewsApi, Review } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import BackButton from '../components/BackButton';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductNameKey, getProductDescriptionKey } from '../utils/translateProduct';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { currentProduct: product, loading } = useAppSelector((state) => state.products);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<{ size?: string; color?: string }>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const isInWishlist = product && wishlist.some((item) => item.productId === product.id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      loadReviews(id);
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  const loadReviews = async (productId: string) => {
    try {
      const data = await reviewsApi.getByProductId(productId);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Check stock availability
    if (product.stock === 0) {
      toast.error('This product is out of stock');
      return;
    }
    
    if (product.stock < quantity) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }
    
    dispatch(
      addToCart({
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        variant: selectedVariant,
      })
    );
    toast.success('Added to cart');
  };

  const handleWishlist = () => {
    if (!product) return;
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
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
      toast.success('Added to wishlist');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-gray-900 dark:text-white">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx
                        ? 'border-orange-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {product.category}
            </p>
            <h1 className="mb-4 text-gray-900 dark:text-white">
              {t(getProductNameKey(product.id))}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mb-6">
              {product.originalPrice && (
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through mr-3">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl text-orange-500 dark:text-orange-400">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-3 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t(getProductDescriptionKey(product.id))}
            </p>

            {/* Variants */}
            {product.variants?.colors && (
              <div className="mb-6">
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Color
                </label>
                <div className="flex gap-2">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedVariant({ ...selectedVariant, color })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant.color === color
                          ? 'border-orange-500 bg-orange-50 dark:bg-gray-900/30 text-orange-500 dark:text-orange-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.sizes && (
              <div className="mb-6">
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Size
                </label>
                <div className="flex gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedVariant({ ...selectedVariant, size })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant.size === size
                          ? 'border-orange-500 bg-orange-50 dark:bg-gray-900/30 text-orange-500 dark:text-orange-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  -
                </button>
                <span className="text-xl text-gray-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.stock} available)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-4 rounded-lg border-2 transition-colors ${
                  isInWishlist
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-600'
                }`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">On orders $50+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">1 Year Warranty</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">30 Day Returns</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Money back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex gap-8">
            {(['description', 'specifications', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 transition-colors capitalize ${
                  activeTab === tab
                    ? 'text-orange-500 dark:text-orange-400 border-b-2 border-orange-500'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === 'description' && (
            <div>
              <h3 className="mb-4 text-gray-900 dark:text-white">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t(getProductDescriptionKey(product.id))}
              </p>
              {product.features && (
                <>
                  <h4 className="mb-3 text-gray-900 dark:text-white">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-orange-500 dark:text-orange-400">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <div>
              <h3 className="mb-4 text-gray-900 dark:text-white">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">{key}</dt>
                    <dd className="text-gray-900 dark:text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="mb-6 text-gray-900 dark:text-white">
                Customer Reviews ({reviews.length})
              </h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          {review.userName}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
