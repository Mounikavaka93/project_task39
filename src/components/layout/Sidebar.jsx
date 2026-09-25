import { AnimatePresence, motion } from 'framer-motion'
import { Activity, LayoutDashboard, LogOut, ShieldAlert, Users, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/format'
import { BrandMark } from '../ui/BrandMark'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, index: '01' },
  { to: '/employees', label: 'Employees', icon: Users, index: '02' },
  { to: '/analytics', label: 'Analytics', icon: Activity, index: '03' },
  { to: '/prediction', label: 'Risk Predictor', icon: ShieldAlert, index: '04' },
]

export function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-[#0c1412]/55 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-forest text-[#f4eee4] lg:hidden"
          >
            <SidebarContent
              user={user}
              logout={logout}
              location={location}
              collapsed={false}
              onClose={onClose}
              onToggleCollapse={onToggleCollapse}
              syncLayout={false}
            />
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 92 : 276 }}
        className="sticky top-0 hidden h-full shrink-0 self-stretch overflow-hidden bg-forest text-[#f4eee4] lg:block"
      >
        <SidebarContent
          user={user}
          logout={logout}
          location={location}
          collapsed={collapsed}
          onClose={onClose}
          onToggleCollapse={onToggleCollapse}
          syncLayout
        />
      </motion.aside>
    </>
  )
}

function SidebarContent({ user, logout, location, collapsed, onClose, onToggleCollapse, syncLayout }) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'repeating-radial-gradient(circle at -20% 120%, transparent 0 46px, rgba(232,195,154,0.08) 47px 48px)' }} />
      <div className="relative flex items-center justify-between px-4 py-6">
        <button type="button" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={onToggleCollapse} className="flex items-center gap-3">
          <BrandMark size={42} />
          <AnimatePresence>
            {!collapsed ? (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                <p className="font-display text-xl italic text-[#fff8f0]">StaySight</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8c39a]">Sightline OS</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </button>
        <button type="button" aria-label="Close navigation" onClick={onClose} className="rounded-lg p-2 text-[#e8c39a] lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="relative flex-1 space-y-1.5 px-3">
        {links.map((link) => {
          const active = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition ${
                active ? 'text-[#fff8f0]' : 'text-[#d7c7b2] hover:text-[#fff8f0]'
              }`}
            >
              {active ? (
                <motion.span
                  layoutId={syncLayout ? 'nav-pill' : undefined}
                  className="absolute inset-0 rounded-[22px_6px_22px_6px] bg-copper/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10 font-display text-[11px] text-[#e8c39a]">{link.index}</span>
              <motion.span className="relative z-10" whileHover={{ rotate: -8, scale: 1.1 }}>
                <link.icon className="h-4 w-4 shrink-0" />
              </motion.span>
              <AnimatePresence>
                {!collapsed ? (
                  <motion.span className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {link.label}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </NavLink>
          )
        })}
      </nav>

      <div className="relative border-t border-white/10 p-3">
        <div className={`mb-3 flex items-center gap-3 rounded-[20px_6px_20px_6px] bg-white/5 p-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-copper text-xs font-bold text-[#fff8f0]">
            {getInitials(user?.name ?? 'HR')}
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="truncate text-xs text-[#e8c39a]">{user?.role}</p>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Sign out"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-[20px_6px_20px_6px] px-3 py-2.5 text-sm font-medium text-[#f0b4a8] transition hover:bg-white/5"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed ? 'Sign out' : null}
        </button>
      </div>
    </div>
  )
}
