import { Bell, Menu, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employees } from '../../data/employees'
import { ThemeToggle } from '../ui/ThemeToggle'
import { avatarStyle, getInitials } from '../../utils/format'

function SearchField({ query, setQuery, matches, onSelect }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-mist" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search people, roles, IDs..."
        aria-label="Search employees"
        className="w-full rounded-[18px_6px_18px_6px] border border-[#1c1914]/10 bg-cream py-2.5 pr-3 pl-10 text-sm outline-none transition focus:border-copper focus:ring-4 focus:ring-copper/15 dark:border-white/10 dark:bg-panel dark:text-[#fff8f0]"
      />
      {query.trim() ? (
        <div className="panel absolute top-full z-20 mt-2 w-full overflow-hidden">
          {matches.length ? matches.map((employee) => (
            <button
              key={employee.id}
              type="button"
              onClick={() => onSelect(employee.id)}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-parchment dark:hover:bg-white/5"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={avatarStyle(employee.avatarHue)}
              >
                {getInitials(employee.name)}
              </span>
              <span>
                <span className="block text-sm font-medium">{employee.name}</span>
                <span className="block text-xs text-mist">{employee.id} · {employee.jobRole}</span>
              </span>
            </button>
          )) : (
            <p className="px-3 py-3 text-sm text-mist">No people match that search.</p>
          )}
        </div>
      ) : null}
    </div>
  )
}

export function Header({ onMenu, title, subtitle }) {
  const [query, setQuery] = useState('')
  const [openNotifs, setOpenNotifs] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const navigate = useNavigate()
  const notifRef = useRef(null)
  const mobileSearchRef = useRef(null)

  const matches = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return []
    return employees
      .filter((employee) =>
        [employee.name, employee.id, employee.department, employee.jobRole].some((field) =>
          field.toLowerCase().includes(value),
        ),
      )
      .slice(0, 5)
  }, [query])

  useEffect(() => {
    const onPointer = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setOpenNotifs(false)
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        if (!query) setMobileSearch(false)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [query])

  const goToEmployee = (id) => {
    setQuery('')
    setMobileSearch(false)
    navigate(`/employees/${id}`)
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#1c1914]/8 bg-[#f3ebe0]/72 backdrop-blur-xl dark:border-white/8 dark:bg-[#0c1412]/70">
      <div className="shell-pad flex items-center gap-3 py-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenu}
          className="rounded-xl border border-[#1c1914]/10 bg-cream p-2 text-ink transition hover:border-copper lg:hidden dark:border-white/10 dark:bg-panel dark:text-[#f4eee4]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className={`min-w-0 flex-1 ${mobileSearch ? 'hidden md:block' : ''}`}>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-copper sm:block">StaySight observatory</p>
          <h1 className="truncate font-display text-xl italic text-ink dark:text-[#fff8f0] sm:text-2xl">{title}</h1>
          {subtitle ? <p className="hidden truncate text-xs text-mist sm:block">{subtitle}</p> : null}
        </div>

        <div className="relative hidden min-w-[240px] max-w-md flex-1 md:block">
          <SearchField query={query} setQuery={setQuery} matches={matches} onSelect={goToEmployee} />
        </div>

        {mobileSearch ? (
          <div ref={mobileSearchRef} className="min-w-0 flex-1 md:hidden">
            <SearchField query={query} setQuery={setQuery} matches={matches} onSelect={goToEmployee} />
          </div>
        ) : (
          <button
            type="button"
            aria-label="Search employees"
            onClick={() => setMobileSearch(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1c1914]/10 bg-cream text-ink transition hover:border-copper md:hidden dark:border-white/10 dark:bg-panel dark:text-[#f4eee4]"
          >
            <Search className="h-4 w-4" />
          </button>
        )}

        {mobileSearch ? (
          <button
            type="button"
            aria-label="Close search"
            onClick={() => { setMobileSearch(false); setQuery('') }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1c1914]/10 bg-cream text-ink md:hidden dark:border-white/10 dark:bg-panel dark:text-[#f4eee4]"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}

        <ThemeToggle />

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={openNotifs}
            onClick={() => setOpenNotifs((value) => !value)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#1c1914]/10 bg-cream text-ink transition hover:border-copper dark:border-white/10 dark:bg-panel dark:text-[#f4eee4]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-clay" />
          </button>
          {openNotifs ? (
            <div className="panel absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">Signals</p>
              <div className="space-y-2 text-sm">
                <p className="rounded-xl bg-clay/10 px-3 py-2 text-clay">2 high-risk employees flagged this week</p>
                <p className="rounded-xl bg-parchment px-3 py-2 text-mist dark:bg-white/5">Q1 attrition report is ready for review</p>
                <p className="rounded-xl bg-parchment px-3 py-2 text-mist dark:bg-white/5">Stay interviews pending for Sales</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
