import { ReactNode } from 'react'


type Props = { id?: string; className?: string; children: ReactNode; title?: string; subtitle?: string }
export default function Section({ id, className = '', children, title, subtitle }: Props) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-20 ${className}`}>
      {title && (
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm/relaxed text-white/70 mt-2 max-w-2xl">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  )
}