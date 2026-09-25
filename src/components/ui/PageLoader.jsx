import { BrandMark } from './BrandMark'

export function PageLoader() {
  return (
    <div className="flex min-h-[48vh] flex-col items-center justify-center gap-3">
      <BrandMark size={52} spinning />
      <p className="text-sm font-medium text-mist">Focusing the observatory…</p>
    </div>
  )
}
