import { ReactNode } from "react"

export default function SectionHeader({ number, label, title, description, aside }: { number: string; label: string; title: ReactNode; description?: string; aside?: string }) {
  return <header className="editorial-header">
    <div className="editorial-meta"><span>{number} / {label}</span>{aside && <span>{aside}</span>}</div>
    <div className="editorial-rule" />
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </header>
}
