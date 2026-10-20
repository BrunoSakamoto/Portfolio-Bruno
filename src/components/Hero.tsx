import type { CSSProperties } from 'react'

export default function Hero() {
  return (
    <header className="hero" id="inicio">
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
        <p className="hero__lede hero-fade hero-fade--late">
          Engenheiro de Dados na 2RP NET. Construo pipelines em Python, PySpark e Airflow, e as aplicações em
          React e FastAPI que mostram o que eles produzem.
        </p>
        <h1 className="hero__title lines">
          <span className="line"><span data-line style={{ '--i': 0 } as CSSProperties}>Bruno</span></span>
          <span className="line"><span data-line style={{ '--i': 1 } as CSSProperties}>Sakamoto</span></span>
        </h1>
      </div>
    </header>
  )
}
