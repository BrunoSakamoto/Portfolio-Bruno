import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useStaticMode'

// Trecho real dos logs do produtor e do processador em 22/10/2026, das 10h04 às 10h07.
// Às 10h04:51 a API da Prefeitura respondeu 500; a busca seguinte pediu o intervalo desde a última
// que deu certo e trouxe o buraco junto.
type Linha =
  | { t: string; tipo: 'busca'; posicoes: number; novas: number }
  | { t: string; tipo: 'lote'; novas: number; duplicadas: number; atraso: number }
  | { t: string; tipo: 'falha' }

const LOG = [{"t": "10:04:22", "tipo": "busca", "posicoes": 7380, "novas": 3587}, {"t": "10:04:23", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 2.3}, {"t": "10:04:24", "tipo": "lote", "novas": 1587, "duplicadas": 0, "atraso": 3.9}, {"t": "10:04:51", "tipo": "falha"}, {"t": "10:05:22", "tipo": "busca", "posicoes": 10127, "novas": 6465}, {"t": "10:05:22", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 2.2}, {"t": "10:05:23", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 2.8}, {"t": "10:05:24", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 3.3}, {"t": "10:05:25", "tipo": "lote", "novas": 465, "duplicadas": 0, "atraso": 4.9}, {"t": "10:05:52", "tipo": "busca", "posicoes": 6592, "novas": 3114}, {"t": "10:05:52", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 2.0}, {"t": "10:05:54", "tipo": "lote", "novas": 1114, "duplicadas": 0, "atraso": 3.6}, {"t": "10:06:21", "tipo": "falha"}, {"t": "10:06:52", "tipo": "busca", "posicoes": 9555, "novas": 6359}, {"t": "10:06:53", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 2.3}, {"t": "10:06:53", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 3.0}, {"t": "10:06:54", "tipo": "lote", "novas": 2000, "duplicadas": 0, "atraso": 3.4}, {"t": "10:06:55", "tipo": "lote", "novas": 359, "duplicadas": 0, "atraso": 4.8}] as Linha[]

const ACELERA = 14 // um segundo do log em 1/14 s
const seg = (t: string) => t.split(':').reduce((a, n) => a * 60 + Number(n), 0)
const T0 = seg(LOG[0].t)
const DURACAO = seg(LOG[LOG.length - 1].t) - T0 + 8
const n = (v: number) => v.toLocaleString('pt-BR')

function texto(l: Linha) {
  if (l.tipo === 'busca') return ['produtor', `${n(l.posicoes)} posições na API, ${n(l.novas)} novas no Kafka`]
  if (l.tipo === 'falha') return ['produtor', 'API respondeu 500; a próxima busca cobre o intervalo']
  return ['processador', `lote gravado: ${n(l.novas)} novas, ${l.duplicadas} repetidas, ${String(l.atraso).replace('.', ',')} s`]
}

export default function StreamUI() {
  const caixa = useRef<HTMLDivElement>(null)
  const visto = useInView(caixa, { amount: 0.4 })
  const reduced = useReducedMotion()
  const [relogio, setRelogio] = useState(reduced ? DURACAO : 0)

  useEffect(() => {
    if (reduced || !visto) return
    let raf = 0
    const t0 = performance.now() - (relogio * 1000) / ACELERA
    const tick = (t: number) => {
      setRelogio((((t - t0) * ACELERA) / 1000) % DURACAO)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visto, reduced])

  const visiveis = LOG.filter((l) => seg(l.t) - T0 <= relogio)
  const gravadas = visiveis.reduce((s, l) => s + (l.tipo === 'lote' ? l.novas : 0), 0)
  const lotes = visiveis.filter((l) => l.tipo === 'lote')
  const ultimoAtraso = lotes.length ? lotes[lotes.length - 1] : null
  const agora = T0 + Math.floor(relogio)
  const hora = `${Math.floor(agora / 3600)}:${String(Math.floor((agora % 3600) / 60)).padStart(2, '0')}:${String(agora % 60).padStart(2, '0')}`

  return (
    <div className="ui stream" data-ui ref={caixa}>
      <div className="ui__bar">
        <span>docker compose logs -f</span>
        <span className="ui__status"><i className="ui__dot" aria-hidden /> {hora}</span>
      </div>
      <div className="stream__corpo">
        <ol className="stream__log" aria-label="Log do produtor e do processador">
          {visiveis.slice(-9).map((l, i) => {
            const [quem, msg] = texto(l)
            return (
              <li key={`${l.t}-${i}-${visiveis.length}`} className={`is-${l.tipo}`}>
                <span className="stream__t">{l.t}</span>
                <span className="stream__quem">{quem}</span>
                <span>{msg}</span>
              </li>
            )
          })}
        </ol>
        <dl className="stream__numeros">
          <div><dt>posições gravadas</dt><dd>{n(gravadas)}</dd></div>
          <div><dt>lotes confirmados</dt><dd>{lotes.length}</dd></div>
          <div><dt>API até o banco</dt><dd>{ultimoAtraso && ultimoAtraso.tipo === 'lote' ? `${String(ultimoAtraso.atraso).replace('.', ',')} s` : '–'}</dd></div>
        </dl>
      </div>
    </div>
  )
}
