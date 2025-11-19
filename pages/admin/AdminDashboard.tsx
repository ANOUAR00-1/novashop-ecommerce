import { useEffect, useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Package,
  AlertCircle,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { analyticsApi } from '../../services/api';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import BackButton from '../../components/BackButton';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  salesChart: Array<{
    month: string;
    sales: number;
    revenue?: number;
  }>;
  recentOrders?: Array<{
    id: string;
    customer: string;
    total: number;
    status: string;
    date: string;
  }>;
  lowStock?: Array<{
    id: string;
    name: string;
    stock: number;
    image: string;
  }>;
  pendingReviews?: number;
}

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) {
        setRefreshing(true);
      }
      
      const data = await analyticsApi.getDashboardStats();
      setStats(data);
      
      if (showRefreshToast) {
        toast.success(t('admin.dashboardRefreshed'));
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
      toast.error(t('admin.loadFailed'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleRefresh = () => {
    loadStats(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'shipped':
        return 'bg-orange-100 dark:bg-gray-900/30 text-orange-500 dark:text-orange-400';
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'pending':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  if (loading || !stats) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <BackButton />
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('admin.dashboard')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('admin.welcomeBack')}</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{t('admin.refresh')}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stats.revenueGrowth >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span className={stats.revenueGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {Math.abs(stats.revenueGrowth)}%
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalRevenue')}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            +${(stats.totalRevenue * 0.125).toLocaleString()} {t('admin.thisMonth')}
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-gray-900/30 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stats.ordersGrowth >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span className={stats.ordersGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {Math.abs(stats.ordersGrowth)}%
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalOrders')}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalOrders.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {Math.round(stats.totalOrders / 30)} {t('admin.ordersPerDay')}
          </p>
        </div>

        {/* Total Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stats.customersGrowth >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span className={stats.customersGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {Math.abs(stats.customersGrowth)}%
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalCustomers')}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalCustomers.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {Math.round(stats.totalCustomers * 0.15)} {t('admin.newThisMonth')}
          </p>
        </div>

        {/* Avg Order Value */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.avgOrderValue')}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${stats.averageOrderValue.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            ${(stats.averageOrderValue * 1.05).toFixed(2)} {t('admin.target')}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/admin/orders"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-4 transition-all hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">{t('admin.pendingOrders')}</p>
              <p className="text-2xl font-bold">
                {stats.recentOrders?.filter(o => o.status === 'pending').length || 0}
              </p>
            </div>
            <Clock className="w-8 h-8 opacity-80" />
          </div>
        </Link>

        <Link
          to="/admin/products"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg p-4 transition-all hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">{t('admin.lowStockItems')}</p>
              <p className="text-2xl font-bold">{stats.lowStock?.length || 0}</p>
            </div>
            <AlertCircle className="w-8 h-8 opacity-80" />
          </div>
        </Link>

        <Link
          to="/admin/reviews"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-4 transition-all hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">{t('admin.pendingReviews')}</p>
              <p className="text-2xl font-bold">{stats.pendingReviews || 0}</p>
            </div>
            <Star className="w-8 h-8 opacity-80" />
          </div>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('admin.salesOverview')}</h2>
            <select className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white">
              <option>{t('admin.last12Months')}</option>
              <option>{t('admin.last6Months')}</option>
              <option>{t('admin.last3Months')}</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.salesChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('admin.topProducts')}</h2>
            <Link to="/admin/products" className="text-sm text-orange-500 dark:text-orange-400 hover:underline">
              {t('admin.viewAll')}
            </Link>
          </div>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {product.sales} sales
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ${(product.revenue / product.sales).toFixed(2)}/unit
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('admin.recentOrders')}</h2>
            <Link to="/admin/orders" className="text-sm text-orange-500 dark:text-orange-400 hover:underline">
              {t('admin.viewAll')}
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentOrders?.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {order.customer} • {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('admin.lowStockAlert')}</h2>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">
                {stats.lowStock?.length}
              </span>
            </div>
            <Link to="/admin/products" className="text-sm text-orange-500 dark:text-orange-400 hover:underline">
              {t('common.manage')}
            </Link>
          </div>
          <div className="space-y-3">
            {stats.lowStock?.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="w-3 h-3 text-red-600 dark:text-red-400" />
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Only {product.stock} left
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600 transition-colors">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
