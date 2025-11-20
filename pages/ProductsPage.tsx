import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProducts } from '../store/slices/productsSlice';
import { setCategory, setSearch, setSort } from '../store/slices/filtersSlice';
import ProductCard from '../components/products/ProductCard';
import ProductListItem from '../components/products/ProductListItem';
import FilterSidebar from '../components/products/FilterSidebar';
import Pagination from '../components/Pagination';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { items: products, loading, pagination } = useAppSelector((state) => state.products);
  const filters = useAppSelector((state) => state.filters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    
    if (category) dispatch(setCategory(category));
    if (search) dispatch(setSearch(search));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: pagination.page,
        limit: pagination.limit,
        category: filters.category,
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        sort: filters.sort,
        rating: filters.rating,
        inStock: filters.inStock,
      })
    );
  }, [dispatch, filters, pagination.page]);

  const handlePageChange = (page: number) => {
    dispatch(fetchProducts({ ...filters, page, limit: pagination.limit }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sort: string) => {
    dispatch(setSort(sort));
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900 dark:text-white">
            {filters.category || filters.search ? 
              filters.category || `Search: "${filters.search}"` : 
              'All Products'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {pagination.total} products found
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <select
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-orange-500 dark:text-orange-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-orange-500 dark:text-orange-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar 
            isOpen={showFilters} 
            onClose={() => setShowFilters(false)} 
          />

          {/* Products Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : products.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <ProductListItem key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {t('products.noProductsFound')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
