import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { toast } from 'sonner';
import BackButton from '../components/BackButton';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success('Removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const shippingCost = total > 50 ? 0 : 10;
  const tax = total * 0.1;
  const grandTotal = total + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h2 className="mb-2 text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some products to get started
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-900 dark:text-white">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 dark:text-red-400 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link
                    to={`/products/${item.productId}`}
                    className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400"
                  >
                    {item.name}
                  </Link>
                  {item.variant && (
                    <div className="flex gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.variant.color && <span>Color: {item.variant.color}</span>}
                      {item.variant.size && <span>Size: {item.variant.size}</span>}
                    </div>
                  )}
                  <p className="mt-2 text-orange-500 dark:text-orange-400">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-700 dark:text-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-700 dark:text-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="mb-6 text-gray-900 dark:text-white">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {total < 50 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Add ${(50 - total).toFixed(2)} more for free shipping!
                </p>
              )}

              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
