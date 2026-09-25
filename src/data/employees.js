const seeds = [
  { name: 'Aarav Sharma', gender: 'Male', age: 32, department: 'Engineering', jobRole: 'Senior Software Engineer', salary: 128000, experience: 8, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'No', performanceRating: 4, education: "Master's Degree", location: 'San Francisco, CA', joinDate: '2018-04-16', manager: 'Priya Mehta', lastPromotion: '2023-07-01' },
  { name: 'Maya Chen', gender: 'Female', age: 28, department: 'Engineering', jobRole: 'Software Engineer', salary: 98000, experience: 4, status: 'Active', jobSatisfaction: 4, workLifeBalance: 4, overtime: 'Yes', performanceRating: 4, education: "Bachelor's Degree", location: 'Austin, TX', joinDate: '2021-02-08', manager: 'Aarav Sharma', lastPromotion: '2024-03-12' },
  { name: 'James Walker', gender: 'Male', age: 41, department: 'Engineering', jobRole: 'Tech Lead', salary: 156000, experience: 14, status: 'Active', jobSatisfaction: 3, workLifeBalance: 2, overtime: 'Yes', performanceRating: 5, education: "Master's Degree", location: 'Seattle, WA', joinDate: '2015-09-21', manager: 'Priya Mehta', lastPromotion: '2022-11-04' },
  { name: 'Sofia Alvarez', gender: 'Female', age: 26, department: 'Engineering', jobRole: 'QA Engineer', salary: 76000, experience: 3, status: 'Left', jobSatisfaction: 2, workLifeBalance: 2, overtime: 'Yes', performanceRating: 3, education: "Bachelor's Degree", location: 'Austin, TX', joinDate: '2022-06-13', manager: 'James Walker', lastPromotion: null, exitDate: '2025-11-18' },
  { name: 'Rohan Iyer', gender: 'Male', age: 35, department: 'Engineering', jobRole: 'DevOps Engineer', salary: 118000, experience: 9, status: 'Active', jobSatisfaction: 5, workLifeBalance: 4, overtime: 'No', performanceRating: 4, education: "Bachelor's Degree", location: 'Bengaluru, IN', joinDate: '2017-01-30', manager: 'James Walker', lastPromotion: '2024-01-15' },
  { name: 'Emily Brooks', gender: 'Female', age: 30, department: 'Engineering', jobRole: 'Software Engineer', salary: 102000, experience: 6, status: 'Active', jobSatisfaction: 3, workLifeBalance: 3, overtime: 'Yes', performanceRating: 3, education: "Bachelor's Degree", location: 'New York, NY', joinDate: '2019-08-19', manager: 'Aarav Sharma', lastPromotion: '2023-02-20' },
  { name: 'Kenji Sato', gender: 'Male', age: 38, department: 'Engineering', jobRole: 'Senior Software Engineer', salary: 142000, experience: 12, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'No', performanceRating: 5, education: "Master's Degree", location: 'Tokyo, JP', joinDate: '2016-05-02', manager: 'Priya Mehta', lastPromotion: '2023-09-08' },
  { name: 'Hannah Cole', gender: 'Female', age: 24, department: 'Engineering', jobRole: 'QA Engineer', salary: 68000, experience: 2, status: 'Active', jobSatisfaction: 4, workLifeBalance: 5, overtime: 'No', performanceRating: 4, education: "Bachelor's Degree", location: 'Austin, TX', joinDate: '2024-01-09', manager: 'James Walker', lastPromotion: null },
  { name: 'Victor Lang', gender: 'Male', age: 29, department: 'Engineering', jobRole: 'Software Engineer', salary: 91000, experience: 5, status: 'Left', jobSatisfaction: 1, workLifeBalance: 2, overtime: 'Yes', performanceRating: 2, education: "Bachelor's Degree", location: 'Remote', joinDate: '2020-10-14', manager: 'Aarav Sharma', lastPromotion: null, exitDate: '2026-02-28' },
  { name: 'Priya Mehta', gender: 'Female', age: 44, department: 'Engineering', jobRole: 'Tech Lead', salary: 172000, experience: 18, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'No', performanceRating: 5, education: 'Doctorate', location: 'San Francisco, CA', joinDate: '2012-03-05', manager: 'Daniel Frost', lastPromotion: '2021-06-01' },
  { name: 'Liam Oconnor', gender: 'Male', age: 33, department: 'Sales', jobRole: 'Account Manager', salary: 88000, experience: 7, status: 'Active', jobSatisfaction: 3, workLifeBalance: 2, overtime: 'Yes', performanceRating: 4, education: "Bachelor's Degree", location: 'Chicago, IL', joinDate: '2019-03-11', manager: 'Nora Blake', lastPromotion: '2024-05-06' },
  { name: 'Amelia Grant', gender: 'Female', age: 27, department: 'Sales', jobRole: 'Sales Executive', salary: 62000, experience: 3, status: 'Left', jobSatisfaction: 2, workLifeBalance: 2, overtime: 'Yes', performanceRating: 3, education: "Bachelor's Degree", location: 'Chicago, IL', joinDate: '2022-09-01', manager: 'Liam Oconnor', lastPromotion: null, exitDate: '2026-01-10' },
  { name: 'Noah Patel', gender: 'Male', age: 39, department: 'Sales', jobRole: 'Sales Manager', salary: 124000, experience: 13, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'Yes', performanceRating: 5, education: "Master's Degree", location: 'New York, NY', joinDate: '2014-11-17', manager: 'Nora Blake', lastPromotion: '2022-08-22' },
  { name: 'Chloe Nguyen', gender: 'Female', age: 31, department: 'Sales', jobRole: 'Account Manager', salary: 84000, experience: 6, status: 'Active', jobSatisfaction: 5, workLifeBalance: 4, overtime: 'No', performanceRating: 4, education: "Bachelor's Degree", location: 'Singapore, SG', joinDate: '2020-01-20', manager: 'Noah Patel', lastPromotion: '2024-09-02' },
  { name: 'Marcus Reed', gender: 'Male', age: 25, department: 'Sales', jobRole: 'Sales Executive', salary: 54000, experience: 2, status: 'Left', jobSatisfaction: 2, workLifeBalance: 1, overtime: 'Yes', performanceRating: 2, education: 'College', location: 'Dallas, TX', joinDate: '2023-04-03', manager: 'Liam Oconnor', lastPromotion: null, exitDate: '2025-12-19' },
  { name: 'Nora Blake', gender: 'Female', age: 46, department: 'Sales', jobRole: 'Sales Manager', salary: 138000, experience: 20, status: 'Active', jobSatisfaction: 3, workLifeBalance: 3, overtime: 'No', performanceRating: 4, education: "Master's Degree", location: 'New York, NY', joinDate: '2011-07-25', manager: 'Daniel Frost', lastPromotion: '2020-10-12' },
  { name: 'Isha Kapoor', gender: 'Female', age: 34, department: 'HR', jobRole: 'HR Manager', salary: 110000, experience: 10, status: 'Active', jobSatisfaction: 5, workLifeBalance: 4, overtime: 'No', performanceRating: 5, education: "Master's Degree", location: 'San Francisco, CA', joinDate: '2016-02-14', manager: 'Daniel Frost', lastPromotion: '2023-04-18' },
  { name: 'Owen Ellis', gender: 'Male', age: 29, department: 'HR', jobRole: 'Recruiter', salary: 72000, experience: 5, status: 'Active', jobSatisfaction: 4, workLifeBalance: 5, overtime: 'No', performanceRating: 4, education: "Bachelor's Degree", location: 'Austin, TX', joinDate: '2021-05-24', manager: 'Isha Kapoor', lastPromotion: '2025-01-07' },
  { name: 'Zara Ahmed', gender: 'Female', age: 26, department: 'HR', jobRole: 'HR Executive', salary: 64000, experience: 3, status: 'Active', jobSatisfaction: 4, workLifeBalance: 4, overtime: 'No', performanceRating: 3, education: "Bachelor's Degree", location: 'London, UK', joinDate: '2022-11-28', manager: 'Isha Kapoor', lastPromotion: null },
  { name: 'Daniel Frost', gender: 'Male', age: 51, department: 'Finance', jobRole: 'Finance Manager', salary: 164000, experience: 24, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'No', performanceRating: 5, education: "Master's Degree", location: 'San Francisco, CA', joinDate: '2009-01-12', manager: 'Board', lastPromotion: '2019-03-01' },
  { name: 'Leila Hassan', gender: 'Female', age: 36, department: 'Finance', jobRole: 'Financial Analyst', salary: 92000, experience: 11, status: 'Active', jobSatisfaction: 3, workLifeBalance: 3, overtime: 'Yes', performanceRating: 4, education: "Master's Degree", location: 'London, UK', joinDate: '2017-08-07', manager: 'Daniel Frost', lastPromotion: '2023-12-11' },
  { name: 'Theo Marin', gender: 'Male', age: 42, department: 'Finance', jobRole: 'Accountant', salary: 78000, experience: 15, status: 'Active', jobSatisfaction: 4, workLifeBalance: 4, overtime: 'No', performanceRating: 3, education: "Bachelor's Degree", location: 'Paris, FR', joinDate: '2013-06-18', manager: 'Daniel Frost', lastPromotion: '2021-09-30' },
  { name: 'Grace Kim', gender: 'Female', age: 23, department: 'Finance', jobRole: 'Financial Analyst', salary: 67000, experience: 1, status: 'Left', jobSatisfaction: 2, workLifeBalance: 3, overtime: 'Yes', performanceRating: 3, education: "Bachelor's Degree", location: 'Seoul, KR', joinDate: '2024-07-01', manager: 'Leila Hassan', lastPromotion: null, exitDate: '2026-03-20' },
  { name: 'Felix Ortega', gender: 'Male', age: 37, department: 'Marketing', jobRole: 'Marketing Manager', salary: 115000, experience: 12, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'No', performanceRating: 4, education: "Master's Degree", location: 'Los Angeles, CA', joinDate: '2016-10-03', manager: 'Daniel Frost', lastPromotion: '2022-05-16' },
  { name: 'Ava Singh', gender: 'Female', age: 28, department: 'Marketing', jobRole: 'Content Strategist', salary: 74000, experience: 5, status: 'Active', jobSatisfaction: 5, workLifeBalance: 4, overtime: 'No', performanceRating: 4, education: "Bachelor's Degree", location: 'Mumbai, IN', joinDate: '2021-03-22', manager: 'Felix Ortega', lastPromotion: '2025-02-14' },
  { name: 'Ben Carter', gender: 'Male', age: 31, department: 'Marketing', jobRole: 'Marketing Specialist', salary: 71000, experience: 6, status: 'Left', jobSatisfaction: 2, workLifeBalance: 2, overtime: 'Yes', performanceRating: 2, education: "Bachelor's Degree", location: 'Los Angeles, CA', joinDate: '2019-12-02', manager: 'Felix Ortega', lastPromotion: '2022-01-10', exitDate: '2025-10-31' },
  { name: 'Nina Volkov', gender: 'Female', age: 40, department: 'Marketing', jobRole: 'Marketing Specialist', salary: 86000, experience: 14, status: 'Active', jobSatisfaction: 3, workLifeBalance: 3, overtime: 'No', performanceRating: 3, education: "Master's Degree", location: 'Berlin, DE', joinDate: '2015-04-27', manager: 'Felix Ortega', lastPromotion: '2024-06-03' },
  { name: 'Samir Qureshi', gender: 'Male', age: 45, department: 'Operations', jobRole: 'Operations Manager', salary: 121000, experience: 19, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'No', performanceRating: 4, education: "Master's Degree", location: 'Chicago, IL', joinDate: '2013-02-11', manager: 'Daniel Frost', lastPromotion: '2021-01-19' },
  { name: 'Ruby Tan', gender: 'Female', age: 27, department: 'Operations', jobRole: 'Operations Analyst', salary: 69000, experience: 4, status: 'Active', jobSatisfaction: 4, workLifeBalance: 4, overtime: 'No', performanceRating: 4, education: "Bachelor's Degree", location: 'Singapore, SG', joinDate: '2022-02-14', manager: 'Samir Qureshi', lastPromotion: null },
  { name: 'Chris Donovan', gender: 'Male', age: 34, department: 'Operations', jobRole: 'Operations Analyst', salary: 77000, experience: 8, status: 'Active', jobSatisfaction: 3, workLifeBalance: 3, overtime: 'Yes', performanceRating: 3, education: "Bachelor's Degree", location: 'Chicago, IL', joinDate: '2018-09-04', manager: 'Samir Qureshi', lastPromotion: '2023-08-21' },
  { name: 'Elena Rossi', gender: 'Female', age: 38, department: 'R&D', jobRole: 'Research Scientist', salary: 134000, experience: 13, status: 'Active', jobSatisfaction: 5, workLifeBalance: 4, overtime: 'No', performanceRating: 5, education: 'Doctorate', location: 'Zurich, CH', joinDate: '2015-11-09', manager: 'Priya Mehta', lastPromotion: '2023-03-27' },
  { name: 'David Park', gender: 'Male', age: 29, department: 'R&D', jobRole: 'Data Scientist', salary: 119000, experience: 6, status: 'Active', jobSatisfaction: 4, workLifeBalance: 3, overtime: 'Yes', performanceRating: 4, education: "Master's Degree", location: 'Seattle, WA', joinDate: '2020-06-15', manager: 'Elena Rossi', lastPromotion: '2024-10-01' },
  { name: 'Ines Moreau', gender: 'Female', age: 33, department: 'R&D', jobRole: 'Data Scientist', salary: 126000, experience: 9, status: 'Active', jobSatisfaction: 4, workLifeBalance: 4, overtime: 'No', performanceRating: 5, education: "Master's Degree", location: 'Paris, FR', joinDate: '2017-12-04', manager: 'Elena Rossi', lastPromotion: '2025-04-08' },
  { name: 'Tyler Brooks', gender: 'Male', age: 22, department: 'Support', jobRole: 'Support Specialist', salary: 48000, experience: 1, status: 'Left', jobSatisfaction: 1, workLifeBalance: 2, overtime: 'Yes', performanceRating: 2, education: 'College', location: 'Dallas, TX', joinDate: '2024-08-19', manager: 'Keisha Ward', lastPromotion: null, exitDate: '2026-01-31' },
  { name: 'Keisha Ward', gender: 'Female', age: 36, department: 'Support', jobRole: 'Support Lead', salary: 82000, experience: 11, status: 'Active', jobSatisfaction: 3, workLifeBalance: 3, overtime: 'Yes', performanceRating: 4, education: "Bachelor's Degree", location: 'Atlanta, GA', joinDate: '2016-07-18', manager: 'Samir Qureshi', lastPromotion: '2022-12-05' },
  { name: 'Hugo Silva', gender: 'Male', age: 30, department: 'Support', jobRole: 'Support Specialist', salary: 56000, experience: 5, status: 'Active', jobSatisfaction: 3, workLifeBalance: 2, overtime: 'Yes', performanceRating: 3, education: "Bachelor's Degree", location: 'Lisbon, PT', joinDate: '2021-09-27', manager: 'Keisha Ward', lastPromotion: '2024-11-18' },
]

