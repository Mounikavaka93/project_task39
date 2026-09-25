const tones = {
  active: 'bg-moss/12 text-moss ring-moss/20',
  left: 'bg-clay/12 text-clay ring-clay/20',
  low: 'bg-moss/12 text-moss ring-moss/20',
  medium: 'bg-ochre/15 text-[#8a6410] ring-ochre/25 dark:text-[#e8c56a]',
  high: 'bg-clay/12 text-clay ring-clay/20',
  info: 'bg-copper/12 text-copper ring-copper/20',
}

export function Badge({ children, tone = 'info' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tones[tone] ?? tones.info}`}>
      {children}
    </span>
  )
}
