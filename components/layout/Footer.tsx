import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl shadow-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NovaShop
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('footer.aboutDescription')}
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-600 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">{t('footer.shopTitle')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('footer.allProducts')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('header.electronics')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('header.fashion')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=Wearables" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('header.wearables')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">{t('footer.customerServiceTitle')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('footer.shippingInfo')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">{t('footer.contactInfoTitle')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a href={`tel:${t('footer.phone')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a href={`mailto:${t('footer.email')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('footer.termsOfService')}
              </Link>
              <Link to="/cookie-policy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('footer.cookiePolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
    
