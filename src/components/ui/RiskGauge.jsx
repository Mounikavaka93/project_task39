import { motion } from 'framer-motion'

const tones = {
  Low: { stroke: '#2f7a62', glow: 'shadow-[#2f7a62]/30', text: 'text-moss' },
  Medium: { stroke: '#c8962c', glow: 'shadow-[#c8962c]/30', text: 'text-ochre' },
  High: { stroke: '#c45c4a', glow: 'shadow-[#c45c4a]/30', text: 'text-clay' },
}

export function RiskGauge({ score = 0, level = 'Low', size = 180 }) {
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const tone = tones[level] ?? tones.Low

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-2 rounded-full border"
        style={{ borderColor: tone.stroke }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: level === 'High' ? 1.2 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute inset-6 rounded-full border"
        style={{ borderColor: tone.stroke }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: level === 'High' ? 1.6 : 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <svg viewBox="0 0 180 180" className="relative h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="currentColor" strokeWidth="14" className="text-[#eadfce] dark:text-[#24332e]" />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={tone.stroke}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.p
          key={score}
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className={`font-display text-4xl italic ${tone.text}`}
        >
          {score}%
        </motion.p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">{level} risk</p>
      </div>
    </div>
  )
}
