import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wind, Waves, Sun, Leaf } from 'lucide-react';

const Philosophy = () => {
    const [ref, isInView] = useInView({ threshold: 0.2 });
    const { t } = useLanguage();

    return (
        <section id="philosophy" ref={ref} className="py-20 px-4 relative overflow-hidden bg-[#858E78]/10">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img className="w-full h-full object-cover dark-filter" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable={false} src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=55&auto=format" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold"> {/* Changed to font-semibold */}
                        {t('philosophy.title')}
                    </h2>
                    <div className="w-24 h-1 bg-[#307458] mx-auto mb-8"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light">
                        {t('philosophy.p1')}
                    </p>
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
                        {t('philosophy.p2')}
                    </p>
                </motion.div>
                
                <motion.div 
                    className="flex justify-center space-x-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {[Wind, Waves, Sun, Leaf].map((Icon, i) => (
                        <div key={i} className="flex flex-col items-center group">
                            <div className="w-16 h-16 glass rounded-full flex items-center justify-center mb-2 group-hover:bg-[#c0e69b]/20 transition-colors">
                                <Icon className="w-8 h-8 icon-custom-color"/>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;