import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lightbox from './Lightbox';

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&fm=webp&w=1600&auto=format&fit=crop',
    alt: 'Editorial portrait with dramatic lighting',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&fm=webp&w=1600&auto=format&fit=crop',
    alt: 'Outdoor fashion shot with urban backdrop',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&fm=webp&w=1600&auto=format&fit=crop',
    alt: 'Runway moment in monochrome',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&fm=webp&w=1600&auto=format&fit=crop',
    alt: 'Studio close-up showcasing texture',
  },
];

const Gallery = () => {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState({});

  const current = images[index];

  const handleDragEnd = (event, info) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const threshold = 60;

    if (offset < -threshold || velocity < -300) {
      // swipe up -> next
      setIndex((i) => Math.min(images.length - 1, i + 1));
    } else if (offset > threshold || velocity > 300) {
      // swipe down -> prev
      setIndex((i) => Math.max(0, i - 1));
    }
  };

  const variants = useMemo(() => ({
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }), []);

  return (
    <section className="relative py-8">
      <div className="mx-auto w-[92%] sm:w-[420px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-xl font-medium">Portfolio</h2>
          <p className="text-neutral-400 text-sm">{index + 1} / {images.length}</p>
        </div>

        <motion.div
          key={current.id}
          className="relative rounded-2xl overflow-hidden bg-neutral-800/60 border border-white/10"
          drag="y"
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: prefersReduced ? 0 : 0.35 }}
          style={{ touchAction: 'pan-y' }}
          onClick={() => setOpen(true)}
        >
          <div className="aspect-[4/5] w-full">
            <img
              src={current.src}
              alt={current.alt}
              loading="lazy"
              onLoad={() => setLoaded((s) => ({ ...s, [current.id]: true }))}
              className={`h-full w-full object-cover ${loaded[current.id] ? 'blur-0' : 'blur-md'} transition-[filter] duration-500`}
              draggable={false}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm/relaxed">{current.alt}</p>
          </div>
        </motion.div>

        <div className="mt-3 text-center text-neutral-400 text-xs">
          Swipe up or down to navigate. Double-tap image to like. Pinch to zoom in lightbox.
        </div>
      </div>

      <Lightbox open={open} src={current.src} alt={current.alt} onClose={() => setOpen(false)} />
    </section>
  );
};

export default Gallery;
