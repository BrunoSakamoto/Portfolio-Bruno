import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Números da execução real com os dados da ANP (2024 a 2026): cerca de 2,1 milhões de coletas e 27 testes.
const tarefas = [
  { nome: 'baixar', feito: 'arquivos dos semestres na ANP', ms: 1300 },
  { nome: 'carregar', feito: 'cerca de 2,1 milhões de coletas no DuckDB', ms: 1700 },
  { nome: 'dbt build', feito: 'modelos e testes de qualidade', ms: 2300 },
]
const modelos = ['stg_precos', 'fct_coletas', 'preco_semanal_uf', 'variacao_uf', 'bandeiras']
const MILHOES = 2.1

type Estado = 'fila' | 'rodando' | 'ok'

export default function AnpUI() {
  const caixa = useRef<HTMLDivElement>(null)
  const visto = useInView(caixa, { once: true, amount: 0.5 })
  const [rodada, setRodada] = useState(0)
  const [passo, setPasso] = useState(-1) // índice da tarefa rodando; 99 = tudo pronto
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    if (!visto) return
    let cancelado = false
    let raf = 0
    const rodar = async () => {
      for (let i = 0; i < tarefas.length; i++) {
        setPasso(i)
        const t0 = performance.now()
        await new Promise<void>((fim) => {
          const tick = (t: number) => {
            if (cancelado) return fim()
            const p = Math.min(1, (t - t0) / tarefas[i].ms)
            setProgresso(p)
            if (p < 1) raf = requestAnimationFrame(tick)
            else fim()
          }
          raf = requestAnimationFrame(tick)
        })
        if (cancelado) return
      }
      setPasso(99)
    }
    rodar()
    return () => {
      cancelado = true
      cancelAnimationFrame(raf)
    }
  }, [visto, rodada])

  const estado = (i: number): Estado => (passo === 99 || i < passo ? 'ok' : i === passo ? 'rodando' : 'fila')
  const milhoes = passo === 99 || passo > 1 ? MILHOES : passo === 1 ? MILHOES * progresso : 0
  const modelosProntos = passo === 99 ? modelos.length : passo === 2 ? Math.floor(progresso * modelos.length) : 0
  const pronto = passo === 99

  return (
    <div className="ui anp" data-ui ref={caixa}>
      <div className="ui__bar">
        <span>DAG combustiveis_anp</span>
        <span className="ui__status">
          <i className={pronto ? 'ui__dot' : 'ui__dot ui__dot--wait'} aria-hidden />
          {pronto ? 'sucesso' : passo < 0 ? 'na fila' : 'rodando'}
        </span>
      </div>
      <div className="ui__body anp__corpo">
        <ol className="anp__tarefas" aria-label="Tarefas da DAG no Airflow">
          {tarefas.map((t, i) => {
            const e = estado(i)
            return (
              <li key={t.nome} className={`anp__tarefa is-${e}`}>
                <span className="anp__nome">{t.nome}</span>
                <span className="anp__barra" aria-hidden>
                  <i style={{ transform: `scaleX(${e === 'ok' ? 1 : e === 'rodando' ? progresso : 0})` }} />
                </span>
                <span className="anp__feito">{e === 'fila' ? 'aguardando' : t.feito}</span>
              </li>
            )
          })}
        </ol>
        <div className="anp__painel">
          <p className="anp__numero">
            <b>{milhoes.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mi</b>
            <span>coletas de preço de postos, 2024 a 2026</span>
          </p>
          <pre className="code anp__log"><code>
            <span>$ dbt build</span>
            {modelos.map((m, i) => (
              <span key={m} className={i < modelosProntos ? 'is-on' : 'is-off'}>
                {m.padEnd(18, '.')} <span className="k">OK</span>
              </span>
            ))}
            <span className={pronto ? 'is-on' : 'is-off'}>PASS=27 WARN=0 ERROR=0</span>
          </code></pre>
          <button
            type="button"
            className="anp__rodar"
            onClick={() => {
              setPasso(-1)
              setProgresso(0)
              setRodada((r) => r + 1)
            }}
            disabled={!pronto}
          >
            Rodar a DAG de novo
          </button>
        </div>
      </div>
    </div>
  )
}
