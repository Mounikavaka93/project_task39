import { useCountUp } from '../../hooks/useCountUp'

export function SignalTicker({ attrition, headcount }) {
  const items = [
    `FOCUS ${attrition.toFixed(1)}%`,
    `HEADCOUNT ${headcount}`,
    'LENS OPEN',
    'SIGNAL LIVE',
    'SIGHTLINE OS',
    'RISK SWEEP',
  ]

  return (
    <div className="signal-ticker mt-8 overflow-hidden rounded-[16px_4px_16px_4px] border border-white/10 bg-[#fff8f0]/5">
      <div className="signal-track">
        {[0, 1].map((copy) => (
          <p key={copy} className="flex shrink-0 items-center gap-6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8c39a]">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-6">
                <span>{item}</span>
                <span className="h-1 w-1 rounded-full bg-copper" />
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  )
}

export function HeroMetric({ value, label, decimals = 0, suffix = '' }) {
  const counted = useCountUp(value, 1400)
  return (
    <div>
      <p className="font-display text-2xl italic">
        {counted.toFixed(decimals)}{suffix}
      </p>
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#e8c39a]">{label}</p>
    </div>
  )
}
