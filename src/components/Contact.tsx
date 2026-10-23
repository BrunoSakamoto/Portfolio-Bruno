import { useState, type CSSProperties } from 'react'
import Titulo from './Titulo'

const EMAIL = 'brunosakar2005@gmail.com'
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Contato pelo portfólio')}`

/** Cada letra do e-mail é um span: no hover elas sobem em onda, uma depois da outra. */
function Letras({ texto, desde = 0 }: { texto: string; desde?: number }) {
  return (
    <>
      {[...texto].map((c, i) => (
        <span className="onda" key={i} style={{ '--k': desde + i } as CSSProperties}>{c}</span>
      ))}
    </>
  )
}

export default function Contact() {
  const [copiado, setCopiado] = useState(false)
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2200)
    } catch {
      window.location.href = MAILTO
    }
  }
  const [usuario, dominio] = EMAIL.split('@')

  return (
    <section className="contact field-f3 on-dark" id="contato" aria-labelledby="contato-title">
      <Titulo
        id="contato-title"
        className="contact__title"
        texto="Uma vaga, um projeto ou um pipeline que precisa de ajuda? Escreva."
      />
      <div />
      <a className="contact__email" href={MAILTO} aria-label={`Escrever para ${EMAIL}`} data-reveal>
        <span aria-hidden><Letras texto={usuario} /></span>
        <span className="at" aria-hidden><Letras texto={`@${dominio}`} desde={usuario.length} /></span>
      </a>
      <div className="contact__foot">
        <button type="button" className="contact__copiar" onClick={copiar} data-magnet="0.2" aria-live="polite">
          <span className={copiado ? 'is-off' : undefined}>Copiar o e-mail</span>
          <span className={copiado ? undefined : 'is-off'}>Copiado</span>
        </button>
        <ul>
          <li><a className="navlink" href="https://github.com/BrunoSakamoto" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a className="navlink" href="https://www.linkedin.com/in/bruno-a-sakamoto/" target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </section>
  )
}
