import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#1c1914]/10 bg-cream text-ink transition hover:border-copper hover:text-copper dark:border-white/10 dark:bg-panel dark:text-[#f4eee4] dark:hover:text-[#e8c39a]"
      whileTap={{ scale: 0.9, rotate: 18 }}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, y: 8 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </motion.button>
  )
}
