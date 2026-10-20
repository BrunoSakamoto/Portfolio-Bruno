import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useStaticMode } from '../hooks/useStaticMode'

const fields = [
  { key: 'emitente', value: '"Padaria Pão de Cada Dia Ltda"' },
  { key: 'cnpj', value: '"12345678000190"' },
  { key: 'emissao', value: '"2026-10-14"' },
  { key: 'itens', value: '3' },
  { key: 'total', value: '54.70' },
]

const rows = [
  { id: 1043, emitente: 'Mercado Bom Preço', total: '212,35' },
  { id: 1042, emitente: 'Farmácia Central', total: '48,90' },
  { id: 1041, emitente: 'Posto Rodovia', total: '180,00' },
]

const steps = [
  { lead: 'Extrair.', text: 'O Gemini lê o PDF e encontra os campos.' },
  { lead: 'Validar.', text: 'O FastAPI confere e normaliza cada valor.' },
  { lead: 'Gravar.', text: 'O Postgres guarda a nota como uma linha.' },
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
  const bands: [number[], string[]][] = [
    [[0, 0.3, 0.34], ['#000000', '#000000', '#666666']],
    [[0.3, 0.34, 0.62, 0.66], ['#666666', '#000000', '#000000', '#666666']],
    [[0.62, 0.66, 1], ['#666666', '#000000', '#000000']],
  ]
  const [input, output] = bands[i]
  const color = useTransform(p, input, output)
  const x = useTransform(p, input, input.length === 3 && i === 0 ? [12, 12, 0] : input.length === 3 ? [0, 12, 12] : [0, 12, 12, 0])
  const step = steps[i]
  return (
    <motion.p className="scene__step" style={{ color, x }}>
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
          <h2 id="pipeline-title" className="scene__title">Da nota fiscal ao banco</h2>
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
            <figcaption className="scene__label">nota-1044.pdf</figcaption>
            <div className="paper">
              <p className="paper__brand"><Highlight p={p} i={0}>Padaria Pão de Cada Dia Ltda</Highlight></p>
              <p className="paper__meta">
                CNPJ <Highlight p={p} i={1}>12.345.678/0001-90</Highlight><br />
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
            <figcaption className="scene__label">Resposta do POST /notas</figcaption>
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
              <caption>notas_fiscais</caption>
              <thead>
                <tr><th scope="col">id</th><th scope="col">emitente</th><th scope="col">total</th></tr>
              </thead>
              <tbody>
                <motion.tr className="is-new" style={{ opacity: rowO, y: rowY }}>
                  <td>1044</td><td>Padaria Pão de Cada Dia</td><td>54,70</td>
                </motion.tr>
                {rows.map((r) => (
                  <tr key={r.id}><td>{r.id}</td><td>{r.emitente}</td><td>{r.total}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
