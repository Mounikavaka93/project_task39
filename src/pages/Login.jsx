import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Modal } from '../components/ui/Modal'
import { BrandMark } from '../components/ui/BrandMark'
import { Magnetic } from '../components/ui/Magnetic'
import { RevealText } from '../components/ui/RevealText'
import { SightField } from '../components/ui/SightField'
import { Constellation } from '../components/ui/Constellation'
import { Reticule } from '../components/ui/Reticule'
import { HeroMetric, SignalTicker } from '../components/ui/SignalTicker'
import { fadeUp, stagger } from '../utils/motion'
import { getDashboardStats } from '../data/employees'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const nameRegex = /^[A-Za-z][A-Za-z .'-]{1,59}$/
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export function Login() {
  const { user, login, register } = useAuth()
  const { pushToast } = useToast()
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [form, setForm] = useState({
    name: '',
    email: localStorage.getItem('staysight-remember') ?? '',
    password: '',
    confirm: '',
    remember: Boolean(localStorage.getItem('staysight-remember')),
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [shake, setShake] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetError, setResetError] = useState('')
  const stats = getDashboardStats()

  useEffect(() => {
    if (!shake) return undefined
    const timer = window.setTimeout(() => setShake(false), 500)
    return () => window.clearTimeout(timer)
  }, [shake])

  if (user) return <Navigate to="/" replace />

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setErrors({})
    setShowPassword(false)
    setShowConfirm(false)
    setForm((current) => ({ ...current, password: '', confirm: '' }))
  }

  const validate = () => {
    const next = {}
    if (mode === 'signup') {
      if (!form.name.trim()) next.name = 'Full name is required'
      else if (!nameRegex.test(form.name.trim())) next.name = 'Enter a valid full name'
    }
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!emailRegex.test(form.email)) next.email = 'Enter a valid work email'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    else if (mode === 'signup' && !passwordRules.test(form.password)) {
      next.password = 'Use 8+ characters with upper, lower and a number'
    }
    if (mode === 'signup') {
      if (!form.confirm) next.confirm = 'Confirm your password'
      else if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      setShake(true)
      return
    }
    const result = mode === 'signup' ? register(form) : login(form)
    if (!result.ok) {
      setShake(true)
      setErrors({ email: result.message })
      pushToast({ type: 'error', message: result.message })
      return
    }
    pushToast({
      type: 'success',
      message: mode === 'signup'
        ? 'Account created. The observatory is open.'
        : `Welcome back${form.email.trim().toLowerCase() === 'hr@staysight.com' ? ', Isha' : ''}. The observatory is open.`,
    })
    navigate('/')
  }

  const sendReset = (event) => {
    event.preventDefault()
    if (!emailRegex.test(resetEmail)) {
      setResetError('Enter a valid email address')
      return
    }
    setResetError('')
    setForgotOpen(false)
    pushToast({ type: 'success', message: `Reset link sent to ${resetEmail}` })
    setResetEmail('')
  }

  return (
    <div className="smooth-scroll relative h-full min-h-dvh w-full bg-forest text-[#f4eee4]">
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-[#0c1412]"
        initial={{ clipPath: 'circle(140% at 50% 50%)' }}
        animate={{ clipPath: 'circle(0% at 50% 50%)' }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-a absolute -top-20 -left-10 h-80 w-80 rounded-full bg-copper/25 blur-3xl" />
        <div className="orb-b absolute right-0 bottom-0 h-96 w-96 rounded-full bg-moss/20 blur-3xl" />
        <Constellation />
        <SightField />
        <Reticule className="top-[-8%] left-[-6%] h-[420px] w-[420px] opacity-70" />
        <Reticule className="right-[-10%] bottom-[-12%] h-[340px] w-[340px] opacity-40" />
        <div className="scanline" />
        {[
          ['8%', '18%', 3, '0s'],
          ['22%', '64%', 2, '1.4s'],
          ['71%', '28%', 4, '2.2s'],
          ['84%', '72%', 2, '0.6s'],
          ['46%', '12%', 3, '3s'],
          ['12%', '82%', 2, '1.8s'],
        ].map(([left, top, size, delay], index) => (
          <span
            key={index}
            className="dust"
            style={{ left, top, width: size, height: size, animationDelay: delay }}
          />
        ))}
      </div>

      <div className="relative z-10 grid min-h-dvh w-full items-center gap-10 px-6 py-8 lg:grid-cols-2 lg:gap-12 lg:px-12 xl:px-16">
        <motion.div variants={stagger} initial="hidden" animate="show" className="hidden w-full lg:block">
          <motion.div variants={fadeUp} className="mb-8">
            <BrandMark size={88} spinning />
          </motion.div>
          <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e8c39a]">
            StaySight observatory
          </motion.p>
          <h1 className="mt-4 font-display text-6xl leading-[1.05]">
            <RevealText text="See who might leave" italic delay={0.15} />
            <span className="mt-2 block text-copper">
              <RevealText text="before they do." italic delay={0.55} />
            </span>
          </h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-md text-[#d7c7b2]">
            A people-intelligence deck for HR teams — headcount, engagement and exit risk, framed like an instrument panel.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-3">
            {[
              [stats.attritionRate, 'Org attrition', 1, '%'],
              [stats.total, 'Profiles', 0, ''],
              [8, 'Departments', 0, ''],
            ].map(([value, label, decimals, suffix], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18, rotateX: 16 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.85 + index * 0.12, duration: 0.55 }}
                whileHover={{ y: -8, scale: 1.04, rotate: index % 2 ? 1.5 : -1.5 }}
                className="relative overflow-hidden rounded-[22px_6px_22px_6px] border border-white/10 bg-[#fff8f0]/5 p-4"
              >
                <motion.span
                  className="absolute -right-3 -top-3 h-12 w-12 rounded-full border border-copper/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14 + index * 3, repeat: Infinity, ease: 'linear' }}
                />
                <HeroMetric value={value} label={label} decimals={decimals} suffix={suffix} />
              </motion.div>
            ))}
          </motion.div>
          <SignalTicker attrition={stats.attritionRate} headcount={stats.total} />
        </motion.div>

        <motion.div
          animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.42 }}
          className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandMark size={42} />
              <div>
                <p className="font-display text-xl italic">StaySight</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8c39a]">Attrition analytics</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="ticket relative overflow-hidden border border-[#e8c39a]/25 bg-[#fff8f0] p-6 text-ink shadow-[0_30px_80px_-36px_rgba(0,0,0,0.55)]"
          >
            <span className="ticket-seal pointer-events-none absolute -top-6 -right-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-copper/35 text-[9px] font-bold uppercase tracking-[0.16em] text-copper/70">
              Sight
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-copper">Entry pass</p>
            <AnimatePresence mode="wait">
              <motion.h2
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-1 font-display text-3xl italic"
              >
                {mode === 'signup' ? 'Create account' : 'Welcome back'}
              </motion.h2>
            </AnimatePresence>
            <p className="mt-1 text-sm text-mist">
              {mode === 'signup' ? 'Open a StaySight workspace for your HR team.' : 'Sign in to the people observatory.'}
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <AnimatePresence>
                {mode === 'signup' ? (
                  <motion.label
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="block overflow-hidden"
                  >
                    <span className="mb-1.5 block text-sm font-medium">Full name</span>
                    <div className="relative">
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-mist" />
                      <input
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                        className="w-full rounded-[16px_6px_16px_6px] border border-[#1c1914]/10 bg-parchment py-3 pr-3 pl-10 text-sm outline-none focus:border-copper focus:ring-4 focus:ring-copper/15"
                        placeholder="Alex Rivera"
                      />
                    </div>
                    {errors.name ? <p className="mt-1 text-xs text-clay">{errors.name}</p> : null}
                  </motion.label>
                ) : null}
              </AnimatePresence>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Work email</span>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-mist" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-[16px_6px_16px_6px] border border-[#1c1914]/10 bg-parchment py-3 pr-3 pl-10 text-sm outline-none focus:border-copper focus:ring-4 focus:ring-copper/15"
                    placeholder="hr@staysight.com"
                  />
                </div>
                {errors.email ? <p className="mt-1 text-xs text-clay">{errors.email}</p> : null}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Password</span>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-mist" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="w-full rounded-[16px_6px_16px_6px] border border-[#1c1914]/10 bg-parchment py-3 pr-11 pl-10 text-sm outline-none focus:border-copper focus:ring-4 focus:ring-copper/15"
                    placeholder="••••••••"
                  />
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)} className="absolute top-1/2 right-3 -translate-y-1/2 text-mist">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password ? <p className="mt-1 text-xs text-clay">{errors.password}</p> : null}
              </label>

              <AnimatePresence>
                {mode === 'signup' ? (
                  <motion.label
                    key="confirm-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="block overflow-hidden"
                  >
                    <span className="mb-1.5 block text-sm font-medium">Confirm password</span>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-mist" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={form.confirm}
                        onChange={(event) => setForm((current) => ({ ...current, confirm: event.target.value }))}
                        className="w-full rounded-[16px_6px_16px_6px] border border-[#1c1914]/10 bg-parchment py-3 pr-11 pl-10 text-sm outline-none focus:border-copper focus:ring-4 focus:ring-copper/15"
                        placeholder="••••••••"
                      />
                      <button type="button" aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setShowConfirm((value) => !value)} className="absolute top-1/2 right-3 -translate-y-1/2 text-mist">
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirm ? <p className="mt-1 text-xs text-clay">{errors.confirm}</p> : null}
                  </motion.label>
                ) : null}
              </AnimatePresence>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-mist">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(event) => setForm((current) => ({ ...current, remember: event.target.checked }))}
                    className="h-4 w-4 accent-copper"
                  />
                  Remember me
                </label>
                {mode === 'signin' ? (
                  <button type="button" onClick={() => setForgotOpen(true)} className="font-medium text-copper hover:text-copper-deep">
                    Forgot password?
                  </button>
                ) : (
                  <span className="text-xs text-mist">8+ chars, upper, lower, number</span>
                )}
              </div>

              <Magnetic>
                <button type="submit" className="btn-primary group flex w-full items-center justify-center gap-2 rounded-[18px_6px_18px_6px] py-3 text-sm font-semibold">
                  {mode === 'signup' ? 'Create account' : 'Enter observatory'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </Magnetic>
            </form>

            <p className="mt-4 text-center text-sm text-mist">
              {mode === 'signin' ? 'Need a workspace?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="font-semibold text-copper hover:text-copper-deep"
              >
                {mode === 'signin' ? 'Create account' : 'Sign in'}
              </button>
            </p>

            {mode === 'signin' ? (
              <div className="mt-5 rounded-[16px_6px_16px_6px] border border-dashed border-[#1c1914]/15 bg-parchment px-4 py-3 text-xs text-mist">
                <p className="font-semibold text-ink">Demo access</p>
                <p>Email: hr@staysight.com</p>
                <p>Password: Admin@123</p>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      </div>

      <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} title="Reset your password">
        <form onSubmit={sendReset} className="space-y-4">
          <p className="text-sm text-mist">
            Enter the work email associated with your StaySight account. We will send a reset link.
          </p>
          <input
            type="email"
            value={resetEmail}
            onChange={(event) => setResetEmail(event.target.value)}
            placeholder="you@staysight.com"
            className="field"
          />
          <AnimatePresence>
            {resetError ? (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-clay">
                {resetError}
              </motion.p>
            ) : null}
          </AnimatePresence>
          <button type="submit" className="btn-primary w-full rounded-[18px_6px_18px_6px] py-3 text-sm font-semibold">
            Send reset link
          </button>
        </form>
      </Modal>
    </div>
  )
}
