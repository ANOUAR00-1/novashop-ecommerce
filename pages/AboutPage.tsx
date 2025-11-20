import { Users, Award, Globe, Heart } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  
  const stats = [
    { icon: Users, label: t('about.stats.customers'), value: '50K+' },
    { icon: Award, label: t('about.stats.awards'), value: '15+' },
    { icon: Globe, label: t('about.stats.countries'), value: '120+' },
    { icon: Heart, label: t('about.stats.reviews'), value: '100K+' }
  ];

  const team = [
    {
      name: 'John Smith',
      role: t('about.team.founderCEO'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      role: t('about.team.chiefProductOfficer'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: t('about.team.headOfOperations'),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    },
    {
      name: 'Emma Davis',
      role: t('about.team.customerSuccessLead'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <BackButton />

        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('about.hero.mission')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-50 dark:from-orange-900/20 dark:to-orange-900/20 rounded-2xl p-8 text-center">
                  <Icon className="w-12 h-12 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {t('about.story.paragraph2')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('about.story.paragraph3')}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">{t('about.story.year')}</div>
                <p className="text-xl">{t('about.story.yearText')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 dark:bg-gray-900/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.values.customerFirst.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.customerFirst.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.values.sustainability.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.sustainability.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.values.innovation.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.innovation.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">{t('about.whyChooseUs.title')}</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {t('about.whyChooseUs.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2">✓</div>
              <h3 className="text-xl font-bold mb-2">{t('about.whyChooseUs.premiumQuality')}</h3>
              <p className="text-white/90">{t('about.whyChooseUs.premiumQualityDesc')}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">✓</div>
              <h3 className="text-xl font-bold mb-2">{t('about.whyChooseUs.fastShipping')}</h3>
              <p className="text-white/90">{t('about.whyChooseUs.fastShippingDesc')}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">✓</div>
              <h3 className="text-xl font-bold mb-2">{t('about.whyChooseUs.support247')}</h3>
              <p className="text-white/90">{t('about.whyChooseUs.support247Desc')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
