const STYLES = {
  critical: 'bg-critical/10 text-critical border-critical/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  suggestion: 'bg-suggestion/10 text-suggestion border-suggestion/30',
}

export default function SeverityBadge({ severity }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STYLES[severity]}`}
    >
      {severity}
    </span>
  )
}