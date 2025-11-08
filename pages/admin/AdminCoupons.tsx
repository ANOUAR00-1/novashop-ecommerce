import { Plus } from 'lucide-react';

export default function AdminCoupons() {
  const coupons = [
    { id: '1', code: 'SAVE20', discount: 20, type: 'percentage', expiresAt: '2024-12-31', uses: 45 },
    { id: '2', code: 'FREESHIP', discount: 10, type: 'fixed', expiresAt: '2024-11-30', uses: 128 },
    { id: '3', code: 'WELCOME10', discount: 10, type: 'percentage', expiresAt: '2024-12-15', uses: 89 },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-gray-900 dark:text-white">Coupons</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <code className="text-sm">{coupon.code}</code>
              </div>
              <span className="text-2xl text-gray-900 dark:text-white">
                {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Used: {coupon.uses} times
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
