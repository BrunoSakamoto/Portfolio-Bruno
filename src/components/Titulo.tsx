import { motion } from 'framer-motion'
import { Fragment, type CSSProperties } from 'react'
import { useReducedMotion } from '../hooks/useStaticMode'

type Props = { texto: string; id?: string; className?: string; nivel?: 'h2' | 'h3'; style?: CSSProperties }

/**
 * Título que entra palavra por palavra: cada palavra sobe de dentro de uma máscara, com atraso
 * escalonado, quando o título entra na tela. O texto continua inteiro para leitores de tela.
 */
export default function Titulo({ texto, id, className, nivel = 'h2', style }: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[nivel]
  const palavras = texto.split(' ')
  return (
    <Tag
      id={id}
      className={`titulo ${className ?? ''}`}
      style={style}
      aria-label={texto}
      initial={reduced ? false : 'fora'}
      whileInView="dentro"
      viewport={{ once: true, amount: 0.6 }}
    >
      {palavras.map((p, i) => (
        <Fragment key={i}>
          <span className="titulo__mascara" aria-hidden>
            <motion.span
              className="titulo__palavra"
              variants={{ fora: { y: '110%' }, dentro: { y: '0%' } }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              {p}
            </motion.span>
          </span>
          {i < palavras.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
