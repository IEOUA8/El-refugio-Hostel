import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BedDouble, ImageIcon, CalendarCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { scrollToSection } from '@/lib/utils';

/*
  Barra de accesos directos tipo app (solo móvil).
  - Inicio · Cabaña · [Reservar] · Galería · WhatsApp
  - "Reservar" es un botón central elevado (acción principal).
  - Resalta la sección visible mientras se hace scroll (scrollspy).
*/
const BottomNav = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('inicio');

  const items = [
    { id: 'inicio', label: t('nav.home'), icon: Home },
    { id: 'cabanas', label: t('nav.cabins'), icon: BedDouble },
    { id: 'reservar', label: t('nav.reserve'), icon: CalendarCheck, primary: true },
    { id: 'galeria', label: t('nav.gallery'), icon: ImageIcon },
  ];

  // Scrollspy: marca como activa la sección más visible en pantalla.
  useEffect(() => {
    if (location.pathname !== '/') return;

    const ids = ['inicio', 'cabanas', 'servicios', 'galeria', 'reservar'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const goTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Espera a que el Home monte antes de desplazar.
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
    setActiveId(id);
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      aria-label="Accesos directos"
    >
      <div className="pointer-events-auto mx-3 mb-3 pb-safe glass-dark rounded-[28px] shadow-2xl shadow-black/40">
        <ul className="flex items-end justify-between px-3 pt-2 pb-2">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;

            if (item.primary) {
              return (
                <li key={item.id} className="flex-1 flex justify-center">
                  <button
                    onClick={() => goTo(item.id)}
                    aria-label={item.label}
                    className="-mt-8 flex flex-col items-center gap-1 focus:outline-none"
                  >
                    <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#307458] to-emerald-600 text-white shadow-lg shadow-[#307458]/50 ring-4 ring-[#26342d] active:scale-95 transition-transform">
                      <Icon size={24} />
                    </span>
                    <span className="text-[10px] tracking-wide text-[#c0e69b]">
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={item.label}
                  className="w-full flex flex-col items-center gap-1 py-1 focus:outline-none group"
                >
                  <Icon
                    size={22}
                    className={`transition-colors ${
                      isActive
                        ? 'text-[#c0e69b]'
                        : 'text-gray-400 group-active:text-white'
                    }`}
                  />
                  <span
                    className={`text-[10px] tracking-wide transition-colors ${
                      isActive ? 'text-[#c0e69b]' : 'text-gray-400'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`h-1 w-1 rounded-full transition-all ${
                      isActive ? 'bg-[#c0e69b]' : 'bg-transparent'
                    }`}
                  />
                </button>
              </li>
            );
          })}

          {/* WhatsApp: contacto directo */}
          <li className="flex-1">
            <a
              href="https://wa.me/573189475883"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-full flex flex-col items-center gap-1 py-1 focus:outline-none group"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
                className="text-gray-400 group-active:text-white transition-colors"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.892a11.821 11.821 0 00-3.48-8.454" />
              </svg>
              <span className="text-[10px] tracking-wide text-gray-400">
                WhatsApp
              </span>
              <span className="h-1 w-1" />
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
