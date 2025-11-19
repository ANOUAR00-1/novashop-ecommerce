import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchOrderById } from '../store/slices/ordersSlice';
import BackButton from '../components/BackButton';

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const { currentOrder: order, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [orderId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-gray-900 dark:text-white">Order not found</h2>
          <Link
            to="/orders"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        {/* Success Message */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h1 className="mb-2 text-gray-900 dark:text-white">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-gray-900 dark:text-white">
            Order ID: <span className="text-blue-600 dark:text-blue-400">{order.id}</span>
          </p>
        </div>

        {/* Order Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="mb-6 text-gray-900 dark:text-white">Order Status</h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-gray-900 dark:text-white">Confirmed</p>
            </div>
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                <Truck className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Shipping</p>
            </div>
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="mb-4 text-gray-900 dark:text-white">Shipping Address</h2>
          <div className="text-gray-600 dark:text-gray-400">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="mb-4 text-gray-900 dark:text-white">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400">
              <span>Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Orders
          </Link>
          <Link
            to="/products"
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-center rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
