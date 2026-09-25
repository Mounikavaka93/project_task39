import { motion } from 'framer-motion'

export function RevealText({ text, className = '', delay = 0, italic = false }) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.28em] overflow-hidden">
          <motion.span
            className={`inline-block ${italic ? 'italic' : ''}`}
            initial={{ y: '110%', rotate: 6, opacity: 0 }}
            animate={{ y: '0%', rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
