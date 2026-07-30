import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loadedFull, setLoadedFull] = useState('');
  const stripRef = useRef(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const galleryItems = [
    {
      title: t('gallery.items.terraza.title'),
      location: "Buenavista, Quindío",
      rating: 4.9,
      thumb: "/fotos/n-terraza.webp",
      full: "/fotos/n-terraza.webp",
      description: t('gallery.items.terraza.desc')
    },
    {
      title: "Entrada al Paraíso",
      location: "El Refugio",
      rating: 4.8,
      thumb: "/fotos/n-entrada.webp",
      full: "/fotos/n-entrada.webp",
      description: "El primer paso hacia una experiencia de desconexión y armonía con la naturaleza."
    },
    {
      title: "Rincón de Paz",
      location: "Interior Cabaña",
      rating: 5.0,
      thumb: "/fotos/n-breathe.webp",
      full: "/fotos/n-breathe.webp",
      description: "Detalles que inspiran calma y te invitan a respirar profundo. Simplemente 'Breathe'."
    },
    {
      title: "Mirador en Plenitud",
      location: "Zona Común",
      rating: 4.7,
      thumb: "/fotos/n-mirador.webp",
      full: "/fotos/n-mirador.webp",
      description: "Observa este hermoso paisaje y déjate abrazar por la montaña."
    },
    {
      title: "Cocina al Aire Libre",
      location: "Desayuno con vista",
      rating: 4.9,
      thumb: "/fotos/n-cocina.webp",
      full: "/fotos/n-cocina.webp",
      description: "Comienza el día con un desayuno rodeado del sonido de la naturaleza."
    },
    {
      title: "Decoración y Encanto",
      location: "Rincón interior",
      rating: 5.0,
      thumb: "/fotos/n-decoracion.webp",
      full: "/fotos/n-decoracion.webp",
      description: "Cada detalle está pensado para una estadía con tranquilidad total."
    },
    {
      title: "Baño de Bosque",
      location: "Tina",
      rating: 4.9,
      thumb: "/fotos/n-tina.webp",
      full: "/fotos/n-tina.webp",
      description: "Sumérgete en nuestro hot tub de madera y deja que la montaña te abrace."
    },
    {
      title: "Espacio Acogedor",
      location: "Interior",
      rating: 4.8,
      thumb: "/fotos/n-interior.webp",
      full: "/fotos/n-interior.webp",
      description: "Cada rincón está pensado para tu comodidad y tranquilidad."
    },
    {
      title: "Naturaleza Viva",
      location: "Alrededores",
      rating: 4.9,
      thumb: "/fotos/n-naturaleza.webp",
      full: "/fotos/n-naturaleza.webp",
      description: "Explora la biodiversidad que rodea nuestro refugio."
    },
    {
      title: "Noche Estrellada",
      location: "Fogata",
      rating: 5.0,
      thumb: "/fotos/n-fogata.webp",
      full: "/fotos/n-fogata.webp",
      description: "Comparte historias bajo el cielo estrellado junto al calor del fuego."
    }
  ];

  const total = galleryItems.length;
  const activeItem = galleryItems[activeIndex];

  // Centra la miniatura activa dentro del carrusel (scroll horizontal del contenedor,
  // independiente del scroll de ventana).
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const el = strip.children[activeIndex];
    if (!el) return;
    const target = el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex]);

  const goTo = (index, item) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    if (item?.isLink) navigate('/cubo');
  };

  const handleNav = (dir) => {
    setDirection(dir === 'next' ? 1 : -1);
    setActiveIndex(prev =>
      dir === 'next' ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  const handleExplore = () => {
    if (activeItem.isLink) {
      navigate('/cubo');
    } else {
      toast({
        title: `Explorando ${activeItem.title}`,
        description: "🚧 ¡Esta función estará disponible pronto!",
      });
    }
  };

  const imgVariants = {
    enter: (dir) => ({ opacity: 0, scale: 1.06, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, scale: 1.02, x: dir > 0 ? -30 : 30 }),
  };

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative w-full overflow-hidden bg-[#26342d] py-20 md:py-28"
    >
      {/* Glow ambiental sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-[#307458]/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#c0e69b]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 flex items-end justify-between gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c0e69b]/80 mb-3">
              <span className="h-px w-8 bg-[#c0e69b]/50" /> {t('nav.gallery')}
            </span>
            <h2 className="text-3xl md:text-5xl text-white font-semibold">
              {t('gallery.title')}
            </h2>
          </div>
          <div className="hidden sm:flex items-baseline gap-1 font-light tabular-nums">
            <span className="text-3xl text-[#c0e69b]">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-sm text-white/50">/ {String(total).padStart(2, '0')}</span>
          </div>
        </motion.div>

        {/* Visual destacado (la selección queda FUERA de esta imagen) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#1c2822]"
        >
          {/* Placeholder mientras carga el PNG pesado (evita el vacío) */}
          {loadedFull !== activeItem.full && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#26342d] to-[#1c2822] animate-pulse" />
          )}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={activeItem.full}
              src={activeItem.full}
              alt={activeItem.title}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              decoding="async"
              onLoad={() => setLoadedFull(activeItem.full)}
              transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 w-full h-full object-cover dark-filter"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Contenido sobre el visual */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <motion.div
              key={activeItem.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-200 font-light">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#c0e69b]" /> {activeItem.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-400 fill-current" /> {activeItem.rating}
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl text-white mb-3 text-shadow font-semibold">
                {activeItem.title}
              </h3>
              <p className="text-base md:text-lg text-gray-300 mb-6 text-shadow font-light line-clamp-2">
                {activeItem.description}
              </p>
              <button
                onClick={handleExplore}
                className="btn-custom text-white py-3 px-6 rounded-full font-light"
              >
                {t('gallery.explore')} →
              </button>
            </motion.div>
          </div>

          {/* Flechas sobre el visual (solo desktop) */}
          <button
            onClick={() => handleNav('prev')}
            aria-label="Anterior"
            className="focus-ring hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 w-11 h-11 rounded-full glass items-center justify-center text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft size={22} className="icon-custom-color" />
          </button>
          <button
            onClick={() => handleNav('next')}
            aria-label="Siguiente"
            className="focus-ring hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 w-11 h-11 rounded-full glass items-center justify-center text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight size={22} className="icon-custom-color" />
          </button>
        </motion.div>

        {/* Selector de miniaturas — FUERA del visual, sobre el fondo de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 md:mt-8"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('prev')}
              aria-label="Anterior"
              className="focus-ring flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <ChevronLeft size={20} className="icon-custom-color" />
            </button>

            <div
              ref={stripRef}
              className="flex-1 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
            >
              {galleryItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => goTo(index, item)}
                  aria-label={item.title}
                  aria-current={activeIndex === index}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    activeIndex === index
                      ? 'ring-2 ring-[#c0e69b] ring-offset-2 ring-offset-[#26342d] opacity-100'
                      : 'ring-1 ring-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  {activeIndex !== index && (
                    <div className="absolute inset-0 bg-black/30" />
                  )}
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => handleNav('next')}
              aria-label="Siguiente"
              className="focus-ring flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <ChevronRight size={20} className="icon-custom-color" />
            </button>
          </div>

          {/* Barra de progreso */}
          <div className="mt-5 h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#c0e69b] rounded-full"
              animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
