import { useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useStaticMode'

// Empresas fictícias, como as da conta de demonstração do projeto.
type Etapa = 'aplicadas' | 'entrevistas' | 'proposta'
type Ficha = { id: string; empresa: string; cargo: string; meta: string; atrasada?: boolean; etapa: Etapa }

const ETAPAS: { id: Etapa; titulo: string; carimbo: string }[] = [
  { id: 'aplicadas', titulo: 'Aplicadas', carimbo: 'Aplicada' },
  { id: 'entrevistas', titulo: 'Entrevistas', carimbo: 'Entrevista' },
  { id: 'proposta', titulo: 'Proposta', carimbo: 'Proposta' },
]

const INICIAIS: Ficha[] = [
  { id: 'v', empresa: 'Vértice Dados', cargo: 'Eng. de Dados Jr', meta: 'há 3 dias', etapa: 'aplicadas' },
  { id: 'r', empresa: 'Rede Aurora', cargo: 'Dev Full Stack', meta: 'sem resposta há 9 dias', atrasada: true, etapa: 'aplicadas' },
  { id: 'l', empresa: 'Lumen Pagamentos', cargo: 'Analytics Engineer', meta: 'técnica na quinta', etapa: 'entrevistas' },
  { id: 'n', empresa: 'Norte Logística', cargo: 'Eng. de Dados', meta: 'conversa com o RH', etapa: 'entrevistas' },
]

export default function RastreadorUI() {
  const reduced = useReducedMotion()
  const [fichas, setFichas] = useState(INICIAIS)
  const [carimbada, setCarimbada] = useState<string | null>(null)
  const arrastou = useRef(false)
  const colunas = useRef<Record<Etapa, HTMLDivElement | null>>({ aplicadas: null, entrevistas: null, proposta: null })

  const mover = (id: string, etapa: Etapa) => {
    setFichas((fs) => fs.map((f) => (f.id === id ? { ...f, etapa, meta: etapa === 'proposta' ? 'proposta recebida hoje' : f.meta, atrasada: false } : f)))
    setCarimbada(id)
  }

  const soltar = (id: string, x: number, y: number) => {
    for (const e of ETAPAS) {
      const r = colunas.current[e.id]?.getBoundingClientRect()
      if (r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        if (fichas.find((f) => f.id === id)?.etapa !== e.id) mover(id, e.id)
        return
      }
    }
  }

  const avancar = (f: Ficha) => {
    const i = ETAPAS.findIndex((e) => e.id === f.etapa)
    if (i < ETAPAS.length - 1) mover(f.id, ETAPAS[i + 1].id)
  }

  const respondidas = fichas.filter((f) => f.etapa !== 'aplicadas').length
  return (
    <div className="ui" data-ui>
      <div className="ui__bar">
        <span>Candidaturas</span>
        <span>{respondidas} de {fichas.length} com resposta</span>
      </div>
      <LayoutGroup>
        <div className="ui__body quadro">
          {ETAPAS.map((e) => (
            <div className="quadro__coluna" key={e.id} ref={(el) => { colunas.current[e.id] = el }}>
              <p className="quadro__titulo">{e.titulo}</p>
              {fichas.filter((f) => f.etapa === e.id).map((f) => (
                <motion.button
                  type="button"
                  layout={!reduced}
                  layoutId={f.id}
                  key={f.id}
                  className="quadro__ficha"
                  drag
                  dragSnapToOrigin
                  dragElastic={0.6}
                  whileDrag={{ scale: 1.04, rotate: -2, zIndex: 5, cursor: 'grabbing' }}
                  onDragStart={() => { arrastou.current = true }}
                  onDragEnd={(_, info) => {
                    soltar(f.id, info.point.x - window.scrollX, info.point.y - window.scrollY)
                    window.setTimeout(() => { arrastou.current = false }, 0)
                  }}
                  onClick={() => { if (!arrastou.current) avancar(f) }}
                  aria-label={`${f.empresa}, ${f.cargo}. Avançar para a próxima etapa`}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                >
                  <b>{f.empresa}</b>
                  <span>{f.cargo}</span>
                  <small className={f.atrasada ? 'is-late' : undefined}>{f.meta}</small>
                  <AnimatePresence>
                    {carimbada === f.id && (
                      <motion.em
                        key={f.etapa}
                        className="quadro__carimbo"
                        initial={reduced ? false : { opacity: 0, scale: 2.2, rotate: -4 }}
                        animate={{ opacity: 1, scale: 1, rotate: -4 }}
                        transition={{ duration: 0.22, ease: 'easeIn', delay: 0.25 }}
                      >
                        {ETAPAS.find((x) => x.id === f.etapa)?.carimbo}
                      </motion.em>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
              {e.id === 'proposta' && !fichas.some((f) => f.etapa === 'proposta') && (
                <p className="quadro__vazio">Arraste uma ficha para cá</p>
              )}
            </div>
          ))}
          <div className="quadro__funil" aria-label="Funil das candidaturas">
            {ETAPAS.map((e) => {
              const chegaram = fichas.filter((f) => ETAPAS.findIndex((x) => x.id === f.etapa) >= ETAPAS.findIndex((x) => x.id === e.id)).length
              return (
                <div key={e.id}>
                  <span>{e.titulo}</span>
                  <b>{chegaram}</b>
                  <i aria-hidden><motion.span animate={{ scaleX: chegaram / fichas.length }} transition={{ type: 'spring', stiffness: 200, damping: 26 }} /></i>
                </div>
              )
            })}
          </div>
        </div>
      </LayoutGroup>
    </div>
  )
}
