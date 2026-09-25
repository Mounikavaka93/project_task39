import { motion } from 'framer-motion'

export function Reticule({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(232,195,154,0.18)" strokeWidth="0.8" strokeDasharray="3 7" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(196,106,43,0.28)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="38" fill="none" stroke="rgba(232,195,154,0.35)" strokeWidth="0.9" />
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="8"
            x2="100"
            y2="22"
            stroke="#e8c39a"
            strokeWidth="1.2"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </motion.svg>
      <motion.div
        className="absolute inset-[28%] rounded-full border border-copper/40"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="absolute top-1/2 left-3 right-3 h-px bg-[#e8c39a]/25" />
      <span className="absolute bottom-3 top-3 left-1/2 w-px bg-[#e8c39a]/25" />
    </div>
  )
}
