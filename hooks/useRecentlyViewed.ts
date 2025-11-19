import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Product } from '../services/api';

const MAX_RECENT_PRODUCTS = 10;

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useLocalStorage<Product[]>('recentlyViewed', []);

  const addToRecentlyViewed = (product: Product) => {
    setRecentProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_RECENT_PRODUCTS);
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentProducts([]);
  };

  return {
    recentProducts,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
}
