import type { CSSProperties } from 'react'

const groups = [
  {
    name: 'Dados',
    color: 'var(--mint)',
    items: [
      ['Python', 'trabalho e projetos'],
      ['PySpark', 'processamento em lote'],
      ['BigQuery', 'Google Cloud'],
      ['Airflow', 'orquestração de DAGs'],
      ['SQL e Postgres', 'Leitor de Documentos'],
    ],
  },
  {
    name: 'Backend',
    color: 'var(--orange)',
    items: [
      ['FastAPI', 'Leitor, Gerador de QR Code'],
      ['Java e Spring Boot', 'TradutorDocumentos'],
      ['Docker', 'Compose para API e banco'],
      ['OAuth2 e JWT', 'login com Google'],
    ],
  },
  {
    name: 'Frontend',
    color: 'var(--grey)',
    items: [
      ['React', 'este site, TradutorDocumentos'],
      ['TypeScript', 'este site'],
      ['JavaScript, HTML e CSS', 'a base de tudo'],
      ['Streamlit', 'Gerador de QR Code'],
    ],
  },
  {
    name: 'Fluxo de trabalho',
    color: 'var(--black)',
    items: [
      ['Git e GitHub', 'projetos pessoais'],
      ['Bitbucket', 'CI/CD e revisão'],
      ['Google Cloud', 'infraestrutura de dados'],
    ],
  },
] as const

export default function Stack() {
  return (
    <section className="stack" id="ferramentas" aria-labelledby="ferramentas-title">
      <div className="stack__head grid12">
        <h2 id="ferramentas-title" className="stack__title" data-reveal>Ferramentas</h2>
        <p className="stack__note" data-reveal style={{ '--d': 1 } as CSSProperties}>
          O que uso, e onde cada coisa aparece: no trabalho com dados ou nos projetos acima.
        </p>
      </div>
      <div className="stack__cols grid12">
        {groups.map((g, gi) => (
          <div className="stack__group" key={g.name} data-reveal style={{ '--d': gi } as CSSProperties}>
            <h3>{g.name}</h3>
            <ul className="stack__list">
              {g.items.map(([name, where]) => (
                <li className="stack__row" key={name}>
                  <span className="stack__name">
                    <i className="stack__dot" style={{ background: g.color }} aria-hidden />
                    {name}
                  </span>
                  <span className="stack__where">{where}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
