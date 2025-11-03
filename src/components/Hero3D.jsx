import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useReducedMotion } from 'framer-motion';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

const Hero3D = () => {
  const prefersReduced = useReducedMotion();
  const [can3D, setCan3D] = useState(false);

  useEffect(() => {
    const ok = supportsWebGL();
    setCan3D(ok && !prefersReduced);
  }, [prefersReduced]);

  return (
    <section className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden rounded-b-3xl">
      {/* Non-blocking gradient overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/30 to-neutral-900/90" />

      {can3D ? (
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="w-full h-full bg-[radial-gradient(80%_60%_at_50%_20%,#1f2937_0%,#0a0a0a_60%)]" />
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: 'easeOut' }}
          className="text-white drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Gokula Krishnan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: prefersReduced ? 0 : 0.6, ease: 'easeOut' }}
          className="mt-2 text-neutral-200/90 text-base sm:text-lg"
        >
          Premium mobile portfolio • Interactive. Playful. Modern.
        </motion.p>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: prefersReduced ? 0 : 0.5 }}
          className="text-neutral-200/80 text-sm"
        >
          Swipe to explore the portfolio
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