function slugEmail(name) {
  return `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@staysight.com`
}

export const employees = seeds.map((seed, index) => ({
  id: `SS-${1001 + index}`,
  email: slugEmail(seed.name),
  phone: `+1 (415) 555-${String(1000 + index).slice(-4)}`,
  address: seed.location,
  emergencyContact: 'Listed with HR operations',
  avatarHue: (index * 47) % 360,
  ...seed,
}))

export const departments = [
  'Engineering',
  'Sales',
  'HR',
  'Finance',
  'Marketing',
  'Operations',
  'R&D',
  'Support',
]

export const jobRolesByDepartment = {
  Engineering: ['Software Engineer', 'Senior Software Engineer', 'Tech Lead', 'QA Engineer', 'DevOps Engineer'],
  Sales: ['Sales Executive', 'Account Manager', 'Sales Manager'],
  HR: ['HR Executive', 'Recruiter', 'HR Manager'],
  Finance: ['Financial Analyst', 'Accountant', 'Finance Manager'],
  Marketing: ['Marketing Specialist', 'Content Strategist', 'Marketing Manager'],
  Operations: ['Operations Analyst', 'Operations Manager'],
  'R&D': ['Research Scientist', 'Data Scientist'],
  Support: ['Support Specialist', 'Support Lead'],
}

