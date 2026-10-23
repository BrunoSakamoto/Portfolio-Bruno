import { useRef, type CSSProperties } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Titulo from './Titulo'

const ITENS = [
  {
    periodo: 'jan 2026 – hoje',
    cargo: 'Engenheiro de Dados',
    lugar: '2RP NET, Sorocaba',
    texto:
      'Pipelines em Python e PySpark, tabelas no BigQuery e DAGs no Airflow, com o código versionado, revisado e entregue por CI/CD no Bitbucket.',
  },
  {
    periodo: 'mar 2024 – dez 2025',
    cargo: 'Estagiário em Engenharia de Dados',
    lugar: '2RP NET, Sorocaba',
    texto: 'Entrou na equipe de dados como estagiário e foi efetivado depois de quase dois anos.',
  },
  {
    periodo: '2024 – 2025',
    cargo: 'Formação em ADS',
    lugar: 'SENAI Gaspar Ricardo Júnior',
    texto:
      'Análise e Desenvolvimento de Sistemas, concluído em 2025, com projetos em equipe como o tradutor de documentos do Projeto Integrador.',
  },
]

/** Linha do tempo: a barra à esquerda se preenche conforme a lista passa pela tela. */
export default function Experiencia() {
  const lista = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 75%', 'end 55%'] })
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section className="exp grid12" id="experiencia" aria-labelledby="experiencia-title">
      <div className="exp__cabeca">
        <Titulo id="experiencia-title" className="exp__titulo" texto="Experiência" />
        <p className="exp__nota" data-reveal style={{ '--d': 1 } as CSSProperties}>
          Quase três anos na mesma equipe de dados, de estagiário a engenheiro.
        </p>
      </div>
      <div className="exp__corpo">
        <span className="exp__trilho" aria-hidden>
          <motion.span className="exp__preenche" style={{ scaleY: progresso }} />
        </span>
        <ol className="exp__lista" ref={lista}>
        {ITENS.map((it, i) => (
          <li key={it.cargo} className="exp__item" data-reveal style={{ '--d': i } as CSSProperties}>
            <h3 className="exp__cargo">{it.cargo}</h3>
            <p className="exp__lugar">{it.lugar} <span className="exp__periodo">· {it.periodo}</span></p>
            <p className="exp__texto">{it.texto}</p>
          </li>
        ))}
        </ol>
      </div>
    </section>
  )
}
