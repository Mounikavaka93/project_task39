import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { pageTransition } from '../../utils/motion'
import { CursorGlow } from '../ui/CursorGlow'
import { PageLoader } from '../ui/PageLoader'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

const titles = {
  '/': ['Workforce overview', 'Live snapshot of headcount, cost and attrition'],
  '/employees': ['Employee management', 'Search, filter and inspect the full workforce'],
  '/analytics': ['Attrition analytics', 'Interactive views across teams, pay and tenure'],
  '/prediction': ['Attrition risk predictor', 'Mock scoring model for stay-risk conversations'],
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const key = location.pathname.startsWith('/employees/') ? 'profile' : location.pathname
  const [title, subtitle] = location.pathname.startsWith('/employees/')
    ? ['Employee profile', 'Role, compensation, engagement and exit risk']
    : titles[location.pathname] ?? ['StaySight', 'People analytics']

  return (
    <div className="sight-app overflow-hidden">
      <div className="sight-rings" />
      <CursorGlow />
      <div className="relative z-10 flex h-full min-h-0 w-full items-stretch">
        <Sidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((value) => !value)}
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header onMenu={() => setMobileOpen(true)} title={title} subtitle={subtitle} />
          <main className="smooth-scroll min-h-0 flex-1">
            <div className="shell-pad w-full py-5">
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <motion.div key={key} {...pageTransition}>
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
