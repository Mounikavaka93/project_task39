import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function Magnetic({ children, className = '', strength = 28 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (event) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
