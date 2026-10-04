import { LANGUAGES } from '../utils/languageConfig.js'

export default function LanguageSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-line bg-panel px-3 py-2 text-sm
                 text-primary focus:border-accent focus:outline-none
                 focus:ring-2 focus:ring-soft-accent"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}
