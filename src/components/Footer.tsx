import { useEffect, useRef, useState } from 'react'

/** Palavra ajustada à largura: o viewBox é medido a partir do próprio texto. */
function Wordmark({ word }: { word: string }) {
  const text = useRef<SVGTextElement>(null)
  const [box, setBox] = useState('0 0 1000 200')

  useEffect(() => {
    const fit = () => {
      const b = text.current?.getBBox()
      if (b && b.width) setBox(`${b.x} ${b.y + b.height * 0.2} ${b.width} ${b.height * 0.62}`)
    }
    fit()
    document.fonts?.ready.then(fit)
  }, [])

  return (
    <svg className="footer__mark" viewBox={box} role="img" aria-label={word}>
      <text ref={text} x="0" y="0" fontFamily="Switzer, sans-serif" fontWeight={600} fontSize="200" letterSpacing="-10">
        {word}
      </text>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="footer__cols grid12">
        <div className="footer__col">
          <h2>Bruno Araújo Sakamoto</h2>
          <p>Engenheiro de Dados e desenvolvedor full stack.</p>
        </div>
        <div className="footer__col">
          <h2>Nesta página</h2>
          <ul>
            <li><a className="link" href="#projetos">Projetos</a></li>
            <li><a className="link" href="#sobre">Sobre</a></li>
            <li><a className="link" href="#ferramentas">Ferramentas</a></li>
            <li><a className="link" href="#contato">Contato</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h2>Em outros lugares</h2>
          <ul>
            <li><a className="link" href="https://github.com/BrunoSakamoto" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="link" href="https://www.linkedin.com/in/bruno-a-sakamoto/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="link" href="mailto:brunosakar2005@gmail.com">E-mail</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h2>Este site</h2>
          <p>Feito com React, Vite e framer-motion. Fonte Switzer, da Indian Type Foundry.</p>
        </div>
      </div>
      <div />
      <Wordmark word="Sakamoto" />
      <p className="footer__legal">© {new Date().getFullYear()} Bruno Araújo Sakamoto</p>
    </footer>
  )
}
