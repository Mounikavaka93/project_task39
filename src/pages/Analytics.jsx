import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getAttritionByAge,
  getAttritionByExperience,
  getAttritionByRole,
  getAttritionBySalary,
  getDepartmentStats,
  getSatisfactionAnalysis,
} from '../data/employees'
import { ChartStage } from '../components/ui/ChartStage'
import { ChartSkeleton } from '../components/ui/Skeleton'
import { fadeUp, stagger } from '../utils/motion'

const COLORS = ['#c46a2b', '#1a5c57', '#2f7a62', '#c8962c', '#c45c4a', '#8a5a3b', '#4c7c74', '#d4a574']

function ChartCard({ title, subtitle, children, className = '', tall = false, label = 'SIGHTLINE' }) {
  return (
    <motion.section
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`panel w-full p-5 ${className}`}
    >
      <h2 className="font-display text-xl italic">{title}</h2>
      <p className="mb-4 text-sm text-mist">{subtitle}</p>
      <ChartStage className={tall ? 'h-[420px]' : 'h-72'} label={label}>
        {children}
      </ChartStage>
    </motion.section>
  )
}

function AttritionTooltip({ active, payload, label, extra }) {
  if (!active || !payload?.length) return null
  const row = extra ?? payload[0]?.payload ?? {}
  return (
    <div className="rounded-2xl bg-cream px-3 py-2 text-sm shadow-lg dark:bg-panel">
      <p className="mb-1 font-semibold">{label || row.name}</p>
      {row.employees != null ? <p>Employees: {row.employees}</p> : null}
      {row.left != null ? <p>Left: {row.left}</p> : null}
      {row.active != null ? <p>Active: {row.active}</p> : null}
      {row.attrition != null ? <p>Attrition: {row.attrition}%</p> : null}
    </div>
  )
}

export function Analytics() {
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()
  const axis = isDark ? '#d7c7b2' : '#6b6258'
  const grid = isDark ? '#2a3a35' : '#e6dccf'

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  const departments = useMemo(
    () => getDepartmentStats().map((row) => ({
      name: row.department,
      employees: row.headcount,
      left: row.left,
      attrition: Number(row.attritionRate.toFixed(1)),
    })),
    [],
  )
  const byAge = useMemo(() => getAttritionByAge().filter((row) => row.employees > 0), [])
  const ageExits = useMemo(() => byAge.filter((row) => row.left > 0), [byAge])
  const byRole = useMemo(() => getAttritionByRole(), [])
  const bySalary = useMemo(() => getAttritionBySalary(), [])
  const byExperience = useMemo(() => getAttritionByExperience(), [])
  const bySatisfaction = useMemo(() => getSatisfactionAnalysis(), [])

  if (loading) return <ChartSkeleton />

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="grid w-full gap-4 xl:grid-cols-2">
      <ChartCard title="Department-wise attrition" subtitle="Exit rate (%) by business unit" label="DEPT LENS">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departments}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={axis} fontSize={11} interval={0} angle={-16} textAnchor="end" height={54} />
            <YAxis stroke={axis} fontSize={12} unit="%" />
            <Tooltip content={<AttritionTooltip />} />
            <Bar dataKey="attrition" name="Attrition %" radius={[8, 8, 0, 0]} animationDuration={1200} animationEasing="ease-out">
              {departments.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Attrition by age group" subtitle="Exit share and rate across age bands" label="AGE IRIS">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={ageExits} dataKey="left" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3} animationDuration={1300} animationBegin={120}>
              {ageExits.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<AttritionTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Age-group attrition rate" subtitle="Percent of each age band that left" label="BAND SWEEP">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byAge}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={axis} fontSize={12} />
            <YAxis stroke={axis} fontSize={12} unit="%" />
            <Tooltip content={<AttritionTooltip />} />
            <Bar dataKey="attrition" name="Attrition %" fill="#c46a2b" radius={[8, 8, 0, 0]} animationDuration={1100} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Attrition by job role" subtitle="Roles ranked by exit rate" className="xl:col-span-2" tall label="ROLE MAP">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byRole} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" />
            <XAxis type="number" stroke={axis} fontSize={12} unit="%" />
            <YAxis type="category" dataKey="name" stroke={axis} fontSize={11} width={168} />
            <Tooltip content={<AttritionTooltip />} />
            <Bar dataKey="attrition" name="Attrition %" fill="#8a5a3b" radius={[0, 8, 8, 0]} animationDuration={1400} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Attrition by salary range" subtitle="Headcount vs exits in each pay band" label="PAY BAND">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bySalary}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={axis} fontSize={12} />
            <YAxis stroke={axis} fontSize={12} />
            <Tooltip content={<AttritionTooltip />} />
            <Legend />
            <Bar dataKey="employees" name="Employees" fill="#1a5c57" radius={[8, 8, 0, 0]} animationDuration={1100} />
            <Bar dataKey="left" name="Left" fill="#c45c4a" radius={[8, 8, 0, 0]} animationDuration={1250} animationBegin={140} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Attrition by experience" subtitle="Exit rate by years of experience" label="TENURE">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byExperience}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={axis} fontSize={12} />
            <YAxis stroke={axis} fontSize={12} unit="%" />
            <Tooltip content={<AttritionTooltip />} />
            <Bar dataKey="attrition" name="Attrition %" fill="#c8962c" radius={[8, 8, 0, 0]} animationDuration={1150} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Job satisfaction analysis" subtitle="Active vs exited employees by satisfaction score" className="xl:col-span-2" label="PULSE RADAR">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={bySatisfaction}>
            <PolarGrid stroke={grid} />
            <PolarAngleAxis dataKey="name" stroke={axis} />
            <PolarRadiusAxis stroke={axis} />
            <Radar name="Active" dataKey="active" stroke="#2f7a62" fill="#2f7a62" fillOpacity={0.3} animationDuration={1400} />
            <Radar name="Left" dataKey="left" stroke="#c45c4a" fill="#c45c4a" fillOpacity={0.25} animationDuration={1600} animationBegin={180} />
            <Legend />
            <Tooltip content={<AttritionTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>
    </motion.div>
  )
}
