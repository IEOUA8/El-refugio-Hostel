import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Coffee, Star, Shield, Wind, Bed, Bath, Utensils, Car, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reservation from '@/components/Reservation';
import ImageModal from '@/components/ui/ImageModal';
import { useLanguage } from '@/contexts/LanguageContext';

const CuboPage = () => {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const stripRef = useRef(null);

  const scrollStrip = (dir) => {
    const strip = stripRef.current;
    if (!strip) return;
    const amount = strip.clientWidth * 0.8;
    strip.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const amenities = [
    { icon: Bed, text: t('rooms.cubo.amenities.bed') },
    { icon: Bath, text: t('rooms.cubo.amenities.tub') },
    { icon: Star, text: t('rooms.cubo.amenities.view') },
    { icon: Utensils, text: t('rooms.cubo.amenities.kitchen') },
    { icon: Bath, text: t('rooms.cubo.amenities.bath') },
    { icon: Wind, text: t('rooms.cubo.amenities.net') },
    { icon: Coffee, text: t('rooms.cubo.amenities.breakfast') },
    { icon: Car, text: t('rooms.cubo.amenities.transport') },
  ];

  const layoutImages = [
    "/fotos/cubo-1.webp",
    "/fotos/cubo-2.webp",
    "/fotos/cubo-3.webp"
  ];

  const galleryImages = [
    "/fotos/n-cocina.webp",
    "/fotos/n-interior.webp",
    "/fotos/n-sendero.webp",
    "/fotos/n-tina.webp",
    "/fotos/n-vista.webp",
    "/fotos/n-selibre.webp",
    "/fotos/n-cubo-ext.webp"
  ];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#26342d]">
      <Helmet>
        <html lang={language} />
        <title>{t('meta.cubo.title')}</title>
        <meta name="description" content={t('meta.cubo.description')} />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full overflow-hidden">
         <img
            src="/fotos/n-terraza.webp"
            alt="Cabaña Cubo con vista a la montaña"
            decoding="async"
            className="w-full h-full object-cover object-center"
         />
         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl text-white text-shadow text-center px-4 font-normal">
               {t('cuboPage.title')}
            </h1>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-[#c0e69b] hover:underline mb-8 font-light">
           <ArrowLeft size={20} className="mr-2" /> {t('cuboPage.backHome')}
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="space-y-6"
           >
              <h2 className="text-3xl text-white font-normal">{t('rooms.cubo.description')}</h2>
              <p className="text-gray-300 leading-relaxed font-light">
                 {t('cuboPage.description')}
              </p>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                 <h3 className="text-xl text-[#c0e69b] mb-4 font-normal">{t('cuboPage.servicesTitle')}</h3>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amenities.map((item, i) => (
                       <li key={i} className="flex items-center text-gray-200 font-light">
                          <item.icon size={16} className="mr-2 text-emerald-400 flex-shrink-0" />
                          {item.text}
                       </li>
                    ))}
                 </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                 <h3 className="text-xl text-[#c0e69b] mb-4 font-normal">{t('cuboPage.policiesTitle')}</h3>
                 <ul className="space-y-2">
                    {t('cuboPage.policies').map((policy, idx) => (
                       <li key={idx} className="text-gray-400 text-sm flex items-start font-light">
                          <span className="mr-2">•</span> {policy}
                       </li>
                    ))}
                 </ul>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="space-y-4"
           >
              <div className="grid grid-cols-2 gap-3 h-80 sm:h-96">
                 <img src={layoutImages[0]} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-2xl" alt="Transporte Jeep Willys" />
                 <div className="grid grid-rows-2 gap-3 h-full">
                    <img src={layoutImages[1]} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-2xl" alt="Un momento de calma" />
                    <img src={layoutImages[2]} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-2xl" alt="El Refugio" />
                 </div>
              </div>

              {/* Precios: dos tarjetas sólidas, claramente separadas del collage */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                 <div className="bg-[#1c2822] border border-[#307458]/50 rounded-2xl p-5 text-center shadow-lg">
                    <p className="text-[11px] uppercase tracking-wider text-[#c0e69b] mb-3">{t('rooms.cubo.priceWeekday')}</p>
                    <span className="block text-sm text-gray-500 line-through decoration-red-500/70 font-light">$450.000</span>
                    <span className="block text-3xl text-white font-normal">$390.000</span>
                    <p className="text-xs text-gray-400 mt-2 font-light">{t('rooms.cubo.perNight')}</p>
                 </div>
                 <div className="bg-[#1c2822] border border-[#307458]/50 rounded-2xl p-5 text-center shadow-lg">
                    <p className="text-[11px] uppercase tracking-wider text-[#c0e69b] mb-3">{t('rooms.cubo.priceWeekend')}</p>
                    <span className="block text-sm text-gray-500 line-through decoration-red-500/70 font-light">$650.000</span>
                    <span className="block text-3xl text-white font-normal">$499.000</span>
                    <p className="text-xs text-gray-400 mt-2 font-light">{t('rooms.cubo.perNight')}</p>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Galería: un solo renglón con flechas para ver las ocultas */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h3 className="text-3xl text-white font-normal">{t('cuboPage.galleryTitle')}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => scrollStrip('prev')}
                aria-label="Anterior"
                className="focus-ring w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <ChevronLeft size={20} className="icon-custom-color" />
              </button>
              <button
                onClick={() => scrollStrip('next')}
                aria-label="Siguiente"
                className="focus-ring w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <ChevronRight size={20} className="icon-custom-color" />
              </button>
            </div>
          </div>
          <div
            ref={stripRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
          >
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex-shrink-0 w-64 sm:w-72 h-52 snap-start rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-lg"
                onClick={() => openModal(index)}
              >
                <img
                  src={img}
                  alt={`Galería Cubo ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20">
           {/* Se pasa el nombre específico para la cabaña */}
           <Reservation cabinName="Cabaña Cubo" />
        </div>
      </div>

      <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default CuboPage;