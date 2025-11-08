import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCategory, setPriceRange, setInStock, setRating, resetFilters } from '../../store/slices/filtersSlice';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const categories = ['Electronics', 'Fashion', 'Wearables', 'Accessories', 'Computers'];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full lg:h-auto w-80 bg-white dark:bg-gray-900
          border-r lg:border-r-0 border-gray-200 dark:border-gray-700 p-6 overflow-y-auto
          transition-transform z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <h3 className="text-gray-900 dark:text-white">Filters</h3>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h4 className="mb-4 text-gray-900 dark:text-white">Categories</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === ''}
                onChange={() => dispatch(setCategory(''))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">All</span>
            </label>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => dispatch(setCategory(cat))}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="mb-4 text-gray-900 dark:text-white">Price Range</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Min: ${filters.minPrice}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={filters.minPrice}
                onChange={(e) =>
                  dispatch(setPriceRange({ min: Number(e.target.value), max: filters.maxPrice }))
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Max: ${filters.maxPrice}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="50"
                value={filters.maxPrice}
                onChange={(e) =>
                  dispatch(setPriceRange({ min: filters.minPrice, max: Number(e.target.value) }))
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-8">
          <h4 className="mb-4 text-gray-900 dark:text-white">Rating</h4>
          <div className="space-y-2">
            {[0, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => dispatch(setRating(rating))}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {rating === 0 ? 'All' : `${rating}+ Stars`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock */}
        <div className="mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => dispatch(setInStock(e.target.checked))}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">In Stock Only</span>
          </label>
        </div>

        {/* Reset */}
        <button
          onClick={() => dispatch(resetFilters())}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Reset Filters
        </button>
      </aside>
    </>
  );
}
