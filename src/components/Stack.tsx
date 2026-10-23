import type { CSSProperties } from 'react'
import Titulo from './Titulo'

const groups = [
  {
    name: 'Dados',
    color: 'var(--accent-strong)',
    items: [
      ['Python', 'trabalho e todos os projetos'],
      ['PySpark e BigQuery', 'trabalho, Google Cloud'],
      ['Airflow', 'trabalho, Combustíveis ANP'],
      ['dbt e DuckDB', 'Combustíveis ANP'],
      ['Kafka', 'Ônibus em tempo real'],
      ['SQL e PostgreSQL', 'Rastreador, Ônibus'],
    ],
  },
  {
    name: 'Backend',
    color: 'var(--accent-strong)',
    items: [
      ['Java e Spring Boot', 'Rastreador de candidaturas'],
      ['FastAPI', 'Ônibus em tempo real'],
      ['LLMs (Gemini)', 'Notas fiscais com IA'],
      ['JWT e Spring Security', 'Rastreador de candidaturas'],
      ['Docker e Compose', 'todos os projetos'],
    ],
  },
  {
    name: 'Frontend',
    color: 'var(--accent-strong)',
    items: [
      ['React', 'este site, Rastreador'],
      ['TypeScript', 'este site, Rastreador'],
      ['Mapas com MapLibre', 'Ônibus em tempo real'],
      ['Streamlit', 'Combustíveis ANP'],
    ],
  },
  {
    name: 'Fluxo de trabalho',
    color: 'var(--accent-strong)',
    items: [
      ['Testes automatizados', 'pytest, JUnit, Vitest, testes do dbt'],
      ['GitHub Actions', 'CI em todos os projetos'],
      ['Bitbucket', 'CI/CD e revisão no trabalho'],
      ['Google Cloud', 'infraestrutura de dados'],
    ],
  },
] as const

export default function Stack() {
  return (
    <section className="stack" id="ferramentas" aria-labelledby="ferramentas-title">
      <div className="stack__head grid12">
        <Titulo id="ferramentas-title" className="stack__title" texto="Ferramentas" />
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
