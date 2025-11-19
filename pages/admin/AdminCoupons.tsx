import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag, Search, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import CouponFormModal from '../../components/admin/CouponFormModal';
import { useLanguage } from '../../contexts/LanguageContext';
import BackButton from '../../components/BackButton';
import { couponsApi } from '../../services/api';

interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  discount: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCoupons() {
  const { t } = useLanguage();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const data = await couponsApi.getAll();
      setCoupons(data);
    } catch (error) {
      console.error('Failed to load coupons:', error);
      toast.error(t('admin.couponForm.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('admin.confirmDeleteCoupon'))) {
      try {
        // TODO: await couponsApi.delete(id);
        setCoupons(coupons.filter(c => c.id !== id));
        toast.success(t('admin.couponForm.couponDeleted'));
      } catch (error) {
        toast.error(t('admin.couponForm.couponDeleteFailed'));
      }
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      // TODO: await couponsApi.updateStatus(coupon.id, !coupon.isActive);
      
      setCoupons(coupons.map(c => 
        c.id === coupon.id ? { ...c, isActive: !c.isActive } : c
      ));
      
      toast.success(t('admin.couponForm.couponUpdated'));
    } catch (error) {
      toast.error(t('admin.couponForm.couponUpdateFailed'));
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedCoupon(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCoupon(null);
  };

  const handleFormSuccess = () => {
    loadCoupons();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(t('admin.couponForm.couponCopied'));
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(search.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || coupon.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && coupon.isActive && !isExpired(coupon.expiresAt)) ||
                          (statusFilter === 'inactive' && !coupon.isActive) ||
                          (statusFilter === 'expired' && isExpired(coupon.expiresAt));
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getUsagePercentage = (coupon: Coupon) => {
    if (!coupon.usageLimit) return 0;
    return (coupon.usageCount / coupon.usageLimit) * 100;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('admin.couponsManagement')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('admin.manageCoupons')}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('admin.addCoupon')}
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.searchCoupons')}
            className="w-full pl-10 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">{t('admin.allTypes')}</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">{t('admin.allStatus')}</option>
          <option value="active">{t('admin.active')}</option>
          <option value="inactive">{t('admin.inactive')}</option>
          <option value="expired">{t('admin.expired')}</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalCoupons')}</p>
          <p className="text-2xl text-gray-900 dark:text-white">{coupons.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.active')}</p>
          <p className="text-2xl text-green-600 dark:text-green-400">
            {coupons.filter(c => c.isActive && !isExpired(c.expiresAt)).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalUsage')}</p>
          <p className="text-2xl text-orange-500 dark:text-orange-400">
            {coupons.reduce((sum, c) => sum + c.usageCount, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.expired')}</p>
          <p className="text-2xl text-red-600 dark:text-red-400">
            {coupons.filter(c => isExpired(c.expiresAt)).length}
          </p>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((coupon) => {
          const expired = isExpired(coupon.expiresAt);
          const usagePercent = getUsagePercentage(coupon);
          const limitReached = coupon.usageLimit && coupon.usageCount >= coupon.usageLimit;
          
          return (
            <div
              key={coupon.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-6 border-2 transition-all ${
                expired
                  ? 'border-red-200 dark:border-red-900 opacity-60'
                  : !coupon.isActive
                  ? 'border-gray-200 dark:border-gray-700 opacity-75'
                  : 'border-orange-200 dark:border-gray-900 hover:border-orange-500 dark:hover:border-orange-600'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                    <button
                      onClick={() => handleCopyCode(coupon.code)}
                      className="group flex items-center gap-2"
                    >
                      <code className="text-lg text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-white/70 transition-colors">
                        {coupon.code}
                      </code>
                      {copiedCode === coupon.code ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {coupon.description}
                  </p>
                </div>
              </div>

              {/* Discount Value */}
              <div className="mb-4">
                <span className="text-3xl text-gray-900 dark:text-white">
                  {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {coupon.type === 'percentage' ? t('admin.off') : t('admin.discount')}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                {coupon.minPurchase && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    • Min. purchase: ${coupon.minPurchase}
                  </p>
                )}
                {coupon.maxDiscount && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    • Max. discount: ${coupon.maxDiscount}
                  </p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  • Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                  {expired && <span className="text-red-600 dark:text-red-400 ml-1">({t('admin.expiredLabel')})</span>}
                </p>
                {coupon.usageLimit && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    • Usage: {coupon.usageCount} / {coupon.usageLimit}
                    {limitReached && <span className="text-orange-600 dark:text-orange-400 ml-1">(Limit Reached)</span>}
                  </p>
                )}
                {!coupon.usageLimit && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    • Usage: {coupon.usageCount} (Unlimited)
                  </p>
                )}
              </div>

              {/* Usage Progress Bar */}
              {coupon.usageLimit && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        usagePercent >= 90
                          ? 'bg-red-600'
                          : usagePercent >= 70
                          ? 'bg-orange-600'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(usagePercent, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Status & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(coupon)}
                    disabled={expired}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                      coupon.isActive && !expired
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    } ${expired ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {coupon.isActive && !expired ? t('admin.active') : t('admin.inactive')}
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEdit(coupon)}
                    className="p-2 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-900/30 rounded-lg transition-colors"
                    title={t('admin.editCoupon')}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title={t('admin.deleteCoupon')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No coupons found</p>
        </div>
      )}

      {/* Coupon Form Modal */}
      {showForm && (
        <CouponFormModal
          coupon={selectedCoupon}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
