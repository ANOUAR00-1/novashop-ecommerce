import { useState, useEffect } from 'react';
import { Shield, User as UserIcon, Search, Plus, Edit, Trash2, Ban, CheckCircle, Mail } from 'lucide-react';
import { toast } from 'sonner';
import UserFormModal from '../../components/admin/UserFormModal';
import { useLanguage } from '../../contexts/LanguageContext';
import BackButton from '../../components/BackButton';
import { usersApi } from '../../services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  status?: 'active' | 'banned' | 'pending';
  avatar?: string;
  phone?: string;
  joinDate?: string;
  lastLogin?: string;
  totalOrders?: number;
  totalSpent?: number;
  createdAt?: string;
}

export default function AdminUsers() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error(t('admin.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('admin.confirmDeleteUser'))) {
      try {
        // TODO: await usersApi.delete(id);
        setUsers(users.filter(u => u.id !== id));
        toast.success(t('admin.userForm.userDeleted'));
      } catch (error) {
        toast.error(t('admin.userForm.userDeleteFailed'));
      }
    }
  };

  const handleBanToggle = async (user: User) => {
    try {
      const newStatus = user.status === 'banned' ? 'active' : 'banned';
      // TODO: await usersApi.updateStatus(user.id, newStatus);
      
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, status: newStatus } : u
      ));
      
      toast.success(user.status === 'banned' ? t('admin.userForm.userUnbanned') : t('admin.userForm.userBanned'));
    } catch (error) {
      toast.error(t('admin.userForm.statusUpdateFailed'));
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleFormSuccess = () => {
    loadUsers();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'banned':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('admin.usersManagement')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('admin.manageUsers')}
          </p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('admin.addUser')}
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
            placeholder={t('admin.searchUsers')}
            className="w-full pl-10 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">{t('admin.allRoles')}</option>
          <option value="user">{t('admin.userForm.roleUser')}</option>
          <option value="admin">{t('admin.userForm.roleAdmin')}</option>
          <option value="superadmin">{t('admin.userForm.roleSuperAdmin')}</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">{t('admin.allStatus')}</option>
          <option value="active">{t('admin.active')}</option>
          <option value="banned">{t('admin.banned')}</option>
          <option value="pending">{t('admin.pending')}</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalUsers')}</p>
          <p className="text-2xl text-gray-900 dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.active')}</p>
          <p className="text-2xl text-green-600 dark:text-green-400">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.banned')}</p>
          <p className="text-2xl text-red-600 dark:text-red-400">
            {users.filter(u => u.status === 'banned').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.pending')}</p>
          <p className="text-2xl text-yellow-600 dark:text-yellow-400">
            {users.filter(u => u.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.user')}
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.ordersSpent')}
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.joinDate')}
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' || user.role === 'superadmin'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          : 'bg-orange-100 dark:bg-gray-900/30 text-orange-500 dark:text-orange-400'
                      }`}
                    >
                      {user.role === 'admin' || user.role === 'superadmin' ? (
                        <Shield className="w-3 h-3" />
                      ) : (
                        <UserIcon className="w-3 h-3" />
                      )}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusBadge(user.status || 'active')}`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.totalOrders || 0} orders / ${(user.totalSpent || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="p-2 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-900/30 rounded-lg transition-colors"
                        title={t('admin.editUser')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleBanToggle(user)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === 'banned'
                            ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
                            : 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30'
                        }`}
                        title={user.status === 'banned' ? t('admin.unbanUser') : t('admin.banUser')}
                      >
                        {user.status === 'banned' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                      <a
                        href={`mailto:${user.email}`}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title={t('admin.sendEmail')}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title={t('admin.deleteUser')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <UserFormModal
          user={selectedUser}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
