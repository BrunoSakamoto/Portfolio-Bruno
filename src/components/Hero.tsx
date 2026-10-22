import { useCallback, useState, type CSSProperties } from 'react'
import HeroMapa from './HeroMapa'

export default function Hero() {
  const [hora, setHora] = useState('9h41')
  const aoMudarHora = useCallback((h: string) => setHora(h), [])

  return (
    <header className="hero" id="inicio">
      <HeroMapa onHora={aoMudarHora} />

      <nav className="topbar grid12 hero-fade" aria-label="Principal">
        <a href="#inicio" className="topbar__name">Bruno A. Sakamoto</a>
        <div className="topbar__links">
          <a className="link" href="#projetos">Projetos</a>
          <a className="link" href="#sobre">Sobre</a>
          <a className="link" href="#ferramentas">Ferramentas</a>
        </div>
        <a className="button topbar__action" href="#contato">
          Fale comigo <span className="arrow" aria-hidden>→</span>
        </a>
      </nav>

      <div />

      <div className="hero__foot grid12">
        <h1 className="hero__title lines">
          <span className="line"><span data-line style={{ '--i': 0 } as CSSProperties}>Bruno</span></span>
          <span className="line"><span data-line style={{ '--i': 1 } as CSSProperties}>Sakamoto</span></span>
        </h1>
        <div className="hero__side hero-fade hero-fade--late">
          <p className="hero__lede">
            Engenheiro de Dados na 2RP NET. Construo pipelines em Python, PySpark e Airflow, e as aplicações em
            React e FastAPI que mostram o que eles produzem.
          </p>
          <a className="hero__live" href="#p-onibus">
            <span className="hero__clock" aria-live="off">{hora}</span>
            <span>
              Cada ponto é um ônibus do Rio, gravado pelo meu pipeline de streaming em 22/10.{' '}
              <span className="link">Ver o projeto</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
