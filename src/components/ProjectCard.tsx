import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Badge from './Badge'

type Project = {
    title: string
    role?: string
    description: string
    highlights: string[]
    tech: string[]
    github: string
}

export default function ProjectCard({ p, i }: { p: Project; i: number }) {
    return (
        <motion.a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05 }}
            className="group block glass rounded-2xl p-5 md:p-6 hover:shadow-2xl tilt"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                    {p.role && <p className="text-xs text-white/60 mt-0.5">{p.role}</p>}
                </div>
                <Github className="opacity-70 group-hover:opacity-100 transition-opacity" size={20} />
            </div>

            <p className="mt-3 text-sm/relaxed text-white/80">{p.description}</p>

            <ul className="mt-4 grid gap-2 text-sm text-white/90">
                {p.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-white/50" />
                        <span>{h}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t, idx) => <Badge key={idx}>{t}</Badge>)}
            </div>
        </motion.a>
    )
}