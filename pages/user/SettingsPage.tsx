import { useState } from 'react';
import { User, MapPin, Bell, Shield, CreditCard, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner';
import BackButton from '../../components/BackButton';

export default function SettingsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'home',
      name: 'Home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      name: 'Office',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false,
    },
  ]);

  const tabs = [
    { id: 'profile', icon: User, label: t('settings.tabs.profile') },
    { id: 'addresses', icon: MapPin, label: t('settings.tabs.addresses') },
    { id: 'notifications', icon: Bell, label: t('settings.tabs.notifications') },
    { id: 'security', icon: Shield, label: t('settings.tabs.security') },
    { id: 'payment', icon: CreditCard, label: t('settings.tabs.payment') },
  ];

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success(t('settings.addressDeleted'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t('settings.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                      activeTab === tab.id
                        ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('settings.profile.title')}
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('auth.firstName')}
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.firstName}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('auth.lastName')}
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.lastName}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('auth.email')}
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('auth.phone')}
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (234) 567-890"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      {t('common.save')} {t('settings.profile.changes')}
                    </button>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('settings.addresses.title')}
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      <Plus className="w-5 h-5" />
                      {t('settings.addresses.addNew')}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div
                        key={address.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {address.name}
                              </h3>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 text-xs font-semibold rounded">
                                  {t('settings.addresses.default')}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                              {address.address}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-colors">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('settings.notifications.title')}
                  </h2>
                  <div className="space-y-4">
                    {[
                      { id: 'orders', label: t('settings.notifications.orderUpdates') },
                      { id: 'promotions', label: t('settings.notifications.promotions') },
                      { id: 'newsletter', label: t('settings.notifications.newsletter') },
                      { id: 'recommendations', label: t('settings.notifications.recommendations') },
                    ].map(option => (
                      <label key={option.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                        <span className="text-gray-900 dark:text-white">{option.label}</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('settings.security.title')}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('profile.currentPassword')}
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('profile.newPassword')}
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('auth.confirmPassword')}
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      {t('settings.security.updatePassword')}
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('settings.payment.title')}
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      <Plus className="w-5 h-5" />
                      {t('settings.payment.addCard')}
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('settings.payment.noCards')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
