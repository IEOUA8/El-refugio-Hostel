import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/*
  Imagen optimizada reutilizable.
  - loading="lazy" por defecto (eager solo para la imagen crítica/LCP).
  - decoding async para no bloquear el hilo principal.
  - Aparición suave (fade-in) al terminar de cargar → evita el "salto" y el parpadeo.
    Si la imagen ya está en caché, onLoad dispara igual, así que no queda invisible.
*/
const SmartImage = ({ src, alt = '', className, priority = false, onLoad, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn(
        'transition-opacity duration-700 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...props}
    />
  );
};

export default SmartImage;
