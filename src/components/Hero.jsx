import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { scrollToSection } from '@/lib/utils';

const Hero = () => {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  return (
    <section
      id="inicio"
      className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[#1c2822]">
        {/* Imagen de respaldo: se ve mientras carga el video y si este no puede reproducirse */}
        <img
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover dark-filter transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          alt="Montañas del Quindío al amanecer con niebla"
          src="/fotos/2.webp"
        />
        <motion.video
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'linear' }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/fotos/2.webp"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover dark-filter transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/fotos/hero-principal.mp4" type="video/mp4" />
        </motion.video>
        {/* Overlay: oscurece arriba y abajo para legibilidad, deja respirar el centro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#26342d]/30 to-[#26342d]/95" />
        {/* Viñeta sutil para foco central */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(38,52,45,0.55)_100%)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Eyebrow / badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs md:text-sm tracking-wide text-white/90"
        >
          <MapPin size={14} className="text-[#c0e69b]" />
          {t('hero.eyebrow')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-5 text-shadow text-white font-semibold"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg md:text-2xl text-[#c0e69b] text-shadow font-light"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection('reservar')}
            className="btn-custom w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base"
          >
            <CalendarCheck size={18} />
            {t('hero.cta')}
          </button>
          <button
            onClick={() => scrollToSection('cabanas')}
            className="focus-ring w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base text-white glass hover:bg-white/10 active:scale-[0.97] transition-all duration-300"
          >
            {t('hero.ctaSecondary')}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/70 uppercase tracking-widest font-light">
          {t('hero.scroll')}
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <button
            onClick={() => scrollToSection('about', 80)}
            aria-label={t('hero.scroll')}
          >
            <ChevronDown size={40} className="icon-custom-color" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