export const activities = [
  { id: 1, employeeId: 'SS-1009', employeeName: 'Victor Lang', action: 'Resigned — last working day completed', time: '2 hours ago', type: 'leave' },
  { id: 2, employeeId: 'SS-1033', employeeName: 'Ines Moreau', action: 'Promoted to Principal Data Scientist track', time: '5 hours ago', type: 'promotion' },
  { id: 3, employeeId: 'SS-1008', employeeName: 'Hannah Cole', action: 'Completed Q3 performance review', time: 'Yesterday', type: 'review' },
  { id: 4, employeeId: 'SS-1023', employeeName: 'Grace Kim', action: 'Marked as attrition — finance analyst', time: 'Yesterday', type: 'leave' },
  { id: 5, employeeId: 'SS-1018', employeeName: 'Owen Ellis', action: 'Closed 6 engineering requisitions', time: '2 days ago', type: 'review' },
  { id: 6, employeeId: 'SS-1002', employeeName: 'Maya Chen', action: 'Transferred to Platform squad', time: '3 days ago', type: 'transfer' },
  { id: 7, employeeId: 'SS-1008', employeeName: 'Hannah Cole', action: 'Joined StaySight as QA Engineer', time: '4 days ago', type: 'join' },
  { id: 8, employeeId: 'SS-1025', employeeName: 'Ava Singh', action: 'Received spot bonus for campaign launch', time: '5 days ago', type: 'promotion' },
  { id: 9, employeeId: 'SS-1012', employeeName: 'Amelia Grant', action: 'Exit interview completed', time: '1 week ago', type: 'leave' },
  { id: 10, employeeId: 'SS-1032', employeeName: 'David Park', action: 'Published internal ML playbook', time: '1 week ago', type: 'review' },
]

