import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('home.newsletter.successMessage'));
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtOC44MzcgNy4xNjMtMTYgMTYtMTZzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTYtMTYtNy4xNjMtMTYtMTZ6bS0yMCAwYzAtOC44MzcgNy4xNjMtMTYgMTYtMTZzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTYtMTYtNy4xNjMtMTYtMTZ6bS0yMCAwYzAtOC44MzcgNy4xNjMtMTYgMTYtMTZzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTYtMTYtNy4xNjMtMTYtMTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl mb-8 shadow-2xl animate-float">
            <Mail className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('home.newsletter.title')}
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            {t('home.newsletter.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletter.placeholder')}
              className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-4 focus:ring-white/50 focus:border-white/50 transition-all text-lg font-medium shadow-xl"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl hover:bg-gray-100 transition-all font-bold flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl hover:shadow-white/50 hover:scale-105 transform group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  {t('home.newsletter.subscribing')}
                </span>
              ) : (
                <>
                  {t('home.newsletter.subscribe')}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-blue-100 flex items-center justify-center gap-2">
            <span className="text-xl">🔒</span>
            {t('home.newsletter.privacy')}
          </p>
        </div>
      </div>
    </section>
  );
}
