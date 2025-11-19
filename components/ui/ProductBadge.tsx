import { Flame, Sparkles, Tag, TrendingUp, Clock } from 'lucide-react';

interface ProductBadgeProps {
  type: 'new' | 'sale' | 'hot' | 'bestseller' | 'limited';
  discount?: number;
  className?: string;
}

export default function ProductBadge({ type, discount, className = '' }: ProductBadgeProps) {
  const badges = {
    new: {
      label: 'New',
      icon: Sparkles,
      className: 'bg-orange-500 text-white',
    },
    sale: {
      label: discount ? `-${discount}%` : 'Sale',
      icon: Tag,
      className: 'bg-red-500 text-white',
    },
    hot: {
      label: 'Hot',
      icon: Flame,
      className: 'bg-orange-500 text-white',
    },
    bestseller: {
      label: 'Best Seller',
      icon: TrendingUp,
      className: 'bg-orange-600 text-white',
    },
    limited: {
      label: 'Limited',
      icon: Clock,
      className: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30',
    },
  };

  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold shadow-md ${badge.className} ${className}`}
    >
      <Icon className="w-3 h-3" />
      <span>{badge.label}</span>
    </div>
  );
}
