import { useLocalStorage } from './useLocalStorage';
import { Product } from '../services/api';

interface PendingAction {
  type: 'add-to-cart' | 'add-to-wishlist' | 'checkout';
  product?: Product;
  returnUrl?: string;
  timestamp: number;
}

export function usePendingAction() {
  const [pendingAction, setPendingAction] = useLocalStorage<PendingAction | null>('pendingAction', null);

  const savePendingAction = (action: Omit<PendingAction, 'timestamp'>) => {
    setPendingAction({
      ...action,
      timestamp: Date.now(),
    });
  };

  const getPendingAction = (): PendingAction | null => {
    if (!pendingAction) return null;
    
    const ONE_HOUR = 60 * 60 * 1000;
    const isExpired = Date.now() - pendingAction.timestamp > ONE_HOUR;
    
    if (isExpired) {
      clearPendingAction();
      return null;
    }
    
    return pendingAction;
  };

  const clearPendingAction = () => {
    setPendingAction(null);
  };

  return {
    savePendingAction,
    getPendingAction,
    clearPendingAction,
    hasPendingAction: !!pendingAction,
  };
}
