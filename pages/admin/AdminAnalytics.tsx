import { useEffect, useState } from 'react';
import { analyticsApi } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await analyticsApi.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-gray-900 dark:text-white">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Sales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="mb-6 text-gray-900 dark:text-white">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.salesChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Bar dataKey="sales" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="mb-6 text-gray-900 dark:text-white">Top Categories</h2>
          <div className="space-y-4">
            {['Electronics', 'Fashion', 'Wearables', 'Accessories', 'Computers'].map(
              (category, index) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {Math.floor(Math.random() * 200) + 50} sales
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="mb-6 text-gray-900 dark:text-white">Revenue Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
            <p className="text-2xl text-gray-900 dark:text-white">
              ${(stats.totalRevenue / 12).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Quarter</p>
            <p className="text-2xl text-gray-900 dark:text-white">
              ${(stats.totalRevenue / 4).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Year</p>
            <p className="text-2xl text-gray-900 dark:text-white">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Projected</p>
            <p className="text-2xl text-green-600 dark:text-green-400">
              ${(stats.totalRevenue * 1.125).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
