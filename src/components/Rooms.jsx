import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Bus, Coffee, Heart, Wine, Droplet, Waves, Bed, Flame, Gamepad2, Eye, Star, ArrowRight, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SmartImage from '@/components/SmartImage';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';
import { scrollToSection } from '@/lib/utils';

const Rooms = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const room = {
    name: t('rooms.cubo.name'),
    capacity: t('rooms.cubo.capacity'),
    oldPriceWeekday: '$450.000',
    priceWeekday: '$390.000',
    oldPriceWeekend: '$650.000',
    priceWeekend: '$499.000',
    description: t('rooms.cubo.description'),
    amenities: [
      { icon: Bus, text: t('rooms.cubo.amenities.transport') },
      { icon: Coffee, text: t('rooms.cubo.amenities.breakfast') },
      { icon: Heart, text: t('rooms.cubo.amenities.petfriendly') },
      { icon: Wine, text: t('rooms.cubo.amenities.minibar') },
      { icon: Droplet, text: t('rooms.cubo.amenities.tub') },
      { icon: Waves, text: t('rooms.cubo.amenities.net') },
      { icon: Bed, text: t('rooms.cubo.amenities.bed') },
      { icon: Droplet, text: t('rooms.cubo.amenities.shower') },
      { icon: Coffee, text: t('rooms.cubo.amenities.kitchen') },
      { icon: Flame, text: t('rooms.cubo.amenities.bonfire') },
      { icon: Gamepad2, text: t('rooms.cubo.amenities.games') },
      { icon: Eye, text: t('rooms.cubo.amenities.view') }
    ],
    image: '/fotos/n-terraza.webp'
  };

  const restAmenities = room.amenities.length - 6;

  return (
    <section id="cabanas" ref={ref} className="py-20 px-4 bg-[#858E78]/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm tracking-[0.2em] uppercase text-[#c0e69b] mb-4">
            {t('rooms.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold">
            {t('rooms.title')}
          </h2>
          <div className="w-24 h-1 bg-[#307458] mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[#c0e69b]/10 transition-all duration-300 group grid md:grid-cols-2"
        >
          {/* Imagen */}
          <div className="relative h-72 md:h-auto md:min-h-[30rem] overflow-hidden bg-[#1c2822]">
            <Link to="/cubo">
              <SmartImage
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 dark-filter cursor-pointer"
                alt={room.name}
                src={room.image}
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

            {/* Badges superiores */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#307458] text-white text-xs font-semibold px-3 py-1.5 shadow-lg">
                {t('rooms.cubo.save')} 13%
              </span>
              <span className="inline-flex items-center gap-1 rounded-full glass-dark text-white text-xs px-3 py-1.5">
                <Star size={13} className="text-[#c0e69b] fill-[#c0e69b]" /> 4.9
              </span>
            </div>

            {/* Nombre + capacidad */}
            <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
              <h3 className="text-3xl text-white mb-1 font-semibold text-shadow">
                {room.name}
              </h3>
              <div className="flex items-center text-[#c0e69b] text-sm font-light">
                <Users size={16} className="mr-2" />
                {room.capacity}
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-7 md:p-9 flex flex-col">
            <p className="text-gray-300 text-base font-light mb-6">
              {room.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {room.amenities.slice(0, 6).map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 text-sm text-gray-200 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors duration-200 font-light"
                >
                  <amenity.icon size={15} className="text-[#c0e69b] flex-shrink-0" />
                  {amenity.text}
                </span>
              ))}
              <Link
                to="/cubo"
                className="inline-flex items-center gap-1 text-sm text-[#c0e69b] rounded-full px-3 py-1.5 hover:underline font-light"
              >
                +{restAmenities} {t('rooms.cubo.moreAmenities')}
              </Link>
            </div>

            {/* Precios */}
            <div className="border-t border-white/10 pt-6 mt-auto">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1 font-light">{t('rooms.cubo.priceWeekday')}</p>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl text-[#c0e69b] font-semibold">{room.priceWeekday}</span>
                    <span className="text-sm text-gray-400 line-through decoration-red-500/70">{room.oldPriceWeekday}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light">{t('rooms.cubo.perNight')}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1 font-light">{t('rooms.cubo.priceWeekend')}</p>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl text-[#c0e69b] font-semibold">{room.priceWeekend}</span>
                    <span className="text-sm text-gray-400 line-through decoration-red-500/70">{room.oldPriceWeekend}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light">{t('rooms.cubo.perNight')}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollToSection('reservar')}
                  className="btn-custom flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base"
                >
                  <CalendarCheck size={18} />
                  {t('rooms.cubo.reserve')}
                </button>
                <Link to="/cubo" className="flex-1">
                  <Button variant="outline" className="focus-ring w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white active:scale-[0.97] transition-all duration-300 h-auto">
                    {t('rooms.cubo.viewDetails')}
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Rooms;
