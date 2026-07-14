import { motion } from 'motion/react';

export default function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b1829]">
      {/* Deep navy base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1c30] via-[#0b1829] to-[#060e1a]" />

      {/* Highway perspective grid — a road receding to the horizon (lower third) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55%]"
        style={{
          perspective: '340px',
          perspectiveOrigin: 'center top',
          maskImage: 'linear-gradient(to bottom, transparent, #000 40%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 40%)',
        }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[200%] origin-bottom"
          style={{
            backgroundImage:
              'linear-gradient(#c8970d55 1px, transparent 1px), linear-gradient(90deg, #c8970d33 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'rotateX(72deg)',
          }}
          animate={{ backgroundPositionY: ['0px', '60px'] }}
          transition={{ duration: 2.2, ease: 'linear', repeat: Infinity }}
        />
      </div>

      {/* Warm gold glow near the horizon */}
      <motion.div
        className="absolute left-1/2 top-[48%] -translate-x-1/2 w-[46rem] h-[24rem] rounded-full bg-[#c8970d]/15 blur-[120px]"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Cool ambient glow */}
      <div className="absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full bg-[#1d3a5f]/40 blur-[130px]" />

      {/* Motion light streaks — evoke headlights on the highway */}
      {[
        { top: '58%', dur: 3.2, delay: 0, w: 'w-40', color: 'via-[#c8970d]/70' },
        { top: '66%', dur: 2.4, delay: 0.8, w: 'w-56', color: 'via-white/50' },
        { top: '73%', dur: 2.8, delay: 1.6, w: 'w-48', color: 'via-[#c8970d]/60' },
      ].map((s, i) => (
        <motion.div
          key={i}
          className={`absolute h-px ${s.w} bg-gradient-to-r from-transparent ${s.color} to-transparent`}
          style={{ top: s.top }}
          initial={{ left: '-20%', opacity: 0 }}
          animate={{ left: ['-20%', '120%'], opacity: [0, 1, 0] }}
          transition={{ duration: s.dur, delay: s.delay, ease: 'easeIn', repeat: Infinity, repeatDelay: 1.4 }}
        />
      ))}

      {/* Vignette + bottom fade so content and the stats strip stay readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1829] via-transparent to-[#0b1829]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,14,26,0.55))]" />
    </div>
  );
}
