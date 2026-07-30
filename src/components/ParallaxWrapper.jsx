import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
const ParallaxWrapper = ({
  children
}) => {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  return <div ref={ref} className="relative overflow-hidden">
      {children}
      <motion.img style={{
      y
    }} className="parallax-bg" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable={false} src="https://images.unsplash.com/photo-1534401284300-6153d957bdaf?w=1024&q=55&auto=format" />
    </div>;
};
export default ParallaxWrapper;