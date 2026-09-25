export function ChartStage({ children, className = '', label = 'SIGHTLINE' }) {
  return (
    <div className={`chart-stage relative overflow-hidden rounded-[18px_6px_18px_6px] ${className}`}>
      <span className="chart-corner chart-tl" />
      <span className="chart-corner chart-tr" />
      <span className="chart-corner chart-bl" />
      <span className="chart-corner chart-br" />
      <span className="chart-sweep" />
      <span className="chart-live">
        <span className="chart-live-dot" />
        {label}
      </span>
      {children}
    </div>
  )
}

export function PulseDot({ cx, cy, fill = '#c46a2b' }) {
  if (cx == null || cy == null) return null
  return (
    <g>
      <circle cx={cx} cy={cy} r="9" fill={fill} opacity="0.18">
        <animate attributeName="r" values="5;13;5" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.28;0.05;0.28" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="4" fill={fill} stroke="#fff8f0" strokeWidth="1.2" />
    </g>
  )
}
