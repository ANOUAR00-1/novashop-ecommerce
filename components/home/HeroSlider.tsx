import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Slide {
  id: number;
  image: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaLink: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop',
    titleKey: 'home.hero.slide1.title',
    subtitleKey: 'home.hero.slide1.subtitle',
    descriptionKey: 'home.hero.slide1.description',
    ctaKey: 'home.hero.slide1.cta',
    ctaLink: '/products?category=electronics',
    gradient: 'from-gray-900/90 via-gray-800/80 to-transparent'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    titleKey: 'home.hero.slide2.title',
    subtitleKey: 'home.hero.slide2.subtitle',
    descriptionKey: 'home.hero.slide2.description',
    ctaKey: 'home.hero.slide2.cta',
    ctaLink: '/products?category=fashion',
    gradient: 'from-gray-900/90 via-gray-800/80 to-transparent'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
    titleKey: 'home.hero.slide3.title',
    subtitleKey: 'home.hero.slide3.subtitle',
    descriptionKey: 'home.hero.slide3.description',
    ctaKey: 'home.hero.slide3.cta',
    ctaLink: '/products',
    gradient: 'from-gray-900/90 via-gray-800/80 to-transparent'
  }
];

export default function HeroSlider() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, currentSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div 
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900"
    >
      {slides.map((slide, index) => {
        const isCurrent = index === currentSlide;
        const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
        const isNext = index === (currentSlide + 1) % slides.length;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isCurrent
                ? 'opacity-100 translate-x-0 z-10'
                : isPrev
                ? 'opacity-0 -translate-x-full z-0'
                : isNext
                ? 'opacity-0 translate-x-full z-0'
                : 'opacity-0 translate-x-full z-0'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            </div>

            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div 
                className={`max-w-2xl transition-all duration-1000 ${
                  isCurrent
                    ? 'opacity-100 translate-y-0 delay-300'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="mb-4 inline-block">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                    {t(slide.subtitleKey)}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {t(slide.titleKey)}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  {t(slide.descriptionKey)}
                </p>
                
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold"
                >
                  {t(slide.ctaKey)}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 group border border-white/20 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 group border border-white/20 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            } disabled:opacity-50`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm rounded-lg transition-all duration-300 border border-white/20"
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-[5000ms] ease-linear"
            style={{
              width: '100%',
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
