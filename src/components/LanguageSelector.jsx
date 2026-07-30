import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = ({ align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10 hover:text-[#c0e69b] transition-colors rounded-full w-10 h-10"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <Globe size={20} />
        <span className="sr-only">Select Language</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 bg-[#26342d] border border-white/10 rounded-lg shadow-xl overflow-hidden w-32 z-50 ${
              align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
            }`}
          >
            <div className="flex flex-col py-1">
              <button
                onClick={() => toggleLanguage('es')}
                className={`px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors flex items-center gap-2 ${language === 'es' ? 'text-[#c0e69b] font-semibold' : 'text-white font-light'}`}
              >
                <span className="text-lg">🇪🇸</span> Español
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors flex items-center gap-2 ${language === 'en' ? 'text-[#c0e69b] font-semibold' : 'text-white font-light'}`}
              >
                <span className="text-lg">🇺🇸</span> English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;