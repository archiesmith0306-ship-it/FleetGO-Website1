import { motion } from 'motion/react';

export default function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b1829]">
      {/* Deep navy base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1c30] via-[#0b1829] to-[#060e1a]" />

      {/* Subtle grid texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Slowly drifting warm gold glow */}
      <motion.div
        className="absolute -top-32 -left-24 w-[42rem] h-[42rem] rounded-full bg-[#c8970d]/15 blur-[120px]"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 40, y: 30 }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* Cool counter glow */}
      <motion.div
        className="absolute bottom-0 right-0 w-[38rem] h-[38rem] rounded-full bg-[#1d3a5f]/40 blur-[120px]"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -30, y: -20 }}
        transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Bottom fade so content and the stats strip stay readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1829] via-[#0b1829]/40 to-transparent" />
    </div>
  );
}
