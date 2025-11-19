import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CategoryGroup {
  title: string;
  items: Array<{ name: string; slug: string }>;
}

export default function ShopPage() {
  const [categoryGroups] = useState<CategoryGroup[]>([
    {
      title: 'BEDS',
      items: [
        { name: 'Platform Beds', slug: 'platform-beds' },
        { name: 'Storage Beds', slug: 'storage-beds' },
        { name: 'Regular Beds', slug: 'regular-beds' },
        { name: 'Sleigh Beds', slug: 'sleigh-beds' },
        { name: 'Modern Beds', slug: 'modern-beds' }
      ]
    },
    {
      title: 'NIGHTSTANDS',
      items: [
        { name: 'Wooden Stand', slug: 'wooden-stand' },
        { name: 'Storage Stand', slug: 'storage-stand' },
        { name: 'Barrel Stand', slug: 'barrel-stand' },
        { name: 'Black Stand', slug: 'black-stand' },
        { name: 'Bedside Stand', slug: 'bedside-stand' }
      ]
    },
    {
      title: 'ACCESSORIES',
      items: [
        { name: 'Bow Ties', slug: 'bow-ties' },
        { name: 'Belts', slug: 'belts' },
        { name: 'Bags & Purses', slug: 'bags-purses' },
        { name: 'Beauty Coats', slug: 'beauty-coats' },
        { name: 'Bags', slug: 'bags' }
      ]
    },
    {
      title: 'FURNITURE LIST',
      items: [
        { name: 'Caps & Hats', slug: 'caps-hats' },
        { name: 'Sofa', slug: 'sofa' },
        { name: 'Couch', slug: 'couch' },
        { name: 'Chair', slug: 'chair' },
        { name: 'Bookcase', slug: 'bookcase' }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Shop by Category</h1>
            <p className="text-xl text-blue-100">
              Explore our extensive collection organized for your convenience
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">Shop</span>
          </nav>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={`/products?category=${item.slug}`}
                      className="group flex items-center justify-between text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-2"
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse all products or use our search feature
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              View All Products
            </Link>
            <Link
              to="/products"
              className="px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Search Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