export function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id)
}

export function getDashboardStats() {
  const total = employees.length
  const active = employees.filter((e) => e.status === 'Active').length
  const left = total - active
  const attritionRate = (left / total) * 100
  const averageSalary = employees.reduce((sum, e) => sum + e.salary, 0) / total
  return { total, active, left, attritionRate, averageSalary }
}

export function getDepartmentStats() {
  return departments.map((department) => {
    const list = employees.filter((e) => e.department === department)
    const left = list.filter((e) => e.status === 'Left').length
    const avgSalary = list.reduce((sum, e) => sum + e.salary, 0) / list.length
    return {
      department,
      headcount: list.length,
      active: list.length - left,
      left,
      attritionRate: list.length ? (left / list.length) * 100 : 0,
      avgSalary,
    }
  })
}

function rateFor(list) {
  if (!list.length) return 0
  return (list.filter((e) => e.status === 'Left').length / list.length) * 100
}

export function getAttritionByAge() {
  const buckets = [
    { label: '18–25', min: 18, max: 25 },
    { label: '26–35', min: 26, max: 35 },
    { label: '36–45', min: 36, max: 45 },
    { label: '46–55', min: 46, max: 55 },
    { label: '56+', min: 56, max: 120 },
  ]
  return buckets.map((bucket) => {
    const list = employees.filter((e) => e.age >= bucket.min && e.age <= bucket.max)
    const left = list.filter((e) => e.status === 'Left').length
    return { name: bucket.label, employees: list.length, left, attrition: Number(rateFor(list).toFixed(1)) }
  })
}

