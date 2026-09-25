import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { EmployeeModal } from '../components/employees/EmployeeModal'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import { TableSkeleton } from '../components/ui/Skeleton'
import { departments, employees, jobRolesByDepartment } from '../data/employees'
import { avatarStyle, formatCurrency, getInitials } from '../utils/format'
import { riskFromEmployee } from '../utils/prediction'

const PAGE_SIZE = 8

const COLUMNS = [
  ['id', 'Employee ID'],
  ['name', 'Name'],
  ['department', 'Department'],
  ['jobRole', 'Job Role'],
  ['salary', 'Salary'],
  ['experience', 'Experience'],
  ['status', 'Attrition Status'],
]

export function Employees() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All')
  const [status, setStatus] = useState('All')
  const [role, setRole] = useState('All')
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 550)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search, department, status, role, sort])

  const roles = department === 'All'
    ? [...new Set(Object.values(jobRolesByDepartment).flat())]
    : jobRolesByDepartment[department]

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = employees.filter((employee) => {
      const matchesQuery = !query
        || [employee.name, employee.id, employee.department, employee.jobRole, employee.email, employee.status]
          .some((field) => String(field).toLowerCase().includes(query))
      const matchesDept = department === 'All' || employee.department === department
      const matchesStatus = status === 'All' || employee.status === status
      const matchesRole = role === 'All' || employee.jobRole === role
      return matchesQuery && matchesDept && matchesStatus && matchesRole
    })

    return [...list].sort((a, b) => {
      const left = a[sort.key]
      const right = b[sort.key]
      if (typeof left === 'number' && typeof right === 'number') {
        return sort.dir === 'asc' ? left - right : right - left
      }
      return sort.dir === 'asc'
        ? String(left).localeCompare(String(right), undefined, { numeric: true })
        : String(right).localeCompare(String(left), undefined, { numeric: true })
    })
  }, [search, department, status, role, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * PAGE_SIZE
  const rows = filtered.slice(start, start + PAGE_SIZE)

  const toggleSort = (key) => {
    setSort((current) => (
      current.key === key
        ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' }
    ))
  }

  if (loading) return <TableSkeleton />

  return (
    <div className="w-full space-y-5">
      <div className="panel p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-mist">
          <SlidersHorizontal className="h-4 w-4" />
          Search, filter and sort
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="block text-sm xl:col-span-2">
            <span className="mb-1.5 block font-medium text-ink dark:text-[#f4eee4]">Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search ID, name, department, role, email..."
              className="field"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink dark:text-[#f4eee4]">Department</span>
            <select
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value)
                setRole('All')
              }}
              className="field"
            >
              <option value="All">All departments</option>
              {departments.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink dark:text-[#f4eee4]">Job Role</span>
            <select value={role} onChange={(event) => setRole(event.target.value)} className="field">
              <option value="All">All roles</option>
              {roles.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink dark:text-[#f4eee4]">Attrition Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="field">
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Left">Left</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No employees match" description="Clear filters or try a different name, role or department." />
      ) : (
        <>
          <div className="panel hidden overflow-x-auto md:block">
            <table className="w-full min-w-full text-left text-sm">
              <thead className="bg-parchment text-[11px] uppercase tracking-[0.14em] text-mist dark:bg-white/5">
                <tr>
                  {COLUMNS.map(([key, label]) => (
                    <th key={key} className="px-4 py-3">
                      <button type="button" onClick={() => toggleSort(key)} className="font-semibold hover:text-copper">
                        {label}{sort.key === key ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ''}
                      </button>
                    </th>
                  ))}
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rows.map((employee, index) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelected(employee)}
                      className="cursor-pointer border-t border-[#1c1914]/8 transition hover:bg-parchment dark:border-white/8 dark:hover:bg-white/5"
                    >
                      <td className="px-4 py-3 font-medium text-copper">{employee.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={avatarStyle(employee.avatarHue)}>
                            {getInitials(employee.name)}
                          </span>
                          <span>
                            <span className="block font-medium">{employee.name}</span>
                            <span className="block text-xs text-mist">{employee.email}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{employee.department}</td>
                      <td className="px-4 py-3">{employee.jobRole}</td>
                      <td className="px-4 py-3">{formatCurrency(employee.salary)}</td>
                      <td className="px-4 py-3">{employee.experience} yrs</td>
                      <td className="px-4 py-3">
                        <Badge tone={employee.status === 'Active' ? 'active' : 'left'}>{employee.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelected(employee)
                          }}
                          className="rounded-xl bg-copper/12 px-3 py-1.5 text-xs font-semibold text-copper hover:bg-copper/20"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {rows.map((employee) => {
              const risk = riskFromEmployee(employee)
              return (
                <button
                  key={employee.id}
                  type="button"
                  onClick={() => setSelected(employee)}
                  className="panel p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" style={avatarStyle(employee.avatarHue)}>
                      {getInitials(employee.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{employee.name}</p>
                      <p className="truncate text-xs text-mist">{employee.id} · {employee.jobRole}</p>
                    </div>
                    <Badge tone={employee.status === 'Active' ? 'active' : 'left'}>{employee.status}</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-mist">
                    <p>{employee.department}</p>
                    <p>{formatCurrency(employee.salary)}</p>
                    <p>{employee.experience} yrs exp</p>
                    <p>{risk.level} risk</p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-mist">
              Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-xl border border-[#1c1914]/10 p-2 disabled:opacity-40 dark:border-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">{currentPage} / {pageCount}</span>
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-xl border border-[#1c1914]/10 p-2 disabled:opacity-40 dark:border-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}

      <EmployeeModal employee={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
