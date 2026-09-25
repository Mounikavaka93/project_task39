import { useNavigate } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'
import { RiskGauge } from '../ui/RiskGauge'
import { avatarStyle, formatCurrency, formatDate, getInitials } from '../../utils/format'
import { riskFromEmployee } from '../../utils/prediction'

export function EmployeeModal({ employee, onClose }) {
  const navigate = useNavigate()
  const risk = employee ? riskFromEmployee(employee) : null

  return (
    <Modal open={Boolean(employee)} onClose={onClose} title="Employee details" wide>
      {employee && risk ? (
        <>
          <div className="grid gap-6 md:grid-cols-[1fr_180px]">
            <div>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold text-white"
                  style={avatarStyle(employee.avatarHue)}
                >
                  {getInitials(employee.name)}
                </div>
                <div>
                  <h4 className="font-display text-xl italic">{employee.name}</h4>
                  <p className="text-sm text-mist">{employee.jobRole} · {employee.department}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge tone="info">{employee.id}</Badge>
                    <Badge tone={employee.status === 'Active' ? 'active' : 'left'}>{employee.status}</Badge>
                    <Badge tone={risk.level.toLowerCase()}>{risk.level} risk</Badge>
                  </div>
                </div>
              </div>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Employee ID', employee.id],
                  ['Name', employee.name],
                  ['Department', employee.department],
                  ['Job Role', employee.jobRole],
                  ['Salary', formatCurrency(employee.salary)],
                  ['Experience', `${employee.experience} years`],
                  ['Attrition Status', employee.status],
                  ['Email', employee.email],
                  ['Phone', employee.phone],
                  ['Location', employee.location],
                  ['Age', employee.age],
                  ['Joined', formatDate(employee.joinDate)],
                  ['Manager', employee.manager],
                  ['Satisfaction', `${employee.jobSatisfaction}/5`],
                  ['Work-life', `${employee.workLifeBalance}/5`],
                  ['Overtime', employee.overtime],
                  ['Performance', `${employee.performanceRating}/5`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[16px_6px_16px_6px] bg-parchment px-3 py-2.5 dark:bg-white/5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-mist">{label}</dt>
                    <dd className="mt-0.5 text-sm font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col items-center justify-center rounded-[22px_6px_22px_6px] bg-parchment p-4 dark:bg-white/5">
              <RiskGauge score={risk.score} level={risk.level} size={160} />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-mist hover:bg-parchment dark:hover:bg-white/5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate(`/employees/${employee.id}`)
              }}
              className="btn-primary rounded-[16px_6px_16px_6px] px-4 py-2 text-sm font-semibold"
            >
              Open full profile
            </button>
          </div>
        </>
      ) : null}
    </Modal>
  )
}
