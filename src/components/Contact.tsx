const EMAIL = 'brunosakar2005@gmail.com'
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Contato pelo portfólio')}`

export default function Contact() {
  return (
    <section className="contact field-orange" id="contato" aria-labelledby="contato-title">
      <h2 id="contato-title" className="contact__title" data-reveal>
        Uma vaga, um projeto ou um pipeline que precisa de ajuda? Escreva.
      </h2>
      <div />
      <a className="contact__email" href={MAILTO} data-reveal>
        brunosakar2005<span className="at">@gmail.com</span>
      </a>
      <div className="contact__foot">
        <span>Engenheiro de Dados na 2RP NET</span>
        <ul>
          <li><a className="link" href="https://github.com/BrunoSakamoto" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a className="link" href="https://www.linkedin.com/in/bruno-a-sakamoto/" target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </section>
  )
}
