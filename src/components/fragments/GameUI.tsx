import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useStaticMode'

const W = 160
const H = 100

// Plataformas: x, y, largura (em pixels lógicos)
const platforms = [
  [0, 88, 160],
  [14, 66, 34],
  [62, 52, 30],
  [108, 70, 36],
  [118, 34, 30],
] as const

// "Bytes" coletáveis: x, y, fase
const bytes = [
  [26, 58, 0],
  [72, 44, 1.4],
  [122, 62, 2.6],
  [128, 26, 3.8],
  [92, 78, 5],
] as const

const stars = Array.from({ length: 34 }, (_, i) => [(i * 37) % W, (i * 23) % 60, (i % 3) + 1])

function draw(ctx: CanvasRenderingContext2D, t: number, collected: number) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  // céu com estrelas em paralaxe
  for (const [sx, sy, d] of stars) {
    const x = Math.floor((sx - t * 0.004 * d + W * 10) % W)
    ctx.fillStyle = d === 3 ? '#ffffff' : '#5c5c5c'
    ctx.fillRect(x, sy, 1, 1)
  }

  // plataformas
  for (const [x, y, w] of platforms) {
    ctx.fillStyle = '#a7ff9c'
    ctx.fillRect(x, y, w, 3)
    ctx.fillStyle = '#2f6b33'
    ctx.fillRect(x, y + 3, w, H - y)
  }

  // bytes que flutuam
  bytes.forEach(([x, y, ph], i) => {
    if (i < collected) return
    const bob = Math.round(Math.sin(t / 380 + ph) * 2)
    ctx.fillStyle = '#ff6831'
    ctx.fillRect(x, y + bob, 5, 5)
    ctx.fillStyle = '#ffd2c0'
    ctx.fillRect(x + 1, y + 1 + bob, 2, 2)
  })

  // personagem correndo pela plataforma do meio
  const run = (t / 40) % 60
  const px = 62 + Math.round(run > 30 ? 60 - run : run) - 4
  const frame = Math.floor(t / 140) % 2
  const py = 52 - 9
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(px + 1, py, 5, 4) // cabeça
  ctx.fillStyle = '#ff6831'
  ctx.fillRect(px, py + 4, 7, 3) // corpo
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(px + (frame ? 1 : 0), py + 7, 2, 2) // pernas
  ctx.fillRect(px + (frame ? 4 : 5), py + 7, 2, 2)
  ctx.fillStyle = '#000'
  ctx.fillRect(px + 4, py + 1, 1, 1) // olho
}

export default function GameUI() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (reduced) {
      draw(ctx, 2000, 0)
      return
    }
    let raf = 0
    let visible = false
    let start = 0
    const loop = (now: number) => {
      if (!start) start = now
      const t = now - start
      const collected = Math.floor(t / 2600) % (bytes.length + 1)
      draw(ctx, t, collected)
      setScore((s) => (s !== collected * 8 ? collected * 8 : s))
      if (visible) raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(loop)
    })
    draw(ctx, 0, 0)
    io.observe(canvas)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div className="game" data-ui>
      <canvas ref={ref} width={W} height={H} role="img" aria-label="Tela de Bytes Brilhantes: personagem sobre plataformas verdes coletando bytes laranja" />
      <div className="game__hud" aria-hidden>
        <span>Bytes Brilhantes</span>
        <span>{String(score).padStart(3, '0')} bits</span>
      </div>
    </div>
  )
}
