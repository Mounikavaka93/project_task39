import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'
import { useCountUp } from '../../hooks/useCountUp'
import { usePointerTilt } from '../../hooks/usePointerTilt'

export function StatCard({ icon: Icon, label, value, prefix = '', suffix = '', decimals = 0, accent = 'copper', delay = 0 }) {
  const numeric = typeof value === 'number' ? value : 0
  const counted = useCountUp(numeric)
  const display = typeof value === 'number' ? `${prefix}${counted.toFixed(decimals)}${suffix}` : value
  const tilt = usePointerTilt(12)

  const accents = {
    copper: 'bg-copper',
    moss: 'bg-moss',
    clay: 'bg-clay',
    ochre: 'bg-ochre',
    teal: 'bg-teal',
    indigo: 'bg-copper',
    cyan: 'bg-teal',
    rose: 'bg-clay',
    amber: 'bg-ochre',
    emerald: 'bg-moss',
  }

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className="[transform-style:preserve-3d]"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        className="panel group overflow-hidden p-5"
        style={{ transition: 'transform 0.18s ease' }}
      >
        <span className="panel-shine" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">{label}</p>
            <p className="mt-2 font-display text-3xl italic tracking-tight text-ink dark:text-[#fff8f0]">
              {display}
            </p>
          </div>
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            className={`rounded-[16px_4px_16px_4px] ${accents[accent] ?? accents.copper} p-2.5 text-[#fff8f0]`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
