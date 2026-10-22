import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useStaticMode'

// Recorte real do projeto: 900 ônibus do Rio em 10 buscas seguidas à API (22/10/2026, 9h41 às 9h46).
// Cada posição vem como [lat, lon, km/h], com lat e lon em décimos de milésimo de grau a partir da origem.
type Dados = { lat0: number; lon0: number; esc: number; frames: [number, number, number][][] }

const LIMITES = { lon0: -43.8, lon1: -43.05, lat0: -23.08, lat1: -22.74 }
const COS = Math.cos((23 * Math.PI) / 180)
const PASSO_MS = 900

const cor = (kmh: number) =>
  kmh < 0 ? '#8b9099' : kmh < 3 ? '#ff5a4e' : kmh < 20 ? '#ffb547' : '#4fd18b'

export default function OnibusUI() {
  const caixa = useRef<HTMLDivElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const [dados, setDados] = useState<Dados | null>(null)
  const reduced = useReducedMotion()

  // só baixa o recorte quando a pasta chega perto da tela
  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        fetch(`${import.meta.env.BASE_URL}onibus-rio.json`)
          .then((r) => r.json())
          .then(setDados)
          .catch(() => {})
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const canvas = tela.current
    if (!canvas || !dados) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let w = 0
    let h = 0

    const medir = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const projetar = (la: number, lo: number): [number, number] => {
      const lon = dados.lon0 + lo / dados.esc
      const lat = dados.lat0 + la / dados.esc
      const largura = (LIMITES.lon1 - LIMITES.lon0) * COS
      const altura = LIMITES.lat1 - LIMITES.lat0
      const escala = Math.min((w - 24) / largura, (h - 24) / altura)
      const x0 = (w - largura * escala) / 2
      const y0 = (h - altura * escala) / 2
      return [x0 + (lon - LIMITES.lon0) * COS * escala, y0 + (LIMITES.lat1 - lat) * escala]
    }

    const desenhar = (t: number) => {
      const n = dados.frames.length
      const pos = reduced ? 0 : (t / PASSO_MS) % (n - 1)
      const k = Math.floor(pos)
      const f = pos - k
      const a = dados.frames[k]
      const b = dados.frames[k + 1]
      const r = w > 520 ? 1.8 : 1.4
      ctx.fillStyle = '#0e1013'
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < a.length; i++) {
        const [x1, y1] = projetar(a[i][0], a[i][1])
        const [x2, y2] = projetar(b[i][0], b[i][1])
        ctx.fillStyle = cor(f < 0.5 ? a[i][2] : b[i][2])
        ctx.beginPath()
        ctx.arc(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(desenhar)
    }

    medir()
    const ro = new ResizeObserver(() => {
      medir()
      if (reduced) desenhar(0)
    })
    ro.observe(canvas)
    raf = requestAnimationFrame(desenhar)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [dados, reduced])

  return (
    <div className="ui onibus" data-ui ref={caixa}>
      <div className="ui__bar">
        <span>Ônibus do Rio, agora</span>
        <span className="ui__status"><i className="ui__dot" aria-hidden /> 900 de 3,6 mil ônibus</span>
      </div>
      <div className="onibus__mapa">
        <canvas
          ref={tela}
          role="img"
          aria-label="Mapa do Rio de Janeiro com 900 ônibus em movimento, em verde, amarelo ou vermelho conforme a velocidade"
        />
        <p className="onibus__nota">Dados reais, 22/10 das 9h41 às 9h46, acelerados</p>
      </div>
    </div>
  )
}
