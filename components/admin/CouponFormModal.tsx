import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';

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
  isActive: boolean;
}

interface CouponFormModalProps {
  coupon: Coupon | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CouponFormModal({ coupon, onClose, onSuccess }: CouponFormModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed',
    discount: 0,
    minPurchase: 0,
    maxDiscount: 0,
    expiresAt: '',
    usageLimit: 0,
    isActive: true,
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        description: coupon.description,
        type: coupon.type,
        discount: coupon.discount,
        minPurchase: coupon.minPurchase || 0,
        maxDiscount: coupon.maxDiscount || 0,
        expiresAt: coupon.expiresAt,
        usageLimit: coupon.usageLimit || 0,
        isActive: coupon.isActive,
      });
    }
  }, [coupon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (formData.discount <= 0) {
        toast.error(t('admin.couponForm.discountGreaterThanZero'));
        return;
      }

      if (formData.type === 'percentage' && formData.discount > 100) {
        toast.error(t('admin.couponForm.percentageMax'));
        return;
      }

      if (formData.type === 'percentage' && formData.discount < 1) {
        toast.error(t('admin.couponForm.percentageMin'));
        return;
      }

      if (new Date(formData.expiresAt) <= new Date()) {
        toast.error(t('admin.couponForm.expirationFuture'));
        return;
      }

      if (coupon) {
        // TODO: await couponsApi.update(coupon.id, formData);
        toast.success(t('admin.couponForm.couponUpdated'));
      } else {
        // TODO: await couponsApi.create(formData);
        toast.success(t('admin.couponForm.couponCreated'));
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(coupon ? t('admin.couponForm.couponUpdateFailed') : t('admin.couponForm.couponCreateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 dark:text-white">
              {coupon ? t('admin.couponForm.editCoupon') : t('admin.couponForm.createCoupon')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                {t('admin.couponForm.couponCode')}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  required
                  maxLength={20}
                  placeholder={t('admin.couponForm.couponCodePlaceholder')}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={generateCode}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                >
                  {t('admin.couponForm.generate')}
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                {t('admin.couponForm.description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                placeholder={t('admin.couponForm.descriptionPlaceholder')}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type & Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  {t('admin.couponForm.discountType')}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as any })
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">{t('admin.couponForm.discountTypePercentage')}</option>
                  <option value="fixed">{t('admin.couponForm.discountTypeFixed')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  {t('admin.couponForm.discountValue')}
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })
                  }
                  required
                  min={formData.type === 'percentage' ? 1 : 0.01}
                  max={formData.type === 'percentage' ? 100 : undefined}
                  step={formData.type === 'percentage' ? 1 : 0.01}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Min Purchase & Max Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  {t('admin.couponForm.minPurchase')}
                </label>
                <input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) =>
                    setFormData({ ...formData, minPurchase: parseFloat(e.target.value) || 0 })
                  }
                  min={0}
                  step={0.01}
                  placeholder={t('admin.couponForm.minPurchasePlaceholder')}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {formData.type === 'percentage' && (
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    {t('admin.couponForm.maxDiscount')}
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) =>
                      setFormData({ ...formData, maxDiscount: parseFloat(e.target.value) || 0 })
                    }
                    min={0}
                    step={0.01}
                    placeholder={t('admin.couponForm.maxDiscountPlaceholder')}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Expiration & Usage Limit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  {t('admin.couponForm.expirationDate')}
                </label>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  {t('admin.couponForm.usageLimit')}
                </label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 0 })
                  }
                  min={0}
                  placeholder={t('admin.couponForm.usageLimitPlaceholder')}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                {t('admin.couponForm.activeHint')}
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t('common.saving') : (coupon ? t('admin.couponForm.updateCoupon') : t('admin.couponForm.createCouponButton'))}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
