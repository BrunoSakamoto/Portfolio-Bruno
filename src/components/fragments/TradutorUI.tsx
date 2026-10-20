import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useStaticMode'

const history = [
  { file: 'contrato-locacao.pdf', langs: 'PT → EN', when: 'ontem' },
  { file: 'manual-usuario.docx', langs: 'EN → PT', when: '12 out' },
  { file: 'proposta-comercial.docx', langs: 'PT → ES', when: '09 out' },
]

export default function TradutorUI() {
  const reduced = useReducedMotion()
  return (
    <div className="ui" data-ui>
      <div className="ui__bar">
        <span>TradutorDocumentos</span>
        <span className="ui__pill"><span className="ui__avatar" aria-hidden>B</span> Conta Google</span>
      </div>
      <div className="ui__body">
        <div className="ui__drop">
          <div className="ui__file"><span>relatorio-trimestral.docx</span><span>2,4 MB</span></div>
          <div className="ui__meter" aria-hidden>
            <motion.i
              initial={reduced ? false : { scaleX: 0.08 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
          <div className="ui__langs">
            <span className="ui__chip is-on">Português</span>
            <span className="ui__chip">→</span>
            <span className="ui__chip is-on">Inglês</span>
          </div>
        </div>
        <ul className="ui__list" aria-label="Histórico de traduções">
          {history.map((h) => (
            <li key={h.file}><span>{h.file}</span><span>{h.langs}, {h.when}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
