import { useState, useEffect } from 'react';
import { Star, Search, Eye, Trash2, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import BackButton from '../../components/BackButton';
// import { reviewsApi } from '../../services/api'; // TODO: Uncomment when backend endpoint is ready

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  isVerifiedPurchase: boolean;
}

export default function AdminReviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // NOTE: Backend needs GET /api/v1/reviews/admin/all endpoint
      // For now, showing empty reviews until endpoint is added
      // const data = await reviewsApi.getAll();
      setReviews([]);
      
      console.warn('Reviews admin endpoint not yet implemented in backend. Add GET /api/v1/reviews/admin/all');
    } catch (error) {
      console.error('Failed to load reviews:', error);
      toast.error(t('admin.reviewManagement.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      // TODO: await reviewsApi.updateStatus(id, 'approved');
      setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
      toast.success(t('admin.reviewManagement.approved'));
    } catch (error) {
      toast.error(t('admin.reviewManagement.approveFailed'));
    }
  };

  const handleReject = async (id: string) => {
    try {
      // TODO: await reviewsApi.updateStatus(id, 'rejected');
      setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
      toast.success(t('admin.reviewManagement.rejected'));
    } catch (error) {
      toast.error(t('admin.reviewManagement.rejectFailed'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('admin.confirmDeleteReview'))) {
      try {
        // TODO: await reviewsApi.delete(id);
        setReviews(reviews.filter(r => r.id !== id));
        toast.success(t('admin.reviewManagement.deleted'));
      } catch (error) {
        toast.error(t('admin.reviewManagement.deleteFailed'));
      }
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.productName.toLowerCase().includes(search.toLowerCase()) ||
      review.userName.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase());
    
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    
    return matchesSearch && matchesRating && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('admin.reviewsManagement')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('admin.manageReviews')}
          </p>
        </div>
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
            placeholder={t('admin.searchReviews')}
            className="w-full pl-10 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Rating Filter */}
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">{t('admin.allRatings')}</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">{t('admin.allStatus')}</option>
          <option value="approved">{t('admin.approved')}</option>
          <option value="pending">{t('admin.pending')}</option>
          <option value="rejected">{t('admin.rejected')}</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalReviews')}</p>
          <p className="text-2xl text-gray-900 dark:text-white">{reviews.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.pending')}</p>
          <p className="text-2xl text-yellow-600 dark:text-yellow-400">
            {reviews.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.approved')}</p>
          <p className="text-2xl text-green-600 dark:text-green-400">
            {reviews.filter(r => r.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.averageRating')}</p>
          <p className="text-2xl text-orange-500 dark:text-orange-400">
            {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} ⭐
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              {/* Product Image */}
              <Link to={`/products/${review.productId}`}>
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </Link>

              {/* Review Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Link
                      to={`/products/${review.productId}`}
                      className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      {review.productName}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        by {review.userName}
                      </span>
                      {review.isVerifiedPurchase && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs capitalize ${getStatusBadge(review.status)}`}>
                    {review.status}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {review.rating}/5
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {review.comment}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{new Date(review.createdAt).toLocaleString()}</span>
                    <span>•</span>
                    <span>{review.userEmail}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${review.productId}`}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="View product"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    {review.status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        title="Approve review"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    
                    {review.status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(review.id)}
                        className="p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
                        title="Reject review"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title={t('admin.deleteReview')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('admin.noReviewsFound')}</p>
        </div>
      )}
    </div>
  );
}
