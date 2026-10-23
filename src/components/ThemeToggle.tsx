import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Tema = 'light' | 'dark'

/**
 * Troca claro/escuro. Onde o navegador suporta a View Transitions API, o tema novo se abre num
 * círculo a partir do botão; nos outros, a troca é imediata (as cores ainda fazem transição pelo CSS).
 */
export default function ThemeToggle() {
  const [tema, setTema] = useState<Tema>(() => (document.documentElement.dataset.theme as Tema) ?? 'light')

  useEffect(() => {
    // segue o sistema enquanto a pessoa não escolheu um tema
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const aoMudar = () => {
      let salvo: string | null = null
      try { salvo = localStorage.getItem('tema') } catch { /* armazenamento bloqueado */ }
      if (!salvo) aplicar(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  const aplicar = (novo: Tema) => {
    // sem transições de cor durante a troca: a captura da View Transition precisa do tema já final
    const raiz = document.documentElement
    raiz.classList.add('trocando-tema')
    requestAnimationFrame(() => requestAnimationFrame(() => raiz.classList.remove('trocando-tema')))
    raiz.dataset.theme = novo
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', novo === 'dark' ? '#0a0f17' : '#f3f6f9')
    setTema(novo)
  }

  const trocar = (e: React.MouseEvent<HTMLButtonElement>) => {
    const novo: Tema = tema === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('tema', novo === 'dark' ? 'escuro' : 'claro') } catch { /* sem persistência */ }
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
    if (!doc.startViewTransition || reduzido) return aplicar(novo)

    const { clientX: x, clientY: y } = e
    const raio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transicao = doc.startViewTransition(() => aplicar(novo))
    transicao.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  const escuro = tema === 'dark'
  return (
    <button
      type="button"
      className="tema"
      onClick={trocar}
      aria-pressed={escuro}
      aria-label={escuro ? 'Usar o tema claro' : 'Usar o tema escuro'}
      title={escuro ? 'Tema claro' : 'Tema escuro'}
    >
      <span className="tema__icone" data-escuro={escuro}>
        <Sun aria-hidden size={18} strokeWidth={1.8} />
        <Moon aria-hidden size={18} strokeWidth={1.8} />
      </span>
    </button>
  )
}
