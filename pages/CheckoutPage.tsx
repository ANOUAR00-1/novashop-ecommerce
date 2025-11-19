import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { createOrder } from '../store/slices/ordersSlice';
import { clearCart } from '../store/slices/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { CreditCard, Smartphone } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { items, total } = useAppSelector((state) => state.cart);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [processing, setProcessing] = useState(false);

  const shippingCost = total > 50 ? 0 : 10;
  const tax = total * 0.1;
  const grandTotal = total + shippingCost + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const orderData = {
        userId: user?.id || 'guest',
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: grandTotal,
        shippingAddress: shippingInfo,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'PayPal',
      };

      const result = await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${result.id}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        <h1 className="mb-8 text-gray-900 dark:text-white">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-24 h-1 ${
                    step >= 2
                      ? 'bg-orange-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                ></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="mb-6 text-gray-900 dark:text-white">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                        State
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, phone: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 dark:text-white">Payment Method</h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-orange-500 dark:text-orange-400 hover:underline"
                  >
                    Edit Shipping
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-orange-500 bg-orange-50 dark:bg-gray-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <div className="text-left">
                      <p className="text-gray-900 dark:text-white">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Secure payment with SSL encryption
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-orange-500 bg-orange-50 dark:bg-gray-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Smartphone className="w-6 h-6" />
                    <div className="text-left">
                      <p className="text-gray-900 dark:text-white">PayPal</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fast and secure checkout
                      </p>
                    </div>
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Note:</strong> This is a demo checkout. No real payment will be processed.
                  </p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="mb-6 text-gray-900 dark:text-white">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
