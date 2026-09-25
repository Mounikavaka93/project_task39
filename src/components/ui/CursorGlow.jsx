import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 140, damping: 22 })
  const springY = useSpring(y, { stiffness: 140, damping: 22 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const wide = window.matchMedia('(min-width: 768px)')
    const sync = () => setEnabled(fine.matches && motionOk.matches && wide.matches)
    sync()
    fine.addEventListener('change', sync)
    motionOk.addEventListener('change', sync)
    wide.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      motionOk.removeEventListener('change', sync)
      wide.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const onMove = (event) => {
      x.set(event.clientX - 180)
      y.set(event.clientY - 180)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-20 h-[360px] w-[360px] rounded-full opacity-40 mix-blend-multiply dark:opacity-25 dark:mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        background: 'radial-gradient(circle, rgba(196,106,43,0.28) 0%, rgba(196,106,43,0) 68%)',
      }}
    />
  )
}
