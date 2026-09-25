export function Skeleton({ className = '' }) {
  return <div className={`relative overflow-hidden rounded-[22px_8px_22px_8px] bg-[#e6dccf] dark:bg-[#1b2824] ${className}`}><div className="shimmer absolute inset-0" /></div>
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 lg:col-span-2" />
        <Skeleton className="h-80" />
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-12" />
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-16" />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className={`h-80 ${index === 2 || index === 5 ? 'xl:col-span-2' : ''}`} />
      ))}
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-56" />
      <div className="grid gap-4 xl:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  )
}
