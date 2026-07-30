import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Car, Trees, Check, MapPin } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Location = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const steps = [
    {
      icon: MapPin,
      title: t('location.steps.step1.title'),
      content: t('location.steps.step1.content')
    },
    {
      icon: Car,
      title: t('location.steps.step2.title'),
      content: t('location.steps.step2.content')
    },
    {
      icon: Car,
      title: t('location.steps.step3.title'),
      content: t('location.steps.step3.content')
    },
    {
      icon: Trees,
      title: t('location.steps.step4.title'),
      content: t('location.steps.step4.content')
    },
    {
      icon: ShoppingCart,
      title: "5. Haz tus compras",
      content: "Si desean almorzar o cenar en el lugar, es ideal traer tus propios alimentos. Cuentas con una cocina completamente equipada para que puedas prepararlos con facilidad."
    }
  ];

  return (
    <section id="ubicacion" ref={ref} className="py-20 px-4 bg-[#858E78]/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold"> {/* Changed to font-semibold */}
            {t('location.title')}
          </h2>
          <div className="w-24 h-1 bg-[#307458] mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 font-light">{t('location.subtitle')}</p>
        </motion.div>
        
        <div className="mb-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {steps.slice(0, 4).map((step, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-center p-4 glass-dark rounded-xl"
                >
                    <Check className="w-5 h-5 icon-custom-color mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-200 font-light">{step.title.split('.')[1] || step.title.split('. ')[1]}</span>
                </motion.div>
            ))}
        </div>
        <p className="text-center text-[#c0e69b] text-lg mb-12 font-light">{t('location.welcome')}</p>

        <Accordion type="single" collapsible className="w-full space-y-4">
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                >
                    <AccordionItem value={`item-${index+1}`} className="glass-dark rounded-2xl border-none">
                        <AccordionTrigger className="p-6 text-lg text-white hover:no-underline text-left font-semibold"> {/* Changed to font-semibold */}
                            <div className="flex items-center">
                                <step.icon className="w-6 h-6 mr-4 icon-custom-color"/>
                                {step.title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0 text-gray-300 font-light">
                           {step.content}
                        </AccordionContent>
                    </AccordionItem>
                </motion.div>
            ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Location;