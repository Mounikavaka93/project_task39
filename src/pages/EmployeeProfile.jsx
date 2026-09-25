import { motion } from 'framer-motion'
import { ArrowLeft, Briefcase, Heart, Mail, MapPin, Phone, Star, Wallet } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import { ProfileSkeleton } from '../components/ui/Skeleton'
import { RiskGauge } from '../components/ui/RiskGauge'
import { getEmployeeActivities, getEmployeeById } from '../data/employees'
import { avatarStyle, formatCurrency, formatDate, getInitials } from '../utils/format'
import { fadeUp, stagger } from '../utils/motion'
import { riskFromEmployee } from '../utils/prediction'

function Meter({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-mist">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-parchment dark:bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-copper to-ochre"
        />
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-mist">{label}</dt>
      <dd className="font-medium">{value || '—'}</dd>
    </div>
  )
}

export function EmployeeProfile() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const employee = getEmployeeById(id)

  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [id])

  if (loading) return <ProfileSkeleton />

  if (!employee) {
    return <EmptyState title="Employee not found" description="This profile ID is not in the current workforce snapshot." />
  }

  const risk = riskFromEmployee(employee)
  const timeline = getEmployeeActivities(employee.id)
  const monthly = Math.round(employee.salary / 12)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full space-y-5">
      <Link to="/employees" className="inline-flex items-center gap-2 text-sm font-medium text-copper hover:text-copper-deep">
        <ArrowLeft className="h-4 w-4" /> Back to employees
      </Link>

      <motion.section variants={fadeUp} className="panel overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-forest via-teal to-copper" />
        <div className="grid gap-6 px-5 pb-6 sm:px-7 md:grid-cols-[1fr_200px]">
          <div className="-mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-3xl text-xl font-bold text-white ring-4 ring-cream dark:ring-panel"
                style={avatarStyle(employee.avatarHue)}
              >
                {getInitials(employee.name)}
              </div>
              <div>
                <h2 className="font-display text-3xl italic">{employee.name}</h2>
                <p className="text-sm text-mist">{employee.jobRole} · {employee.department}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="info">{employee.id}</Badge>
                  <Badge tone={employee.status === 'Active' ? 'active' : 'left'}>{employee.status}</Badge>
                  <Badge tone={risk.level.toLowerCase()}>{risk.level} attrition risk · {risk.score}%</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:-mt-8">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">Attrition-risk indicator</p>
            <RiskGauge score={risk.score} level={risk.level} size={168} />
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 xl:grid-cols-3">
        <motion.section variants={fadeUp} className="panel p-5">
          <div className="mb-3 flex items-center gap-2 font-display text-xl italic"><Heart className="h-4 w-4 text-clay" /> Personal information</div>
          <dl className="space-y-3 text-sm">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-mist" /> {employee.email}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-mist" /> {employee.phone}</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-mist" /> {employee.location}</p>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="Full name" value={employee.name} />
              <InfoItem label="Age / gender" value={`${employee.age} · ${employee.gender}`} />
              <InfoItem label="Education" value={employee.education} />
              <InfoItem label="Emergency contact" value={employee.emergencyContact} />
            </div>
          </dl>
        </motion.section>

        <motion.section variants={fadeUp} className="panel p-5">
          <div className="mb-3 flex items-center gap-2 font-display text-xl italic"><Briefcase className="h-4 w-4 text-copper" /> Job details</div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <InfoItem label="Employee ID" value={employee.id} />
            <InfoItem label="Department" value={employee.department} />
            <InfoItem label="Job role" value={employee.jobRole} />
            <InfoItem label="Manager" value={employee.manager} />
            <InfoItem label="Joined" value={formatDate(employee.joinDate)} />
            <InfoItem label="Experience" value={`${employee.experience} years`} />
            <InfoItem label="Last promotion" value={formatDate(employee.lastPromotion)} />
            <InfoItem label="Overtime" value={employee.overtime} />
            <InfoItem label="Attrition status" value={employee.status} />
            <InfoItem label="Exit date" value={formatDate(employee.exitDate)} />
          </dl>
        </motion.section>

        <motion.section variants={fadeUp} className="panel p-5">
          <div className="mb-3 flex items-center gap-2 font-display text-xl italic"><Wallet className="h-4 w-4 text-moss" /> Salary information</div>
          <p className="font-display text-3xl italic">{formatCurrency(employee.salary)}</p>
          <p className="mt-1 text-sm text-mist">Annual base compensation</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <InfoItem label="Monthly equivalent" value={formatCurrency(monthly)} />
            <InfoItem label="Pay band" value={employee.department} />
            <InfoItem label="Currency" value="USD" />
            <InfoItem label="Last review" value={formatDate(employee.lastPromotion)} />
          </dl>
        </motion.section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.section variants={fadeUp} className="panel p-5">
          <div className="mb-4 flex items-center gap-2 font-display text-xl italic"><Star className="h-4 w-4 text-ochre" /> Performance</div>
          <Meter label="Performance rating" value={employee.performanceRating} />
          <p className="mt-3 text-sm text-mist">Latest review scored {employee.performanceRating} out of 5.</p>
        </motion.section>

        <motion.section variants={fadeUp} className="panel p-5">
          <div className="mb-4 flex items-center gap-2 font-display text-xl italic"><Heart className="h-4 w-4 text-copper" /> Satisfaction</div>
          <div className="space-y-4">
            <Meter label="Job satisfaction" value={employee.jobSatisfaction} />
            <Meter label="Work-life balance" value={employee.workLifeBalance} />
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="panel p-5">
          <h3 className="mb-4 font-display text-xl italic">Recent activity</h3>
          <div className="space-y-4">
            {timeline.length === 0 ? (
              <p className="text-sm text-mist">No recent activity recorded.</p>
            ) : timeline.map((item, index) => (
              <div key={item.id} className="relative pl-6">
                {index !== timeline.length - 1 ? <span className="absolute top-3 left-[7px] h-full w-px bg-[#e6dccf] dark:bg-white/10" /> : null}
                <span className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full bg-copper ring-4 ring-copper/15" />
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-xs text-mist">{formatDate(item.time)}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}
