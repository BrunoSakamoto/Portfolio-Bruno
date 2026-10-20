import type { CSSProperties, ReactNode } from 'react'
import { projects, type ProjectId } from '../data/projects'
import TradutorUI from './fragments/TradutorUI'
import LeitorUI from './fragments/LeitorUI'
import GameUI from './fragments/GameUI'
import QrLive from './fragments/QrLive'

const screens: Record<ProjectId, ReactNode> = {
  tradutor: <TradutorUI />,
  leitor: <LeitorUI />,
  jogo: <GameUI />,
  qrcode: <QrLive />,
}

export default function Work() {
  return (
    <section className="work" id="projetos" aria-labelledby="projetos-title">
      <div className="work__head grid12">
        <h2 id="projetos-title" className="work__title" data-reveal>Os projetos</h2>
        <p className="work__note" data-reveal style={{ '--d': 1 } as CSSProperties}>
          Quatro trabalhos, arquivados como pastas. Role para abrir cada uma; o último funciona aqui mesmo.
        </p>
      </div>

      <div className="folders">
        {projects.map((p, i) => (
          <article
            key={p.id}
            className={`folder${p.field === 'black' ? ' on-dark' : ''}`}
            style={{ '--i': i, '--prev': i ? `var(--${projects[i - 1].field})` : 'var(--ground)' } as CSSProperties}
            aria-labelledby={`p-${p.id}`}
          >
            <div className="folder__tabrow">
              <h3 id={`p-${p.id}`} className={`folder__tab field-${p.field}`}>{p.name}</h3>
            </div>
            <div className={`folder__band grid12 field-${p.field}`}>
              <p className="folder__strip">{p.category}</p>
              <div className="folder__media shutter">{screens[p.id]}</div>
              <div className="folder__text">
                <p data-reveal>{p.description}</p>
                <ul className="folder__tech" aria-label="Tecnologias" data-reveal style={{ '--d': 1 } as CSSProperties}>
                  {p.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <a className={p.field === 'black' ? 'button' : 'button button--ink'} href={p.github} target="_blank" rel="noreferrer" data-reveal style={{ '--d': 2 } as CSSProperties}>
                  Ver o código no GitHub <span className="arrow" aria-hidden>→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
