import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, DollarSign, UserMinus, Users, Percent } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '../components/ui/Badge'
import { ChartStage, PulseDot } from '../components/ui/ChartStage'
import { DashboardSkeleton } from '../components/ui/Skeleton'
import { StatCard } from '../components/ui/StatCard'
import { useTheme } from '../context/ThemeContext'
import {
  activities,
  getDashboardStats,
  getDepartmentStats,
  monthlyTrend,
} from '../data/employees'
import { formatCurrency, formatPercent } from '../utils/format'
import { fadeUp, stagger } from '../utils/motion'

const activityTone = {
  leave: 'left',
  promotion: 'low',
  review: 'info',
  transfer: 'medium',
  join: 'active',
}

export function Dashboard() {
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const stats = getDashboardStats()
  const departments = getDepartmentStats()
  const axis = isDark ? '#d7c7b2' : '#6b6258'
  const grid = isDark ? '#2a3a35' : '#e6dccf'
  const tip = { borderRadius: 16, border: 'none', background: isDark ? '#15201c' : '#fff8f0', color: isDark ? '#f4eee4' : '#1c1914' }

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) return <DashboardSkeleton />

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Users} label="Total employees" value={stats.total} accent="copper" />
        <StatCard icon={Briefcase} label="Active employees" value={stats.active} accent="moss" delay={0.05} />
        <StatCard icon={UserMinus} label="Employees who left" value={stats.left} accent="clay" delay={0.1} />
        <StatCard icon={Percent} label="Attrition rate" value={stats.attritionRate} suffix="%" decimals={1} accent="ochre" delay={0.15} />
        <StatCard icon={DollarSign} label="Average salary" value={stats.averageSalary} prefix="$" accent="teal" delay={0.2} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.section variants={fadeUp} whileHover={{ y: -3 }} className="panel p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl italic">Attrition vs hiring</h2>
              <p className="text-sm text-mist">Rolling 12-month workforce movement</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/analytics')}
              className="inline-flex items-center gap-1 text-sm font-medium text-copper hover:text-copper-deep"
            >
              Full analytics <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <ChartStage className="h-72" label="LIVE TREND">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="attritionFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c46a2b" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#c46a2b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke={axis} fontSize={12} />
                <YAxis stroke={axis} fontSize={12} />
                <Tooltip contentStyle={tip} />
                <Area
                  type="monotone"
                  dataKey="attrition"
                  stroke="#c46a2b"
                  fill="url(#attritionFill)"
                  strokeWidth={3}
                  animationDuration={1400}
                  animationEasing="ease-out"
                  activeDot={(props) => <PulseDot {...props} />}
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  stroke="#1a5c57"
                  fill="transparent"
                  strokeWidth={2}
                  animationDuration={1600}
                  animationBegin={180}
                  activeDot={(props) => <PulseDot {...props} fill="#1a5c57" />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartStage>
        </motion.section>

        <motion.section variants={fadeUp} className="panel p-5">
          <h2 className="font-display text-xl italic">Recent activity</h2>
          <div className="mt-4 space-y-3">
            {activities.slice(0, 6).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index }}
                whileHover={{ x: 4, scale: 1.01 }}
                className="flex items-start justify-between gap-3 rounded-[18px_6px_18px_6px] bg-parchment px-3 py-2.5 transition hover:bg-[#ebe0d2] dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-medium">{item.employeeName}</p>
                  <p className="text-xs text-mist">{item.action}</p>
                </div>
                <div className="text-right">
                  <Badge tone={activityTone[item.type] ?? 'info'}>{item.type}</Badge>
                  <p className="mt-1 text-[11px] text-mist">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section variants={fadeUp} className="panel p-5">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl italic">Department-wise statistics</h2>
            <p className="text-sm text-mist">Headcount, exits and average compensation</p>
          </div>
        </div>
        <ChartStage className="mb-6 h-64" label="DEPT SWEEP">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departments}>
              <CartesianGrid stroke={grid} strokeDasharray="3 3" />
              <XAxis dataKey="department" stroke={axis} fontSize={11} interval={0} angle={-18} textAnchor="end" height={50} />
              <YAxis stroke={axis} fontSize={12} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="active" fill="#1a5c57" radius={[8, 8, 0, 0]} animationDuration={1100} animationEasing="ease-out" />
              <Bar dataKey="left" fill="#c45c4a" radius={[8, 8, 0, 0]} animationDuration={1200} animationBegin={160} />
            </BarChart>
          </ResponsiveContainer>
        </ChartStage>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-[0.14em] text-mist">
              <tr>
                <th className="pb-3">Department</th>
                <th className="pb-3">Headcount</th>
                <th className="pb-3">Active</th>
                <th className="pb-3">Left</th>
                <th className="pb-3">Attrition</th>
                <th className="pb-3">Avg salary</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((row) => (
                <tr key={row.department} className="border-t border-[#1c1914]/8 dark:border-white/8">
                  <td className="py-3 font-medium">{row.department}</td>
                  <td>{row.headcount}</td>
                  <td>{row.active}</td>
                  <td>{row.left}</td>
                  <td>
                    <Badge tone={row.attritionRate > 20 ? 'high' : row.attritionRate > 0 ? 'medium' : 'low'}>
                      {formatPercent(row.attritionRate)}
                    </Badge>
                  </td>
                  <td>{formatCurrency(row.avgSalary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  )
}
