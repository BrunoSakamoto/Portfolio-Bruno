import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotion } from '../hooks/useStaticMode'

// Números reais dos projetos (ver os READMEs de cada repositório).
const NUMEROS = [
  { valor: 2.1, casas: 1, sufixo: ' mi', texto: 'coletas de preço de combustível carregadas, modeladas e testadas', projeto: 'anp' },
  { valor: 3500, casas: 0, sufixo: '', texto: 'ônibus do Rio acompanhados ao mesmo tempo, 9 mil posições por minuto', projeto: 'onibus' },
  { valor: 140, casas: 0, sufixo: '+', texto: 'testes automatizados nos quatro projetos, rodando no CI a cada push', projeto: null },
  { valor: 60, casas: 0, sufixo: '', texto: 'notas fiscais com gabarito para medir a IA campo a campo', projeto: 'notas' },
]

function Contador({ valor, casas, sufixo }: { valor: number; casas: number; sufixo: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.8 })
  const reduced = useReducedMotion()
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) + sufixo
  const [texto, setTexto] = useState(fmt(0))
  useEffect(() => {
    if (!visto) return
    if (reduced) return setTexto(fmt(valor))
    const c = animate(0, valor, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setTexto(fmt(v)) })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visto])
  return <span ref={ref} aria-label={fmt(valor)}>{texto}</span>
}

export default function Numeros() {
  return (
    <section className="numeros" aria-labelledby="numeros-title">
      <h2 id="numeros-title" className="sr-only">Em números</h2>
      <ul className="numeros__lista grid12">
        {NUMEROS.map((n, i) => (
          <li key={n.texto} className="numeros__item" data-reveal style={{ '--d': i } as CSSProperties}>
            <b className="numeros__valor"><Contador valor={n.valor} casas={n.casas} sufixo={n.sufixo} /></b>
            <span className="numeros__texto">{n.texto}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
