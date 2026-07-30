import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Coffee, Mountain } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';
import SmartImage from '@/components/SmartImage';

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const features = [
    {
      icon: Mountain,
      title: t('about.features.nature.title'),
      description: t('about.features.nature.desc')
    },
    {
      icon: Coffee,
      title: t('about.features.coffee.title'),
      description: t('about.features.coffee.desc')
    },
    {
      icon: Leaf,
      title: t('about.features.experience.title'),
      description: t('about.features.experience.desc')
    }
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#1c2822]">
        <SmartImage
          className="w-full h-full object-cover dark-filter"
          alt="Paisaje natural del Refugio"
          src="/fotos/1.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#26342d]/80 via-[#26342d]/70 to-[#26342d]/80"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* TITLE - SEMIBOLD (600) */}
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            {t('about.title')}
          </h2>

          <div className="w-24 h-1 bg-[#307458] mx-auto mb-8"></div>

          {/* DESCRIPTION - LIGHT (300) */}
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-8 rounded-2xl text-center hover:shadow-xl hover:shadow-[#c0e69b]/10 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#307458] to-[#c0e69b] p-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-full h-full text-white" />
              </div>

              {/* CARD TITLE - SEMIBOLD (600) */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              {/* CARD DESCRIPTION - LIGHT (300) */}
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;