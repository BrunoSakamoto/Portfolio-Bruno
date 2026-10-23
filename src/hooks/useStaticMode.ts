import { useEffect, useState } from 'react'

// Só no telefone a cena fica parada: com movimento reduzido ela continua ligada à rolagem, sem deslocamentos.
const QUERY = '(max-width: 720px)'

/** Verdadeiro no telefone: as cenas mostram a composição final, parada. */
export function useStaticMode() {
  const [isStatic, setStatic] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const on = () => setStatic(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return isStatic
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}
