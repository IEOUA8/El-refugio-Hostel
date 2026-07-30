import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, Home, BedDouble, Mountain, ImageIcon, CalendarCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24);
  });
  
  const primaryLinks = [
    { name: t('nav.home'), href: '/#inicio', icon: Home },
    { name: 'Cabaña', href: '/#cabanas', icon: BedDouble },
    { name: t('nav.services'), href: '/#servicios', icon: Mountain },
    { name: t('nav.gallery'), href: '/#galeria', icon: ImageIcon },
  ];

  // Animación de entrada por índice (evita la orquestación anidada de variantes,
  // que se congelaba a mitad de camino con staggerChildren + when).
  const pop = (i = 0) => ({
    initial: { opacity: 0, y: 24, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 12, scale: 0.98 },
    transition: { delay: 0.08 + i * 0.06, type: 'spring', stiffness: 320, damping: 26 },
  });

  return (
    <>
      {/* Barra de progreso de scroll */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#307458] to-[#c0e69b] origin-left z-[60]"
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-2"
      >
        <nav
          className={`flex items-center justify-between mx-auto px-4 glass-dark rounded-full transition-all duration-300 ${
            scrolled
              ? 'h-16 w-[92vw] max-w-3xl shadow-xl shadow-black/30 bg-black/50'
              : 'h-20 w-[95vw] max-w-4xl shadow-lg'
          }`}
        >
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand/logo.png"
              alt="El Refugio Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? 'h-[64px] md:h-[80px] md:w-[150px]' : 'h-[90px] md:h-[110px] md:w-[200px]'
              }`}
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:block">
                <LanguageSelector align="right" />
              </div>
              
              <a 
                href="https://wa.me/573189475883" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-gray-200 text-slate-800 shadow-md hover:scale-110 transition-transform"
              >
                <Phone size={20} />
              </a>

              <button onClick={() => setMenuOpen(true)} className="p-2 text-white">
                <Menu size={24} className="icon-custom-color" />
              </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col justify-center px-6 bg-gradient-to-b from-[#26342d] via-[#26342d]/98 to-[#1c2822] backdrop-blur-xl"
          >
            {/* Barra superior: idioma + cerrar */}
            <motion.div
              {...pop(0)}
              className="absolute top-8 inset-x-6 flex items-center justify-between"
            >
              <LanguageSelector align="left" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-white active:scale-90 transition-transform"
              >
                <X size={24} className="icon-custom-color" />
              </button>
            </motion.div>

            {/* Etiqueta */}
            <motion.p
              {...pop(1)}
              className="w-full max-w-md mx-auto text-xs uppercase tracking-[0.25em] text-[#c0e69b]/70 mb-5"
            >
              {t('nav.menu')}
            </motion.p>

            {/* Grid de accesos tipo app */}
            <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-4">
              {primaryLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    {...pop(2 + i)}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex flex-col gap-3 p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-[#c0e69b]/40 hover:bg-white/10 active:bg-white/10 transition-colors"
                  >
                    <span className="w-12 h-12 rounded-2xl bg-[#307458]/30 border border-[#307458]/40 flex items-center justify-center">
                      <Icon size={22} className="text-[#c0e69b]" />
                    </span>
                    <span className="text-lg text-white font-semibold">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA principal: Reservar */}
            <motion.a
              {...pop(6)}
              href="/#reservar"
              onClick={() => setMenuOpen(false)}
              whileTap={{ scale: 0.98 }}
              className="btn-custom w-full max-w-md mx-auto mt-4 flex items-center justify-center gap-2 py-4 rounded-3xl text-white text-lg"
            >
              <CalendarCheck size={22} /> {t('nav.reserve')}
            </motion.a>

            {/* Accesos rápidos: WhatsApp + Llamar */}
            <motion.div
              {...pop(7)}
              className="w-full max-w-md mx-auto grid grid-cols-2 gap-4 mt-4"
            >
              <a
                href="https://wa.me/573189475883"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] active:scale-95 transition-transform"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.892a11.821 11.821 0 00-3.48-8.454" />
                </svg>
                WhatsApp
              </a>
              <a
                href="tel:+573189475883"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
              >
                <Phone size={20} className="text-[#c0e69b]" /> {t('nav.call')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;