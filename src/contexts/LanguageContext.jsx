import React, { createContext, useContext, useState } from 'react';
// We attempt to import translations. If this file is missing or corrupted, 
// the try/catch or fallback logic will prevent a full app crash.
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const t = (key) => {
    // Safety check: if translations is undefined/null, return key
    if (!translations) return key;

    const keys = key.split('.');
    
    // Helper function to safely traverse the object
    const getValue = (obj, path) => {
      let current = obj;
      for (const k of path) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          return undefined;
        }
      }
      return current;
    };

    // 1. Try current language
    let value = getValue(translations[language], keys);

    // 2. Fallback to Spanish if not found and current isn't Spanish
    if (value === undefined && language !== 'es') {
      value = getValue(translations['es'], keys);
    }

    // 3. If still not found, return the key itself
    if (value === undefined) {
      return key;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};