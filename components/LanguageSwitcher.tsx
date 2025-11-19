import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, languageInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline text-lg">{languageInfo.flag}</span>
        <span className="hidden md:inline font-medium">{languageInfo.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50 animate-slide-down">
          <div className="py-2">
            {Object.values(LANGUAGES).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                  language === lang.code
                    ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