export function getAttritionByRole() {
  const roles = [...new Set(employees.map((e) => e.jobRole))]
  return roles
    .map((role) => {
      const list = employees.filter((e) => e.jobRole === role)
      const left = list.filter((e) => e.status === 'Left').length
      return { name: role, employees: list.length, left, attrition: Number(rateFor(list).toFixed(1)) }
    })
    .sort((a, b) => b.attrition - a.attrition)
}

export function getAttritionBySalary() {
  const buckets = [
    { name: '< $60k', min: 0, max: 59999 },
    { name: '$60–80k', min: 60000, max: 79999 },
    { name: '$80–100k', min: 80000, max: 99999 },
    { name: '$100–130k', min: 100000, max: 129999 },
    { name: '$130k+', min: 130000, max: 999999 },
  ]
  return buckets.map((bucket) => {
    const list = employees.filter((e) => e.salary >= bucket.min && e.salary <= bucket.max)
    const left = list.filter((e) => e.status === 'Left').length
    return { name: bucket.name, employees: list.length, left, attrition: Number(rateFor(list).toFixed(1)) }
  })
}

export function getAttritionByExperience() {
  const buckets = [
    { name: '0–2 yrs', min: 0, max: 2 },
    { name: '3–5 yrs', min: 3, max: 5 },
    { name: '6–10 yrs', min: 6, max: 10 },
    { name: '11+ yrs', min: 11, max: 50 },
  ]
  return buckets.map((bucket) => {
    const list = employees.filter((e) => e.experience >= bucket.min && e.experience <= bucket.max)
    const left = list.filter((e) => e.status === 'Left').length
    return { name: bucket.name, employees: list.length, left, attrition: Number(rateFor(list).toFixed(1)) }
  })
}

