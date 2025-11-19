import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOrders } from '../../store/slices/ordersSlice';
import BackButton from '../../components/BackButton';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { items: orders, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'shipped':
        return 'bg-orange-100 dark:bg-blue-900/30 text-orange-500 dark:text-orange-400';
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <BackButton />
        <h1 className="mb-8 text-gray-900 dark:text-white">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="mb-2 text-gray-900 dark:text-white">No orders yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your orders here
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="mb-1 text-gray-900 dark:text-white">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
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

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    {order.items.length} item(s)
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
