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
      className: 'bg-blue-500 text-white',
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
      className: 'bg-purple-500 text-white',
    },
    limited: {
      label: 'Limited',
      icon: Clock,
      className: 'bg-yellow-500 text-white',
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