export function getSatisfactionAnalysis() {
  return [1, 2, 3, 4, 5].map((score) => {
    const list = employees.filter((e) => e.jobSatisfaction === score)
    const left = list.filter((e) => e.status === 'Left').length
    return {
      name: `${score} ★`,
      score,
      employees: list.length,
      left,
      active: list.length - left,
      attrition: Number(rateFor(list).toFixed(1)),
    }
  })
}

export const monthlyTrend = [
  { month: 'Apr', attrition: 8.2, hires: 6 },
  { month: 'May', attrition: 9.1, hires: 4 },
  { month: 'Jun', attrition: 7.4, hires: 8 },
  { month: 'Jul', attrition: 11.6, hires: 5 },
  { month: 'Aug', attrition: 10.2, hires: 7 },
  { month: 'Sep', attrition: 12.8, hires: 3 },
  { month: 'Oct', attrition: 14.1, hires: 4 },
  { month: 'Nov', attrition: 13.4, hires: 6 },
  { month: 'Dec', attrition: 15.8, hires: 2 },
  { month: 'Jan', attrition: 16.4, hires: 5 },
  { month: 'Feb', attrition: 17.2, hires: 3 },
  { month: 'Mar', attrition: 16.7, hires: 4 },
]

export function getEmployeeActivities(employeeId) {
  const owned = activities.filter((item) => item.employeeId === employeeId)
  const employee = getEmployeeById(employeeId)
  if (!employee) return owned
  const extras = [
    { id: `${employeeId}-a`, employeeId, employeeName: employee.name, action: `Joined ${employee.department} as ${employee.jobRole}`, time: employee.joinDate, type: 'join' },
    employee.lastPromotion
      ? { id: `${employeeId}-b`, employeeId, employeeName: employee.name, action: 'Compensation and title review completed', time: employee.lastPromotion, type: 'promotion' }
      : null,
    employee.status === 'Left' && employee.exitDate
      ? { id: `${employeeId}-c`, employeeId, employeeName: employee.name, action: 'Employee exited the organization', time: employee.exitDate, type: 'leave' }
      : { id: `${employeeId}-d`, employeeId, employeeName: employee.name, action: `Latest performance rating: ${employee.performanceRating}/5`, time: 'This quarter', type: 'review' },
  ].filter(Boolean)
  return [...owned, ...extras]
}
