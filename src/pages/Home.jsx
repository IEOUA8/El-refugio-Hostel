import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Rooms from '@/components/Rooms';
import Experiences from '@/components/Experiences';
import Gallery from '@/components/Gallery';
import Reservation from '@/components/Reservation';
import Location from '@/components/Location';
import ParallaxWrapper from '@/components/ParallaxWrapper';
import ImportantInfo from '@/components/ImportantInfo';
import Philosophy from '@/components/Philosophy';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('meta.home.description')} />
      </Helmet>
      <Hero />
      <ParallaxWrapper>
        <About />
      </ParallaxWrapper>
      <ParallaxWrapper>
        <Rooms />
      </ParallaxWrapper>
      <ParallaxWrapper>
        <Experiences />
      </ParallaxWrapper>
      <ParallaxWrapper>
        <Gallery />
      </ParallaxWrapper>
      <ParallaxWrapper>
        <Location />
      </ParallaxWrapper>
      <ParallaxWrapper>
        <ImportantInfo />
      </ParallaxWrapper>
      <ParallaxWrapper>
        <Philosophy />
      </ParallaxWrapper>
      <ParallaxWrapper>
        {/* Se pasa el nombre general para el Home */}
        <Reservation cabinName="General" />
      </ParallaxWrapper>
    </>
  );
};

export default Home;