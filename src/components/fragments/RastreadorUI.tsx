import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useStaticMode'

// Empresas fictícias, como as da conta de demonstração do projeto.
const colunas = [
  { titulo: 'Aplicadas', fichas: [{ empresa: 'Vértice Dados', cargo: 'Eng. de Dados Jr', meta: 'há 3 dias' }, { empresa: 'Rede Aurora', cargo: 'Dev Full Stack', meta: 'sem resposta há 9 dias', atrasada: true }, { empresa: 'Faro Analytics', cargo: 'Data Engineer', meta: 'hoje' }] },
  { titulo: 'Entrevistas', fichas: [{ empresa: 'Lumen Pagamentos', cargo: 'Analytics Engineer', meta: 'técnica na quinta' }, { empresa: 'Cobalto Seguros', cargo: 'Eng. de Dados Pleno', meta: 'conversa com o RH' }] },
  { titulo: 'Proposta', fichas: [] },
]

export default function RastreadorUI() {
  const reduced = useReducedMotion()
  return (
    <div className="ui" data-ui>
      <div className="ui__bar">
        <span>Candidaturas</span>
        <span>taxa de resposta 42%</span>
      </div>
      <div className="ui__body quadro">
        {colunas.map((c) => (
          <div className="quadro__coluna" key={c.titulo}>
            <p className="quadro__titulo">{c.titulo}</p>
            {c.fichas.map((f) => (
              <div className="quadro__ficha" key={f.empresa}>
                <b>{f.empresa}</b>
                <span>{f.cargo}</span>
                <small className={f.atrasada ? 'is-late' : undefined}>{f.meta}</small>
              </div>
            ))}
            {c.titulo === 'Proposta' && (
              <motion.div
                className="quadro__ficha quadro__ficha--nova"
                initial={reduced ? false : { opacity: 0, y: -18, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              >
                <b>Norte Logística</b>
                <span>Eng. de Dados</span>
                <motion.em
                  className="quadro__carimbo"
                  style={{ rotate: -4 }}
                  initial={reduced ? false : { opacity: 0, scale: 1.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.25, ease: 'easeIn', delay: 1.3 }}
                >
                  Proposta
                </motion.em>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
