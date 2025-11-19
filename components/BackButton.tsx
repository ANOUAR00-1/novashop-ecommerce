import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BackButtonProps {
  label?: string;
  to?: string;
}

export default function BackButton({ label, to }: BackButtonProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-6"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">{label || t('common.back')}</span>
    </button>
  );
}
