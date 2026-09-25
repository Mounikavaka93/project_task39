import { motion } from 'framer-motion'

const stars = [
  [12, 18], [22, 12], [34, 20], [48, 14], [61, 22], [74, 16],
  [18, 42], [31, 36], [46, 44], [58, 34], [71, 48], [84, 38],
  [26, 68], [41, 62], [55, 72], [69, 64], [82, 70],
]

const links = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [6, 7], [7, 2], [2, 8], [8, 9], [9, 4], [9, 10], [10, 11],
  [7, 12], [12, 13], [13, 8], [8, 14], [14, 15], [15, 10], [15, 16],
]

export function Constellation() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {links.map(([from, to], index) => {
        const [x1, y1] = stars[from]
        const [x2, y2] = stars[to]
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#e8c39a"
            strokeWidth="0.12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.12, 0.45, 0.18] }}
            transition={{ duration: 2.4, delay: 0.4 + index * 0.08, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
          />
        )
      })}
      {stars.map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={index % 4 === 0 ? 0.55 : 0.32}
          fill={index % 5 === 0 ? '#c46a2b' : '#e8c39a'}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.25, 1, 0.35], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: 3.2 + (index % 5) * 0.4, delay: index * 0.12, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}
