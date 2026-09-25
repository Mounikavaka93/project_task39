import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const tones = {
  success: 'border-moss/25 bg-[#eef6f1] text-moss dark:bg-[#13241e] dark:text-[#8fd4b8]',
  error: 'border-clay/25 bg-[#f8ece9] text-clay dark:bg-[#2a1614] dark:text-[#f0b4a8]',
  info: 'border-copper/25 bg-[#f8efe6] text-copper dark:bg-[#24180f] dark:text-[#e8c39a]',
}

export function ToastViewport() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[80] flex w-[min(calc(100vw-2rem),380px)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] ?? Info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.96 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl ${tones[toast.type] ?? tones.info}`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(toast.id)} className="rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
