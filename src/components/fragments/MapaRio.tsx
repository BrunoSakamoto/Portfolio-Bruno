import { useEffect, useRef, useState } from 'react'
import { carregarRecorte, corVelocidade, horaDoQuadro, projetor, type Recorte } from '../../lib/onibus'
import { useReducedMotion } from '../../hooks/useStaticMode'

const PASSO_MS = 1100
const FUNDO = '#05080d'

/**
 * Os ônibus do recorte real andando pela cidade, com rastro. Pausa fora da tela. Com movimento
 * reduzido, anda mais devagar e sem rastro.
 */
export default function MapaRio({ onHora }: { onHora: (hora: string) => void }) {
  const tela = useRef<HTMLCanvasElement>(null)
  const [dados, setDados] = useState<Recorte | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    carregarRecorte().then(setDados).catch(() => {})
  }, [])

  useEffect(() => {
    const canvas = tela.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !dados) return
    let w = 0
    let h = 0
    let projetar = projetor(dados, { x: 0, y: 0, w: 1, h: 1 })
    let raf = 0
    let visivel = true
    let inicio = performance.now()
    let ultimaHora = ''

    const medir = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const caixa = { x: 12, y: 12, w: w - 24, h: h - 24 }
      projetar = projetor(dados, caixa)
      ctx.fillStyle = FUNDO
      ctx.fillRect(0, 0, w, h)
    }

    const desenhar = (agora: number) => {
      const n = dados.frames.length
      const volta = n - 1
      const passo = reduced ? PASSO_MS * 3 : PASSO_MS
      const pos = ((((agora - inicio) / passo) % volta) + volta) % volta
      const k = Math.floor(pos)
      const f = pos - k
      // volta ao começo: limpa para os rastros não riscarem a cidade
      if (k === 0 && f < 0.05) {
        ctx.fillStyle = FUNDO
        ctx.fillRect(0, 0, w, h)
      }
      ctx.fillStyle = reduced ? FUNDO : 'rgba(5,8,13,0.14)'
      ctx.fillRect(0, 0, w, h)
      const a = dados.frames[k]
      const b = dados.frames[k + 1]
      const raio = w > 700 ? 1.9 : 1.5
      for (let i = 0; i < a.length; i++) {
        const [x1, y1] = projetar(a[i][0], a[i][1])
        const [x2, y2] = projetar(b[i][0], b[i][1])
        ctx.fillStyle = corVelocidade(f < 0.5 ? a[i][2] : b[i][2])
        ctx.fillRect(x1 + (x2 - x1) * f - raio / 2, y1 + (y2 - y1) * f - raio / 2, raio, raio)
      }
      const hora = horaDoQuadro(f < 0.5 ? k : k + 1)
      if (hora !== ultimaHora) {
        ultimaHora = hora
        onHora(hora)
      }
      if (visivel) raf = requestAnimationFrame(desenhar)
    }

    medir()
    const ro = new ResizeObserver(() => medir())
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visivel) {
        inicio = performance.now() - ((performance.now() - inicio) % (PASSO_MS * (dados.frames.length - 1)))
        raf = requestAnimationFrame(desenhar)
      }
    })
    io.observe(canvas)
    raf = requestAnimationFrame(desenhar)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [dados, reduced, onHora])

  return (
    <canvas
      ref={tela}
      className="mapa-rio"
      role="img"
      aria-label="Mapa do Rio com 3.643 ônibus reais em movimento, coloridos pela velocidade"
    />
  )
}
