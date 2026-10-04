import { Bug, ShieldAlert, Gauge, CheckCircle2 } from 'lucide-react'
import SeverityBadge from './SeverityBadge.jsx'

const CATEGORY_META = {
  bugs: { label: 'Bugs', icon: Bug },
  security_issues: { label: 'Security', icon: ShieldAlert },
  performance_suggestions: { label: 'Performance', icon: Gauge },
}

const SEVERITY_ORDER = { critical: 0, warning: 1, suggestion: 2 }
const COUNT_COLOR = { critical: 'text-critical', warning: 'text-warning', suggestion: 'text-suggestion' }

export default function IssuesList({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-line bg-elevated px-4 py-6 text-sm text-muted">
        <CheckCircle2 size={18} className="text-accent" />
        No issues found — looks clean.
      </div>
    )
  }

  const grouped = issues.reduce((acc, issue) => {
    acc[issue.category] = acc[issue.category] || []
    acc[issue.category].push(issue)
    return acc
  }, {})

  const counts = issues.reduce((acc, i) => {
    acc[i.severity] = (acc[i.severity] || 0) + 1
    return acc
  }, {})

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-elevated px-4 py-3">
        <span className="text-sm font-medium text-muted">Review Results</span>
        <div className="flex gap-3 text-xs font-medium">
          {Object.entries(counts).map(([severity, count]) => (
            <span key={severity} className={COUNT_COLOR[severity]}>
              {count} {severity}
            </span>
          ))}
        </div>
      </div>

      <div className="divide-y divide-line">
        {Object.entries(CATEGORY_META).map(([key, meta]) => {
          const items = grouped[key]
          if (!items) return null
          const Icon = meta.icon

          return (
            <div key={key} className="bg-app px-4 py-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <Icon size={16} className="text-accent" />
                {meta.label}
                <span className="font-normal text-muted">({items.length})</span>
              </div>
              <ul className="space-y-2">
                {[...items]
                  .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
                  .map((issue, i) => (
                    <li
                      key={i}
                      className="flex items-start justify-between gap-3 rounded-md bg-elevated px-3 py-2"
                    >
                      <span className="text-sm text-primary">
                        {issue.line != null && (
                          <span className="mr-2 rounded bg-panel px-1.5 py-0.5 text-xs text-muted border border-line">
                            L{issue.line}
                          </span>
                        )}
                        {issue.message}
                      </span>
                      <SeverityBadge severity={issue.severity} />
                    </li>
                  ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
