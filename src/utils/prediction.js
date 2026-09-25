export function predictAttritionRisk(input) {
  let score = 12

  if (input.overtime === 'Yes') score += 20
  if (Number(input.jobSatisfaction) <= 2) score += 24
  else if (Number(input.jobSatisfaction) === 3) score += 10
  if (Number(input.workLifeBalance) <= 2) score += 16
  else if (Number(input.workLifeBalance) === 3) score += 6

  const salary = Number(input.salary)
  if (salary < 60000) score += 16
  else if (salary < 80000) score += 10
  else if (salary < 100000) score += 4

  const experience = Number(input.experience)
  if (experience <= 2) score += 12
  else if (experience >= 12) score += 4

  const age = Number(input.age)
  if (age < 26) score += 10
  else if (age > 50) score += 3

  if (Number(input.performanceRating) <= 2) score += 12
  else if (Number(input.performanceRating) === 5) score -= 6

  if (['Sales', 'Support'].includes(input.department)) score += 8
  if (['HR', 'R&D'].includes(input.department)) score -= 4

  score = Math.min(94, Math.max(6, Math.round(score)))

  let level = 'Low'
  if (score >= 65) level = 'High'
  else if (score >= 36) level = 'Medium'

  const factors = []
  if (input.overtime === 'Yes') factors.push('Frequent overtime increases burnout likelihood')
  if (Number(input.jobSatisfaction) <= 2) factors.push('Low job satisfaction is a primary attrition driver')
  if (Number(input.workLifeBalance) <= 2) factors.push('Work-life imbalance is elevating exit intent')
  if (salary < 80000) factors.push('Compensation sits below the internal mid-band')
  if (experience <= 2) factors.push('Early-tenure employees show higher flight risk')
  if (['Sales', 'Support'].includes(input.department)) factors.push(`${input.department} historically has higher turnover`)
  if (Number(input.performanceRating) <= 2) factors.push('Performance pressure may trigger voluntary exit')
  if (!factors.length) factors.push('Profile looks stable across compensation, tenure and engagement')

  const actions =
    level === 'High'
      ? ['Schedule a stay interview this week', 'Review compensation and workload', 'Assign a mentor or skip-level check-in']
      : level === 'Medium'
        ? ['Monitor overtime hours for 30 days', 'Include in next engagement pulse', 'Discuss career path in 1:1']
        : ['Keep in regular recognition cadence', 'Use as a culture ambassador', 'No immediate intervention required']

  return { score, level, factors, actions }
}

export function riskFromEmployee(employee) {
  return predictAttritionRisk(employee)
}
