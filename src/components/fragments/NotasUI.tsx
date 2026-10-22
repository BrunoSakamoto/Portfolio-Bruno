import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import notaPdf from '../../assets/nota-pdf.jpg'
import notaBoa from '../../assets/nota-boa.jpg'
import notaRuim from '../../assets/nota-ruim.jpg'
import { useReducedMotion } from '../../hooks/useStaticMode'

// Notas sintéticas geradas pelo projeto, uma de cada versão.
const versoes = [
  { id: 'pdf', nome: 'PDF', regras: 'lê pelo texto do PDF', img: notaPdf, alt: 'DANFE em PDF de uma papelaria de Campinas' },
  { id: 'boa', nome: 'Foto boa', regras: 'não lê imagem', img: notaBoa, alt: 'DANFE de uma farmácia de Sorocaba, fotografado sobre a mesa' },
  { id: 'ruim', nome: 'Foto ruim', regras: 'não lê imagem', img: notaRuim, alt: 'Cupom de NFC-e fotografado inclinado e desfocado' },
] as const

const checagens = [
  'Chave de acesso: 44 dígitos e DV módulo 11',
  'Chave coerente com CNPJ, série, número e mês',
  'CNPJ do emitente: dígitos verificadores',
  'Itens somam o total da nota',
]

export default function NotasUI() {
  const caixa = useRef<HTMLDivElement>(null)
  const visto = useInView(caixa, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [atual, setAtual] = useState(0)
  const [lidas, setLidas] = useState(reduced ? checagens.length : 0)
  const [leitura, setLeitura] = useState(0)

  // a cada troca de versão, o "escaneamento" passa e as checagens acendem uma a uma
  useEffect(() => {
    if (reduced || !visto) return
    setLidas(0)
    const timers = checagens.map((_, i) => window.setTimeout(() => setLidas(i + 1), 900 + i * 260))
    return () => timers.forEach(clearTimeout)
  }, [leitura, visto, reduced])

  const escolher = (i: number) => {
    setAtual(i)
    setLeitura((n) => n + 1)
  }

  return (
    <div className="ui notas" data-ui ref={caixa}>
      <div className="ui__bar">
        <span>notas-fiscais-ia</span>
        <div className="notas__abas" role="tablist" aria-label="Versão da nota">
          {versoes.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={atual === i}
              className="notas__aba"
              onClick={() => escolher(i)}
            >
              {v.nome}
            </button>
          ))}
        </div>
      </div>
      <div className="ui__body notas__corpo">
        <div className="notas__doc">
          {versoes.map((v, i) => (
            <img
              key={v.id}
              className={`notas__img${i === atual ? ' is-on' : ''}`}
              src={v.img}
              alt={i === atual ? v.alt : ''}
              aria-hidden={i !== atual}
              loading="lazy"
              decoding="async"
            />
          ))}
          {!reduced && visto && (
            <motion.i
              key={leitura}
              className="notas__scan"
              aria-hidden
              initial={{ top: '0%', opacity: 1 }}
              animate={{ top: '100%', opacity: [1, 1, 0] }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
          )}
        </div>
        <div className="notas__lado">
          <dl className="notas__extratores">
            <div><dt>Gemini</dt><dd>extrai os 9 campos e os itens</dd></div>
            <div><dt>Sem IA</dt><dd>{versoes[atual].regras}</dd></div>
          </dl>
          <ul className="notas__checks" aria-label="Validação fiscal, sem gabarito">
            {checagens.map((c, i) => (
              <li key={c} className={i < lidas ? 'is-on' : undefined}>
                <i aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
