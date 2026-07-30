import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sun, Flame } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const Experiences = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const experiences = [
    {
      icon: Eye,
      title: t('experiences.items.architecture.title'),
      description: t('experiences.items.architecture.description'),
    },
    {
      icon: Sun,
      title: t('experiences.items.experiences.title'),
      description: t('experiences.items.experiences.description'),
    },
    {
      icon: Flame,
      title: t('experiences.items.charm.title'),
      description: t('experiences.items.charm.description'),
    }
  ];

  return (
    <section id="servicios" ref={ref} className="py-20 px-4 relative bg-[#858E78]/10">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          className="w-full h-full object-cover dark-filter"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
          src="https://images.unsplash.com/photo-1637426827679-c16b8768643e?w=1024&q=55&auto=format" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold"> {/* Changed to font-semibold */}
            {t('experiences.title')}
          </h2>
          <div className="w-24 h-1 bg-[#307458] mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
             {t('experiences.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#c0e69b]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Icon size={32} className="icon-custom-color" />
                </div>
                <h3 className="text-xl mb-2 text-white group-hover:text-[#c0e69b] transition-colors font-semibold"> {/* Changed to font-semibold */}
                  {exp.title}
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  {exp.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experiences;