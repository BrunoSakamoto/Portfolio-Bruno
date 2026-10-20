import { useEffect } from 'react'

/**
 * Liga as entradas `[data-reveal]` e `.shutter` uma única vez, quando cada peça entra na tela.
 * Um `.shutter` começa totalmente recortado por clip-path, e o Chrome não o considera visível;
 * por isso observamos o elemento pai e abrimos o filho.
 */
export function useReveal() {
  useEffect(() => {
    const pairs: [Element, HTMLElement][] = []
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => pairs.push([el, el]))
    document.querySelectorAll<HTMLElement>('.shutter').forEach((el) => pairs.push([el.parentElement ?? el, el]))

    if (!('IntersectionObserver' in window)) {
      pairs.forEach(([, el]) => el.classList.add('is-in'))
      return
    }
    const targets = new Map<Element, HTMLElement[]>()
    pairs.forEach(([watch, el]) => targets.set(watch, [...(targets.get(watch) ?? []), el]))

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          targets.get(e.target)?.forEach((el) => el.classList.add('is-in'))
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    targets.forEach((_, watch) => io.observe(watch))
    return () => io.disconnect()
  }, [])
}
