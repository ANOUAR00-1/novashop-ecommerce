import { useLocalStorage } from './useLocalStorage';
import { Product } from '../services/api';

const MAX_COMPARE_PRODUCTS = 4;

export function useProductComparison() {
  const [compareList, setCompareList] = useLocalStorage<Product[]>('compareProducts', []);

  const addToCompare = (product: Product): boolean => {
    if (compareList.length >= MAX_COMPARE_PRODUCTS) {
      return false;
    }
    if (compareList.some((p) => p.id === product.id)) {
      return false;
    }
    setCompareList([...compareList, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(compareList.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId: string): boolean => {
    return compareList.some((p) => p.id === productId);
  };

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    canAddMore: compareList.length < MAX_COMPARE_PRODUCTS,
  };
}
