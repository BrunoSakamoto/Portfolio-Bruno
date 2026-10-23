import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useStaticMode } from '../hooks/useStaticMode'

const fields = [
  { key: 'emitente_nome', value: '"Padaria Pão de Cada Dia"' },
  { key: 'emitente_cnpj', value: '"11222333000181"' },
  { key: 'data_emissao', value: '"2026-10-14"' },
  { key: 'itens', value: '[3 itens]' },
  { key: 'valor_total', value: '54.70' },
]

const rows = [
  { doc: 'nota-043', versao: 'foto boa', campos: '9 de 9' },
  { doc: 'nota-042', versao: 'PDF', campos: '9 de 9' },
  { doc: 'nota-041', versao: 'foto ruim', campos: '9 de 9' },
]

const steps = [
  { lead: 'Extrair.', text: 'O Gemini lê o PDF ou a foto e devolve JSON no esquema.' },
  { lead: 'Validar.', text: 'Dígitos do CNPJ, chave de acesso e soma dos itens.' },
  { lead: 'Medir.', text: 'Cada campo é comparado com o gabarito.' },
]

function useRange(p: MotionValue<number>, a: number, b: number, from = 0, to = 1) {
  return useTransform(p, [a, b], [from, to], { clamp: true })
}

function Highlight({ p, i, children, block }: { p: MotionValue<number>; i: number; children: ReactNode; block?: boolean }) {
  const s = useRange(p, 0.04 + i * 0.05, 0.14 + i * 0.05)
  return (
    <motion.span className={block ? 'hl hl--block' : 'hl'} style={{ '--p': s } as unknown as CSSProperties}>
      {children}
    </motion.span>
  )
}

function JsonLine({ p, i, k, v, last }: { p: MotionValue<number>; i: number; k: string; v: string; last: boolean }) {
  const o = useRange(p, 0.36 + i * 0.045, 0.44 + i * 0.045)
  const x = useRange(p, 0.36 + i * 0.045, 0.44 + i * 0.045, -24, 0)
  return (
    <motion.span style={{ opacity: o, x }}>
      {'  '}<span className="k">"{k}"</span>: {v}{last ? '' : ','}
    </motion.span>
  )
}

function Step({ p, i }: { p: MotionValue<number>; i: number }) {
  const bands: [number[], number[]][] = [
    [[0, 0.3, 0.34], [1, 1, 0.4]],
    [[0.3, 0.34, 0.62, 0.66], [0.4, 1, 1, 0.4]],
    [[0.62, 0.66, 1], [0.4, 1, 1]],
  ]
  const [input, output] = bands[i]
  const opacity = useTransform(p, input, output)
  const x = useTransform(p, input, input.length === 3 && i === 0 ? [12, 12, 0] : input.length === 3 ? [0, 12, 12] : [0, 12, 12, 0])
  const step = steps[i]
  return (
    <motion.p className="scene__step" style={{ opacity, x }}>
      <b>{step.lead}</b> {step.text}
    </motion.p>
  )
}

export default function PipelineScene() {
  const ref = useRef<HTMLElement>(null)
  const isStatic = useStaticMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const live = useTransform(scrollYProgress, (v) => v)
  const done = useTransform(scrollYProgress, () => 1)
  const p = isStatic ? done : live

  const rowO = useRange(p, 0.7, 0.82)
  const rowY = useRange(p, 0.7, 0.82, -36, 0)
  const docO = useRange(p, 0.62, 0.8, 1, 0.45)

  return (
    <section
      ref={ref}
      id="pipeline"
      className={`scene ${isStatic ? 'is-rest' : 'is-live'}`}
      data-scene="pipeline"
      aria-labelledby="pipeline-title"
    >
      <div className="scene__stage">
        <div className="scene__head grid12">
          <h2 id="pipeline-title" className="scene__title">Da foto da nota ao dado conferido</h2>
          <div className="scene__steps">
            {steps.map((_, i) =>
              isStatic ? (
                <p className="scene__step" key={i}><b>{steps[i].lead}</b> {steps[i].text}</p>
              ) : (
                <Step key={i} p={p} i={i} />
              ),
            )}
          </div>
        </div>

        <div className="scene__body grid12">
          <motion.figure className="scene__doc" style={{ opacity: isStatic ? 1 : docO, margin: 0 }} data-ui>
            <figcaption className="scene__label">nota-044.jpg</figcaption>
            <div className="paper">
              <p className="paper__brand"><Highlight p={p} i={0}>Padaria Pão de Cada Dia Ltda</Highlight></p>
              <p className="paper__meta">
                CNPJ <Highlight p={p} i={1}>11.222.333/0001-81</Highlight><br />
                Emitida em <Highlight p={p} i={2}>14/10/2026</Highlight>
              </p>
              <Highlight p={p} i={3} block>
                <span className="paper__row"><span>Pão francês, 1,2 kg</span><span>R$ 18,00</span></span>
                <span className="paper__row"><span>Café torrado, 500 g</span><span>R$ 24,90</span></span>
                <span className="paper__row"><span>Leite integral, 2 un</span><span>R$ 11,80</span></span>
              </Highlight>
              <span className="paper__row paper__row--total">
                <span>Total</span><Highlight p={p} i={4}>R$ 54,70</Highlight>
              </span>
            </div>
          </motion.figure>

          <figure className="scene__json" style={{ margin: 0 }}>
            <figcaption className="scene__label">Resposta do Gemini</figcaption>
            <pre className="code" data-ui><code>
              <span>{'{'}</span>
              {fields.map((f, i) => (
                isStatic ? (
                  <span key={f.key}>{'  '}<span className="k">"{f.key}"</span>: {f.value}{i < fields.length - 1 ? ',' : ''}</span>
                ) : (
                  <JsonLine key={f.key} p={p} i={i} k={f.key} v={f.value} last={i === fields.length - 1} />
                )
              ))}
              <span>{'}'}</span>
            </code></pre>
          </figure>

          <div className="scene__table" data-ui>
            <table className="table">
              <caption>avaliação contra o gabarito</caption>
              <thead>
                <tr><th scope="col">documento</th><th scope="col">versão</th><th scope="col">campos certos</th></tr>
              </thead>
              <tbody>
                <motion.tr className="is-new" style={{ opacity: rowO, y: rowY }}>
                  <td>nota-044</td><td>foto ruim</td><td>9 de 9</td>
                </motion.tr>
                {rows.map((r) => (
                  <tr key={r.doc}><td>{r.doc}</td><td>{r.versao}</td><td>{r.campos}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
