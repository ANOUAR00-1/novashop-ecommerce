import { useLanguage } from '../contexts/LanguageContext';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import BackButton from '../components/BackButton';

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    {
      id: 'ordering',
      icon: '🛍️',
      questions: [
        { q: 'howToOrder', a: 'howToOrderAnswer' },
        { q: 'paymentMethods', a: 'paymentMethodsAnswer' },
        { q: 'modifyOrder', a: 'modifyOrderAnswer' },
        { q: 'orderConfirmation', a: 'orderConfirmationAnswer' },
      ],
    },
    {
      id: 'shipping',
      icon: '🚚',
      questions: [
        { q: 'shippingTime', a: 'shippingTimeAnswer' },
        { q: 'trackOrder', a: 'trackOrderAnswer' },
        { q: 'shippingCost', a: 'shippingCostAnswer' },
        { q: 'international', a: 'internationalAnswer' },
      ],
    },
    {
      id: 'returns',
      icon: '↩️',
      questions: [
        { q: 'returnPolicy', a: 'returnPolicyAnswer' },
        { q: 'returnProcess', a: 'returnProcessAnswer' },
        { q: 'refundTime', a: 'refundTimeAnswer' },
        { q: 'defective', a: 'defectiveAnswer' },
      ],
    },
    {
      id: 'account',
      icon: '👤',
      questions: [
        { q: 'createAccount', a: 'createAccountAnswer' },
        { q: 'resetPassword', a: 'resetPasswordAnswer' },
        { q: 'updateInfo', a: 'updateInfoAnswer' },
        { q: 'deleteAccount', a: 'deleteAccountAnswer' },
      ],
    },
    {
      id: 'products',
      icon: '📦',
      questions: [
        { q: 'productInfo', a: 'productInfoAnswer' },
        { q: 'outOfStock', a: 'outOfStockAnswer' },
        { q: 'warranty', a: 'warrantyAnswer' },
        { q: 'reviews', a: 'reviewsAnswer' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-orange-600 rounded-2xl mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {categories.map((category, catIndex) => (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t(`faq.categories.${category.id}.title`)}
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.questions.map((item, qIndex) => {
                  const uniqueIndex = catIndex * 100 + qIndex;
                  const isOpen = openIndex === uniqueIndex;

                  return (
                    <div key={qIndex}>
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : uniqueIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="text-left font-medium text-gray-900 dark:text-white">
                          {t(`faq.categories.${category.id}.questions.${item.q}`)}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t(`faq.categories.${category.id}.answers.${item.a}`)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-orange-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t('faq.stillHaveQuestions.title')}
          </h3>
          <p className="text-indigo-100 mb-6">
            {t('faq.stillHaveQuestions.description')}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            {t('faq.stillHaveQuestions.button')}
          </a>
        </div>
      </div>
    </div>
  );
}
