import { motion } from 'framer-motion'

export function BrandMark({ size = 40, spinning = false }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {spinning ? (
        <>
          <motion.span
            className="absolute -inset-3 rounded-full border border-[#e8c39a]/30"
            animate={{ rotate: 360, scale: [1, 1.06, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute -inset-6 rounded-full border border-copper/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
        </>
      ) : null}
      <motion.svg
        viewBox="0 0 48 48"
        className={`relative h-full w-full ${spinning ? 'iris-spin' : ''}`}
        initial={spinning ? { scale: 0.6, opacity: 0 } : false}
        animate={spinning ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx="24" cy="24" r="22" fill="#16332F" />
        <circle cx="24" cy="24" r="16" fill="none" stroke="#E8C39A" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="10" fill="none" stroke="#C46A2B" strokeWidth="2" />
        <circle cx="24" cy="24" r="4.5" fill="#C46A2B" />
        <circle cx="26" cy="22" r="1.4" fill="#FFF8F0" />
      </motion.svg>
    </div>
  )
}
