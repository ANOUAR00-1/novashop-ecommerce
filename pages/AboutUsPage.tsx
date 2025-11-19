import { Award, Users, Globe, TrendingUp, Heart, Shield, Clock, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import BackButton from '../components/BackButton';

export default function AboutUsPage() {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, label: t('about.stats.customers'), value: '50,000+' },
    { icon: Package, label: t('about.stats.products'), value: '10,000+' },
    { icon: Globe, label: t('about.stats.countries'), value: '100+' },
    { icon: Award, label: t('about.stats.awards'), value: '25+' },
  ];

  const values = [
    {
      icon: Heart,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
    },
    {
      icon: Shield,
      title: t('about.values.trust.title'),
      description: t('about.values.trust.description'),
    },
    {
      icon: Clock,
      title: t('about.values.speed.title'),
      description: t('about.values.speed.description'),
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
  ];

  const team = [
    {
      name: t('about.team.ceo.name'),
      role: t('about.team.ceo.role'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: t('about.team.cto.name'),
      role: t('about.team.cto.role'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: t('about.team.cmo.name'),
      role: t('about.team.cmo.role'),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
    {
      name: t('about.team.coo.name'),
      role: t('about.team.coo.role'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('about.hero.title')}</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-10">
        <BackButton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <Icon className="w-12 h-12 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('about.story.title')}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            <p>{t('about.story.paragraph1')}</p>
            <p>{t('about.story.paragraph2')}</p>
            <p>{t('about.story.paragraph3')}</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {t('about.team.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-orange-500 dark:text-orange-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">{t('about.mission.title')}</h2>
          <p className="text-xl opacity-90 leading-relaxed">
            {t('about.mission.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
