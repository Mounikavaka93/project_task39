import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { RiskGauge } from '../components/ui/RiskGauge'
import { Badge } from '../components/ui/Badge'
import { Magnetic } from '../components/ui/Magnetic'
import { useToast } from '../context/ToastContext'
import { departments, jobRolesByDepartment } from '../data/employees'
import { predictAttritionRisk } from '../utils/prediction'

const initial = {
  age: 29,
  department: 'Engineering',
  jobRole: 'Software Engineer',
  salary: 92000,
  experience: 4,
  jobSatisfaction: 3,
  workLifeBalance: 3,
  overtime: 'No',
  performanceRating: 4,
}

export function Prediction() {
  const [form, setForm] = useState(initial)
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})
  const { pushToast } = useToast()
  const resultRef = useRef(null)

  const setField = (key, value) => {
    setForm((current) => {
      const next = { ...current, [key]: value }
      if (key === 'department') next.jobRole = jobRolesByDepartment[value][0]
      return next
    })
  }

  const validate = () => {
    const next = {}
    if (!Number.isFinite(form.age) || form.age < 18 || form.age > 70) next.age = 'Age must be between 18 and 70'
    if (!form.department) next.department = 'Department is required'
    if (!form.jobRole) next.jobRole = 'Job role is required'
    if (!Number.isFinite(form.salary) || form.salary < 20000) next.salary = 'Enter a realistic annual salary'
    if (!Number.isFinite(form.experience) || form.experience < 0 || form.experience > 40) next.experience = 'Experience looks invalid'
    if (form.jobSatisfaction < 1 || form.jobSatisfaction > 5) next.jobSatisfaction = 'Choose 1 to 5'
    if (form.workLifeBalance < 1 || form.workLifeBalance > 5) next.workLifeBalance = 'Choose 1 to 5'
    if (!['Yes', 'No'].includes(form.overtime)) next.overtime = 'Select overtime'
    if (form.performanceRating < 1 || form.performanceRating > 5) next.performanceRating = 'Choose 1 to 5'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    const prediction = predictAttritionRisk(form)
    setResult(prediction)
    pushToast({
      type: prediction.level === 'High' ? 'error' : prediction.level === 'Medium' ? 'info' : 'success',
      message: `Predicted ${prediction.level} risk at ${prediction.score}%.`,
    })
    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="grid w-full items-start gap-6 lg:grid-cols-2">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel p-5"
        noValidate
      >
        <h2 className="font-display text-xl italic">Employee risk inputs</h2>
        <p className="mb-5 text-sm text-mist">Mock scoring model for this frontend task — no backend required.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Age" error={errors.age}>
            <input type="number" min="18" max="70" value={form.age} onChange={(e) => setField('age', Number(e.target.value))} className="field" />
          </Field>
          <Field label="Department" error={errors.department}>
            <select value={form.department} onChange={(e) => setField('department', e.target.value)} className="field">
              {departments.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="Job Role" error={errors.jobRole}>
            <select value={form.jobRole} onChange={(e) => setField('jobRole', e.target.value)} className="field">
              {jobRolesByDepartment[form.department].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="Salary" error={errors.salary}>
            <input type="number" min="20000" step="1000" value={form.salary} onChange={(e) => setField('salary', Number(e.target.value))} className="field" />
          </Field>
          <Field label="Experience" error={errors.experience}>
            <input type="number" min="0" max="40" value={form.experience} onChange={(e) => setField('experience', Number(e.target.value))} className="field" />
          </Field>
          <Field label="Job Satisfaction" error={errors.jobSatisfaction}>
            <input type="range" min="1" max="5" step="1" value={form.jobSatisfaction} onChange={(e) => setField('jobSatisfaction', Number(e.target.value))} />
            <p className="text-xs text-mist">{form.jobSatisfaction} / 5</p>
          </Field>
          <Field label="Work-Life Balance" error={errors.workLifeBalance}>
            <input type="range" min="1" max="5" step="1" value={form.workLifeBalance} onChange={(e) => setField('workLifeBalance', Number(e.target.value))} />
            <p className="text-xs text-mist">{form.workLifeBalance} / 5</p>
          </Field>
          <Field label="Overtime" error={errors.overtime}>
            <select value={form.overtime} onChange={(e) => setField('overtime', e.target.value)} className="field">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </Field>
          <Field label="Performance Rating" error={errors.performanceRating}>
            <input type="range" min="1" max="5" step="1" value={form.performanceRating} onChange={(e) => setField('performanceRating', Number(e.target.value))} />
            <p className="text-xs text-mist">{form.performanceRating} / 5</p>
          </Field>
        </div>
        <Magnetic>
          <button type="submit" className="btn-primary mt-5 w-full rounded-[18px_6px_18px_6px] py-3 text-sm font-semibold">
            Run risk prediction
          </button>
        </Magnetic>
      </motion.form>

      <div ref={resultRef} className="panel p-5">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"
            >
              <div className="mb-4 h-24 w-24 rounded-full border-4 border-dashed border-copper/30" />
              <h3 className="font-display text-xl italic">Awaiting a profile</h3>
              <p className="mt-1 max-w-xs text-sm text-mist">Submit the form to generate a Low, Medium or High risk result with a percentage indicator.</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${result.level}-${result.score}`}
              initial={{ opacity: 0, scale: 0.88, rotateX: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl italic">Prediction result</h2>
                <Badge tone={result.level.toLowerCase()}>{result.level} risk</Badge>
              </div>
              <p className="mt-2 text-center text-sm text-mist">
                Mock model estimate: <span className="font-semibold text-ink dark:text-[#fff8f0]">{result.score}%</span> chance of attrition
              </p>
              <RiskGauge score={result.score} level={result.level} />
              <div className="mt-4 space-y-3">
                <p className="text-sm font-semibold">Contributing factors</p>
                {result.factors.map((factor) => (
                  <p key={factor} className="rounded-[16px_6px_16px_6px] bg-parchment px-3 py-2 text-sm text-mist dark:bg-white/5">
                    {factor}
                  </p>
                ))}
                <p className="pt-2 text-sm font-semibold">Recommended actions</p>
                {result.actions.map((action) => (
                  <p key={action} className="text-sm text-mist">• {action}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink dark:text-[#f4eee4]">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-clay">{error}</span> : null}
    </label>
  )
}
