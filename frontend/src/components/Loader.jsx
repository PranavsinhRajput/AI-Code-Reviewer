export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-soft-accent border-t-accent" />
      <span className="text-sm text-muted">Reviewing your code…</span>
    </div>
  )
}
