import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const items = [
  { href: '#inicio', label: 'Início' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#objetivos', label: 'Objetivos' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [opaque, setOpaque] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setOpaque(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.5 } 
    )

    items.forEach((item) => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        opaque ? 'backdrop-blur-md bg-black/30 border-b border-white/10' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-semibold tracking-tight">
          Bruno A. Sakamoto
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className={`transition-colors ${
                active === it.href
                  ? 'text-white font-medium border-b border-white/60 pb-1'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {it.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col gap-2">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className={`px-2 py-2 rounded-lg ${
                  active === it.href ? 'bg-white/10 font-medium' : 'hover:bg-white/10'
                }`}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
