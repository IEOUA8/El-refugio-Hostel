import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';

// La página de la cabaña es una ruta secundaria: se carga bajo demanda
// para no engordar el bundle inicial de la home.
const CuboPage = lazy(() => import('@/pages/CuboPage'));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen main-bg-gradient flex flex-col font-light">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cubo" element={<CuboPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          {/* Espacio para que la barra inferior no tape el contenido en móvil */}
          <div className="h-24 md:hidden" aria-hidden="true" />
          <BottomNav />
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;