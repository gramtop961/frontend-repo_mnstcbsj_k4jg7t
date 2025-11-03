import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, Heart } from 'lucide-react';

const distance = (p1, p2) => {
  const dx = p1.clientX - p2.clientX;
  const dy = p1.clientY - p2.clientY;
  return Math.hypot(dx, dy);
};

const Lightbox = ({ open, src, alt, onClose }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [liked, setLiked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastTouch = useRef({ time: 0, x: 0, y: 0 });
  const pinchStart = useRef({ dist: 0, scale: 1 });
  const panStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  useEffect(() => {
    if (!open) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const d = distance(e.touches[0], e.touches[1]);
      pinchStart.current = { dist: d, scale };
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      panStart.current = { x: t.clientX, y: t.clientY, posX: position.x, posY: position.y };

      const now = Date.now();
      if (now - lastTouch.current.time < 300) {
        // Double tap
        setLiked((v) => !v);
        setScale((s) => (s > 1 ? 1 : 1.8));
      }
      lastTouch.current = { time: now, x: t.clientX, y: t.clientY };
    }
  }, [position.x, position.y, scale]);

  const onTouchMove = useCallback((e) => {
    if (e.touches.length === 2) {
      const d = distance(e.touches[0], e.touches[1]);
      const ratio = d / (pinchStart.current.dist || d);
      const next = Math.max(1, Math.min(3, pinchStart.current.scale * ratio));
      setScale(next);
    } else if (e.touches.length === 1 && scale > 1) {
      const t = e.touches[0];
      const dx = t.clientX - panStart.current.x;
      const dy = t.clientY - panStart.current.y;
      setPosition({ x: panStart.current.posX + dx, y: panStart.current.posY + dy });
    }
  }, [scale]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const next = Math.max(1, Math.min(3, scale + delta * 0.001))
    setScale(next);
  }, [scale]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onWheel={onWheel}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[95vw] select-none"
        style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: 'transform 120ms ease-out' }}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      <button
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 active:scale-95 transition text-white p-3 rounded-full"
        aria-label="Close lightbox"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      <button
        className={`absolute top-4 left-4 p-3 rounded-full active:scale-95 transition ${liked ? 'bg-rose-500 text-white' : 'bg-white/10 text-white'}`}
        aria-label="Like image"
        onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
      >
        <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
};

export default Lightbox;
