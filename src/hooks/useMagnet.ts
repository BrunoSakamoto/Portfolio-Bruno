import { useEffect } from 'react'

/**
 * Botões "magnéticos": elementos com [data-magnet] puxam levemente na direção do ponteiro quando ele
 * chega perto, e voltam com mola ao sair. Só com mouse e sem preferência por movimento reduzido.
 */
export function useMagnet() {
  useEffect(() => {
    const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fino || reduzido) return
    const alvos = Array.from(document.querySelectorAll<HTMLElement>('[data-magnet]'))
    const limpar: (() => void)[] = []
    for (const el of alvos) {
      const forca = Number(el.dataset.magnet) || 0.28
      const mover = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${dx * forca}px, ${dy * forca}px)`
      }
      const sair = () => { el.style.transform = '' }
      el.addEventListener('pointermove', mover)
      el.addEventListener('pointerleave', sair)
      limpar.push(() => {
        el.removeEventListener('pointermove', mover)
        el.removeEventListener('pointerleave', sair)
      })
    }
    return () => limpar.forEach((f) => f())
  }, [])
}
