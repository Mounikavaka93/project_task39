import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = {
  name: 'Isha Kapoor',
  email: 'hr@staysight.com',
  role: 'HR Director',
  password: 'Admin@123',
}

const ACCOUNTS_KEY = 'staysight-accounts'

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function readAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    const stored = raw ? JSON.parse(raw) : []
    const extras = stored.filter((account) => normalizeEmail(account.email) !== DEMO_USER.email)
    return [DEMO_USER, ...extras]
  } catch {
    return [DEMO_USER]
  }
}

function writeAccounts(accounts) {
  const extras = accounts.filter((account) => normalizeEmail(account.email) !== DEMO_USER.email)
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(extras))
}

function readStoredUser() {
  const raw = localStorage.getItem('staysight-user') || sessionStorage.getItem('staysight-user')
  return raw ? JSON.parse(raw) : null
}

function persistSession(session, remember, email) {
  const store = remember ? localStorage : sessionStorage
  localStorage.removeItem('staysight-user')
  sessionStorage.removeItem('staysight-user')
  store.setItem('staysight-user', JSON.stringify(session))
  if (remember) localStorage.setItem('staysight-remember', email)
  else localStorage.removeItem('staysight-remember')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const login = ({ email, password, remember }) => {
    const match = readAccounts().find(
      (account) => normalizeEmail(account.email) === normalizeEmail(email) && account.password === password,
    )
    if (!match) {
      return { ok: false, message: 'Invalid email or password. Use the demo credentials or create an account.' }
    }

    const session = { name: match.name, email: match.email, role: match.role }
    persistSession(session, remember, match.email)
    setUser(session)
    return { ok: true }
  }

  const register = ({ name, email, password, remember }) => {
    const accounts = readAccounts()
    if (accounts.some((account) => normalizeEmail(account.email) === normalizeEmail(email))) {
      return { ok: false, message: 'An account with this email already exists. Sign in instead.' }
    }

    const created = {
      name: name.trim(),
      email: normalizeEmail(email),
      role: 'HR Analyst',
      password,
    }
    writeAccounts([...accounts, created])

    const session = { name: created.name, email: created.email, role: created.role }
    persistSession(session, remember, created.email)
    setUser(session)
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem('staysight-user')
    sessionStorage.removeItem('staysight-user')
    localStorage.removeItem('nexahr-user')
    sessionStorage.removeItem('nexahr-user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
