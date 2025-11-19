import { Link } from 'react-router-dom';
import { X, ArrowLeft, Check, Minus, ShoppingCart } from 'lucide-react';
import { useProductComparison } from '../hooks/useProductComparison';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import BackButton from '../components/BackButton';
import { getProductNameKey } from '../utils/translateProduct';

export default function ComparisonPage() {
  const { t } = useLanguage();
  const { comparedProducts, removeFromComparison, clearComparison } = useProductComparison();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }));
    toast.success(t('cart.itemAdded', { name: product.name }));
  };

  if (comparedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Minus className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('comparison.empty')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('comparison.emptyDescription')}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('comparison.browseProducts')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allFeatures = Array.from(
    new Set(
      comparedProducts.flatMap(p => p.features || [])
    )
  );

  const allSpecs = Array.from(
    new Set(
      comparedProducts.flatMap(p => Object.keys(p.specifications || {}))
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <BackButton />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('comparison.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('comparison.subtitle', { count: comparedProducts.length })}
            </p>
          </div>
          <button
            onClick={clearComparison}
            className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            {t('comparison.clearAll')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 text-left text-gray-900 dark:text-white font-semibold w-48">
                  {t('comparison.feature')}
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="p-4 text-center relative">
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {t(getProductNameKey(product.id))}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      ${product.price}
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-900 dark:text-white">{product.rating}</span>
                      <span className="text-gray-500 text-sm">({product.reviews})</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t('common.addToCart')}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price */}
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  {t('product.price')}
                </td>
                {comparedProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  {t('product.category')}
                </td>
                {comparedProducts.map(product => (
                  <td key={product.id} className="p-4 text-center text-gray-700 dark:text-gray-300">
                    {product.category}
                  </td>
                ))}
              </tr>

              {/* Stock */}
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  {t('filters.availability')}
                </td>
                {comparedProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    {product.stock > 0 ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" />
                        {t('common.inStock')} ({product.stock})
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">
                        {t('common.outOfStock')}
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Features */}
              {allFeatures.length > 0 && (
                <>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td colSpan={comparedProducts.length + 1} className="p-4 font-bold text-gray-900 dark:text-white">
                      {t('product.features')}
                    </td>
                  </tr>
                  {allFeatures.map((feature, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 text-gray-700 dark:text-gray-300">{feature}</td>
                      {comparedProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          {product.features?.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}

              {/* Specifications */}
              {allSpecs.length > 0 && (
                <>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td colSpan={comparedProducts.length + 1} className="p-4 font-bold text-gray-900 dark:text-white">
                      {t('product.specifications')}
                    </td>
                  </tr>
                  {allSpecs.map((spec, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 text-gray-700 dark:text-gray-300">{spec}</td>
                      {comparedProducts.map(product => (
                        <td key={product.id} className="p-4 text-center text-gray-700 dark:text-gray-300">
                          {product.specifications?.[spec] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
