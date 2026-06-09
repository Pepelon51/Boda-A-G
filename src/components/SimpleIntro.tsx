import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img2 from '../assets/Image2.jpg';

interface SimpleIntroProps {
  onBegin: () => void;
  onComplete: () => void;
}

function Ornament({ color = 'rgba(192,169,126,0.55)', width = 72 }: { color?: string; width?: number }) {
  return (
    <svg width={width} height={10} viewBox={`0 0 ${width} 10`} fill="none">
      <line x1="0" y1="5" x2={width / 2 - 7} y2="5" stroke={color} strokeWidth="0.7"/>
      <polygon
        points={`${width/2},1 ${width/2+5},5 ${width/2},9 ${width/2-5},5`}
        fill="none" stroke={color} strokeWidth="0.7"
      />
      <line x1={width / 2 + 7} y1="5" x2={width} y2="5" stroke={color} strokeWidth="0.7"/>
    </svg>
  );
}

export default function SimpleIntro({ onBegin, onComplete }: SimpleIntroProps) {
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    onBegin();
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => onComplete(), 900);
    }, 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[10005] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.85, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.6 }}
        >
          {/* Fondo oscuro con foto */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img2})`, filter: 'brightness(0.15) saturate(0.35)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, rgba(10,7,4,0.35) 0%, rgba(5,3,1,0.72) 100%)' }}
          />

          {/* Contenido centrado */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            style={{ gap: 'clamp(10px, 2.5vw, 18px)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {/* Línea superior */}
            <div style={{ width: 'clamp(36px, 10vw, 52px)', height: 1, background: 'rgba(192,169,126,0.45)' }} />

            {/* Monograma */}
            <div style={{
              fontFamily: '"Cinzel Decorative", serif',
              fontSize: 'clamp(28px, 8vw, 48px)',
              color: '#C0A97E',
              letterSpacing: '0.18em',
              display: 'flex', alignItems: 'center',
              gap: 'clamp(10px, 2.5vw, 18px)',
              lineHeight: 1,
            }}>
              <span>A</span>
              <span style={{
                fontFamily: '"Melodrama", Georgia, serif',
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '0.6em', color: '#A38971',
                transform: 'translateY(-2px)', display: 'inline-block',
              }}>&amp;</span>
              <span>G</span>
            </div>

            {/* Ornamento */}
            <Ornament color="rgba(192,169,126,0.5)" width={64} />

            {/* Fecha */}
            <span style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: 'clamp(6px, 1.6vw, 8px)',
              letterSpacing: '0.38em',
              color: '#9A7D56',
              textTransform: 'uppercase',
            }}>
              IV · IX · MMXXVI
            </span>

            {/* Lugar */}
            <span style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontStyle: 'italic',
              fontSize: 'clamp(5px, 1.3vw, 7px)',
              letterSpacing: '0.22em',
              color: 'rgba(192,169,126,0.6)',
              textTransform: 'uppercase',
            }}>
              Puerto Vallarta · Jalisco
            </span>

            {/* Línea inferior */}
            <div style={{ width: 'clamp(36px, 10vw, 52px)', height: 1, background: 'rgba(192,169,126,0.35)' }} />

            {/* Botón Comenzar */}
            <button
              onClick={handleStart}
              style={{
                marginTop: 'clamp(6px, 1.8vw, 12px)',
                padding: 'clamp(9px, 2.2vw, 13px) clamp(22px, 5.5vw, 34px)',
                border: '1px solid rgba(192,169,126,0.5)',
                borderRadius: 9999,
                background: 'transparent',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: 'clamp(6px, 1.6vw, 7.5px)',
                letterSpacing: '0.42em',
                color: '#C0A97E',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.35s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(192,169,126,0.12)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(192,169,126,0.9)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(192,169,126,0.5)';
              }}
            >
              Comenzar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
