import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, type MotionValue } from 'framer-motion'
import { projects, type Project, type ProjectId } from '../data/projects'
import AnpUI from './fragments/AnpUI'
import NotasUI from './fragments/NotasUI'
import RastreadorUI from './fragments/RastreadorUI'
import StreamUI from './fragments/StreamUI'
import Titulo from './Titulo'

const screens: Record<ProjectId, ReactNode> = {
  anp: <AnpUI />,
  notas: <NotasUI />,
  rastreador: <RastreadorUI />,
  onibus: <StreamUI />,
}

const escuro = (p: Project) => p.field === 'f3' || p.field === 'f4'

/** As pastas só se empilham (position: sticky) com tela larga e alta; o efeito de profundidade segue isso. */
function useEmpilhado() {
  const consulta = '(min-width: 1081px) and (min-height: 681px) and (prefers-reduced-motion: no-preference)'
  const [sim, setSim] = useState(() => window.matchMedia(consulta).matches)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const on = () => setSim(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return sim
}

/**
 * Profundidade da pilha: enquanto a pasta seguinte sobe, esta recua (o conteúdo encolhe um pouco e
 * escurece). O recuo de cada pasta vai de 0 a 1 e chega ao CSS como --recuo.
 */
function useRecuo(proxima: React.RefObject<HTMLElement | null>) {
  return useScroll({ target: proxima, offset: ['start 75%', 'start 12%'] }).scrollYProgress
}

const estilo = (v: MotionValue<number> | undefined) => (v ? ({ '--recuo': v } as unknown as CSSProperties) : undefined)

export default function Work() {
  const empilhado = useEmpilhado()
  const r0 = useRef<HTMLElement>(null)
  const r1 = useRef<HTMLElement>(null)
  const r2 = useRef<HTMLElement>(null)
  const r3 = useRef<HTMLElement>(null)
  const refs = [r0, r1, r2, r3]
  const recuos = [useRecuo(r1), useRecuo(r2), useRecuo(r3), undefined]

  return (
    <section className="work" id="projetos" aria-labelledby="projetos-title">
      <div className="work__head grid12">
        <Titulo id="projetos-title" className="work__title" texto="Os projetos" />
        <p className="work__note" data-reveal style={{ '--d': 1 } as CSSProperties}>
          Quatro projetos, arquivados como pastas. Role para abrir cada uma: dá para rodar a DAG de novo, trocar a
          versão da nota e arrastar as candidaturas.
        </p>
      </div>

      <div className="folders">
        {projects.map((p, i) => {
          const meu = empilhado ? recuos[i] : undefined
          const anterior = empilhado && i > 0 ? recuos[i - 1] : undefined
          return (
            <article
              key={p.id}
              ref={refs[i]}
              className={`folder${escuro(p) ? ' on-dark' : ''}`}
              style={{ '--i': i, '--prev': i ? `var(--${projects[i - 1].field})` : 'var(--ground)' } as CSSProperties}
              aria-labelledby={`p-${p.id}`}
            >
              <motion.div className="folder__tabrow" style={estilo(anterior)}>
                <h3 id={`p-${p.id}`} className={`folder__tab field-${p.field}`}>{p.name}</h3>
              </motion.div>
              <motion.div className={`folder__band grid12 field-${p.field}`} style={estilo(meu)}>
                <p className="folder__strip">{p.category}</p>
                <div className="folder__media shutter">{screens[p.id]}</div>
                <div className="folder__text">
                  <p data-reveal>{p.description}</p>
                  <ul className="folder__tech" aria-label="Tecnologias" data-reveal style={{ '--d': 1 } as CSSProperties}>
                    {p.tech.map((t, j) => <li key={t} style={{ '--j': j } as CSSProperties}>{t}</li>)}
                  </ul>
                  <a
                    className={escuro(p) ? 'button' : 'button button--ink'}
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    data-reveal
                    data-magnet
                    style={{ '--d': 2 } as CSSProperties}
                  >
                    Ver o código no GitHub <span className="arrow" aria-hidden>→</span>
                  </a>
                </div>
              </motion.div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
