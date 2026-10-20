import type { CSSProperties } from 'react'

export default function About() {
  return (
    <section className="about" id="sobre" aria-labelledby="sobre-title">
      <h2 id="sobre-title" className="about__title" data-reveal>Sobre mim</h2>
      <p className="about__text" lang="pt-BR" data-reveal style={{ '--d': 1 } as CSSProperties}>
        <strong>Bruno Araújo Sakamoto</strong> é engenheiro de dados na <span className="mark mark--mint">2RP NET</span>, em{' '}
        <span className="mark mark--grey">Sorocaba</span>, onde começou como estagiário em 2024 e foi efetivado em{' '}
        <span className="mark mark--orange">janeiro de 2026</span>. Formou-se em Análise e Desenvolvimento de Sistemas no{' '}
        <span className="mark mark--mint">SENAI Gaspar Ricardo Júnior</span>. O dia a dia é feito de pipelines em{' '}
        <span className="mark mark--grey">Python e PySpark</span>, tabelas no BigQuery e DAGs no Airflow, sempre com o código
        versionado e revisado. Fora do trabalho de dados, constrói o outro lado: APIs em FastAPI e Spring Boot, interfaces em{' '}
        <span className="mark mark--orange">React</span>, coisas que alguém consegue usar sem ler um manual. Gosta de soluções
        bem projetadas, que unem um backend robusto a uma engenharia de dados eficiente. O próximo passo é aprofundar
        arquitetura de dados, testes e observabilidade, sem largar o frontend.{' '}
        <a className="about__cta" href="#contato">Tem uma vaga ou um projeto? Escreva para ele.</a>
      </p>
    </section>
  )
}
