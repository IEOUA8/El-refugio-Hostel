import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Coffee, Star, Shield, Wind, Bed, Bath, Utensils, Car, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reservation from '@/components/Reservation';
import ImageModal from '@/components/ui/ImageModal';
import { useLanguage } from '@/contexts/LanguageContext';

const CuboPage = () => {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/5.png",
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/12.png",
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/11.png"
  ];

  const galleryImages = [
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/10.png",
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/15.png",
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/3.png",
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/7.png",
    "https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/9.png"
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
            src="https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/5.png"
            alt="Cabaña Cubo"
            decoding="async"
            className="w-full h-full object-cover"
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
              <div className="grid grid-cols-2 gap-4 h-96">
                 <img src={layoutImages[1]} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" alt="Interior" />
                 <div className="grid grid-rows-2 gap-4 h-full">
                    <img src={layoutImages[2]} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" alt="Detalle" />
                    <img src="https://btawegolhzbuztkaswaj.supabase.co/storage/v1/object/public/Fotos/13.png" loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" alt="Entrada" />
                 </div>
              </div>
              
              <div className="bg-[#307458]/20 p-6 rounded-xl border border-[#307458] text-center">
                 <p className="text-sm text-gray-300 mb-2 font-light">{t('rooms.cubo.priceWeekday')}</p>
                 <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-lg text-gray-400 line-through decoration-red-500/70 font-light">$450.000</span>
                    <span className="text-4xl text-white font-normal">$390.000</span>
                 </div>
                 <p className="text-sm text-gray-300 mb-6 font-light">{t('rooms.cubo.perNight')}</p>
                 
                 <div className="w-full h-px bg-white/20 my-4"></div>

                 <p className="text-sm text-gray-300 mb-2 font-light">{t('rooms.cubo.priceWeekend')}</p>
                 <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-lg text-gray-400 line-through decoration-red-500/70 font-light">$650.000</span>
                    <span className="text-4xl text-white font-normal">$499.000</span>
                 </div>
                 <p className="text-sm text-gray-300 mb-4 font-light">{t('rooms.cubo.perNight')}</p>
              </div>
           </motion.div>
        </div>

        {/* New Gallery Section */}
        <div className="mb-16">
          <h3 className="text-3xl text-white mb-8 text-center font-normal">{t('cuboPage.galleryTitle')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer group border border-white/10 shadow-lg"
                onClick={() => openModal(index)}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
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