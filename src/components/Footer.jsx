import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Book } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    t
  } = useLanguage();
  const socialLinks = [{
    icon: Instagram,
    href: 'https://www.instagram.com/elrefugio_hostel?igsh=dDJrNzkzdTVxYmQy',
    label: 'Instagram'
  }, {
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Book,
    href: '#',
    label: 'Booking'
  }];
  return <footer id="contacto" className="bg-gradient-to-b from-[#26342d]/20 to-black/50 border-t border-white/10 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* LOGO SIEMPRE CENTRADO */}
        <div className="w-full flex justify-center items-center mb-12">
          <a href="#inicio" className="flex justify-center items-center w-full">
            <img src="https://horizons-cdn.hostinger.com/f7a28aa3-9610-4d7e-a771-af4f25a441ae/106bf87674125055483cccfaff80e8d5.png" alt="El Refugio Logo" loading="lazy" decoding="async" className="h-56 md:h-64 w-auto object-contain" />
          </a>
        </div>

        {/* INFO + REDES */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Columna izquierda */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-lg text-white mb-4 font-semibold">{t('footer.findUs')}</span> {/* Changed to font-semibold */}
            <div className="space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-gray-400 text-sm font-light">{t('footer.location')}</p>
              <p className="text-gray-400 text-sm font-light">RNT 228843</p>
              <p className="text-gray-400 text-sm font-light">318 947 5883</p>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <span className="text-lg text-white mb-4 font-semibold">{t('footer.followUs')}</span> {/* Changed to font-semibold */}
            <div className="flex space-x-4">
              {socialLinks.map(social => {
              const Icon = social.icon;
              return <motion.a key={social.label} href={social.href} whileHover={{
                scale: 1.1,
                y: -2
              }} whileTap={{
                scale: 0.95
              }} className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#c0e69b] hover:bg-[#c0e69b]/20 transition-colors" aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <Icon size={20} />
                  </motion.a>;
            })}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm font-light">
            © 2025 El refugio. Todos los derechos reservados. Creado por <a href="https://xian.com.co/" target="_blank" rel="noopener noreferrer" className="text-[#c0e69b] hover:underline">xian</a>
          </p>
        </div>

      </div>
    </footer>;
};
export default Footer;