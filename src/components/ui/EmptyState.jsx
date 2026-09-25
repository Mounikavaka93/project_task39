import { SearchX } from 'lucide-react'

export function EmptyState({ title = 'Nothing to show yet', description = 'Try adjusting your search or filters.', icon: Icon = SearchX }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px_8px_28px_8px] border border-dashed border-[#1c1914]/15 px-6 py-16 text-center dark:border-white/15">
      <div className="mb-4 rounded-2xl bg-parchment p-4 dark:bg-white/5">
        <Icon className="h-8 w-8 text-mist" />
      </div>
      <h3 className="font-display text-xl italic">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-mist">{description}</p>
    </div>
  )
}
