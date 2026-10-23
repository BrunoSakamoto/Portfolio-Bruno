import { useEffect, useRef, useState, type CSSProperties } from 'react'
import ThemeToggle from './ThemeToggle'
import { projects } from '../data/projects'

const LINHAS = ['Bruno', 'Sakamoto']

function useHoraLocal() {
  const fmt = () =>
    new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date())
  const [hora, setHora] = useState(fmt)
  useEffect(() => {
    const t = window.setInterval(() => setHora(fmt()), 10_000)
    return () => window.clearInterval(t)
  }, [])
  return hora
}

/**
 * As letras do nome reagem ao ponteiro: quanto mais perto, mais sobem e mais azuladas ficam.
 * As posições são medidas uma vez por redimensionamento; o movimento roda num único requestAnimationFrame.
 */
function useProximidade(raiz: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = raiz.current
    const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || !fino || reduzido) return
    const letras = Array.from(el.querySelectorAll<HTMLElement>('.letra'))
    let centros: { x: number; y: number }[] = []
    const medir = () => {
      centros = letras.map((l) => {
        const r = l.getBoundingClientRect()
        return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY }
      })
    }
    let raf = 0
    let px = -1e4
    let py = -1e4
    const aplicar = () => {
      raf = 0
      const raio = Math.max(160, innerWidth * 0.14)
      letras.forEach((l, i) => {
        const d = Math.hypot(px - centros[i].x, py - centros[i].y)
        l.style.setProperty('--perto', Math.max(0, 1 - d / raio).toFixed(3))
      })
    }
    const mover = (e: PointerEvent) => {
      px = e.pageX
      py = e.pageY
      if (!raf) raf = requestAnimationFrame(aplicar)
    }
    const sair = () => {
      px = py = -1e4
      if (!raf) raf = requestAnimationFrame(aplicar)
    }
    // mede depois da animação de entrada das linhas
    const t = window.setTimeout(medir, 1400)
    window.addEventListener('resize', medir)
    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerleave', sair)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', medir)
      el.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerleave', sair)
    }
  }, [raiz])
}

export default function Hero() {
  const raiz = useRef<HTMLElement>(null)
  const hora = useHoraLocal()
  useProximidade(raiz)
  let k = 0

  return (
    <header className="hero" id="inicio" ref={raiz}>
      <nav className="topbar grid12 hero-fade" aria-label="Principal">
        <a href="#inicio" className="topbar__name">Bruno A. Sakamoto</a>
        <div className="topbar__links">
          <a className="navlink" href="#projetos">Projetos</a>
          <a className="navlink" href="#sobre">Sobre</a>
          <a className="navlink" href="#ferramentas">Ferramentas</a>
        </div>
        <div className="topbar__acoes">
          <ThemeToggle />
          <a className="button topbar__action" href="#contato" data-magnet>
            Fale comigo <span className="arrow" aria-hidden>→</span>
          </a>
        </div>
      </nav>

      <div className="hero__meio grid12">
        <nav className="hero__indice" aria-label="Projetos">
          {projects.map((p, i) => (
            <a key={p.id} href={`#p-${p.id}`} className="hero__item hero-fade" style={{ '--d': i } as CSSProperties}>
              <span className="hero__item-nome">{p.name}</span>
              <span className="hero__item-tipo">{p.category}</span>
              <span className="arrow" aria-hidden>↓</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="hero__foot grid12">
        <div className="hero__lado hero-fade hero-fade--late">
          <p className="hero__lede">
            Engenheiro de Dados na 2RP NET. Construo pipelines em Python, PySpark e Airflow, e as aplicações em
            React e FastAPI que mostram o que eles produzem.
          </p>
          <p className="hero__agora">
            <i aria-hidden /> Sorocaba, SP · <time>{hora}</time> agora
          </p>
        </div>
        <h1 className="hero__title lines" aria-label="Bruno Sakamoto">
          {LINHAS.map((linha, i) => (
            <span className="line" key={linha} aria-hidden>
              <span data-line style={{ '--i': i } as CSSProperties}>
                {[...linha].map((c) => (
                  <span className="letra" key={k} style={{ '--k': k++ } as CSSProperties}>{c}</span>
                ))}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </header>
  )
}
