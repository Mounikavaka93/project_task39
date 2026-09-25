import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/layout/Layout'
import { PageLoader } from './components/ui/PageLoader'
import { ToastViewport } from './components/ui/Toast'

const Analytics = lazy(() => import('./pages/Analytics').then((module) => ({ default: module.Analytics })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })))
const EmployeeProfile = lazy(() => import('./pages/EmployeeProfile').then((module) => ({ default: module.EmployeeProfile })))
const Employees = lazy(() => import('./pages/Employees').then((module) => ({ default: module.Employees })))
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })))
const Prediction = lazy(() => import('./pages/Prediction').then((module) => ({ default: module.Prediction })))

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <div className="h-full min-h-0 w-full flex-1">
    <Routes>
      <Route
        path="/login"
        element={(
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        )}
      />
      <Route
        element={(
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        )}
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/prediction" element={<Prediction />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="flex h-full min-h-0 w-full flex-1 flex-col">
              <AppRoutes />
              <ToastViewport />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
