import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Wind, Bed, Utensils, Star, Droplets } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const ImportantInfo = () => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const { t } = useLanguage();

    const availableItems = [
        { icon: Coffee, name: t('info.available.items.coffee') },
        { icon: Utensils, name: t('info.available.items.basics') },
        { icon: Bed, name: t('info.available.items.breakfast') },
        { icon: Wind, name: t('info.available.items.transport') },
        { icon: Star, name: t('info.available.items.games') },
    ];

    return (
        <section id="informacion" ref={ref} className="py-20 px-4 bg-[#858E78]/10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold"> {/* Changed to font-semibold */}
                        {t('info.title')}
                    </h2>
                    <div className="w-24 h-1 bg-[#307458] mx-auto mb-8"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                     <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-dark p-8 rounded-2xl"
                     >
                        <h3 className="text-2xl text-[#c0e69b] mb-4 font-semibold"> {/* Changed to font-semibold */}
                          {t('info.recommendations.title')}
                        </h3>
                        <p className="text-gray-300 mb-4 font-light">{t('info.recommendations.subtitle')}</p>
                        <ul className="space-y-2">
                           {t('info.recommendations.list').map((rec, i) => (
                               <li key={i} className="flex items-start">
                                   <Droplets className="w-4 h-4 icon-custom-color mr-2 mt-1 flex-shrink-0" />
                                   <span className="text-gray-400 text-sm font-light">{rec}</span>
                               </li>
                           ))}
                        </ul>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="glass-dark p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl text-[#c0e69b] mb-4 font-semibold"> {/* Changed to font-semibold */}
                          {t('info.available.title')}
                        </h3>
                         <p className="text-gray-300 mb-4 font-light">
                            {t('info.available.text1')}
                        </p>
                        <p className="text-gray-300 mb-6 font-light">
                            {t('info.available.text2')}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {availableItems.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                <div key={i} className="flex items-center text-gray-300">
                                    <Icon className="w-4 h-4 mr-2 icon-custom-color"/>
                                    <span className="text-sm font-light">{item.name}</span>
                                </div>
                                )
                            })}
                        </div>
                         <div className="mt-6 border-t border-white/10 pt-6">
                            <span className="text-white mb-2 font-semibold">Extras...</span> {/* Changed to font-semibold */}
                            <p className="text-sm text-gray-400 font-light">{t('info.available.extras')}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ImportantInfo;