import { motion } from 'framer-motion'

const dots = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  delay: index * 0.18,
  duration: 6 + (index % 5),
}))

export function SightField({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {[160, 260, 380].map((size, index) => (
        <motion.div
          key={size}
          className="absolute top-[18%] left-[16%] rounded-full border border-[#e8c39a]/20"
          style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 6 + index * 1.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        />
      ))}
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute h-1 w-1 rounded-full bg-[#e8c39a]"
          style={{ left: dot.left, top: dot.top }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
