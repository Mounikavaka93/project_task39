import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-[#0c1412]/55 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className={`panel relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl sm:rounded-[32px_10px_32px_10px] ${wide ? 'sm:max-w-3xl' : 'sm:max-w-xl'}`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1c1914]/8 bg-cream/90 px-5 py-4 backdrop-blur dark:border-white/8 dark:bg-panel/90">
              <h3 className="font-display text-xl italic">{title}</h3>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="rounded-xl p-2 text-mist transition hover:bg-parchment hover:text-ink dark:hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
