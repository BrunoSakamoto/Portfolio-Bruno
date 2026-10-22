const tarefas = [
  { nome: 'baixar', detalhe: '2025-2 e 2026-1 da ANP' },
  { nome: 'carregar', detalhe: '2,1 milhões de coletas no DuckDB' },
  { nome: 'dbt build', detalhe: 'modelos e testes de qualidade' },
]

export default function AnpUI() {
  return (
    <div className="ui" data-ui>
      <div className="ui__bar">
        <span>DAG combustiveis_anp</span>
        <span className="ui__status"><i className="ui__dot" aria-hidden /> sucesso</span>
      </div>
      <div className="ui__body ui__split">
        <ul className="ui__list" aria-label="Tarefas da DAG no Airflow">
          {tarefas.map((t) => (
            <li key={t.nome}>
              <span className="ui__status"><i className="ui__dot" aria-hidden />{t.nome}</span>
              <span>{t.detalhe}</span>
            </li>
          ))}
        </ul>
        <pre className="code"><code>
          <span>$ dbt build</span>
          <span>{' '}</span>
          <span>stg_precos ............ <span className="k">OK</span></span>
          <span>fct_coletas ........... <span className="k">OK</span></span>
          <span>preco_semanal_uf ...... <span className="k">OK</span></span>
          <span>bandeiras ............. <span className="k">OK</span></span>
          <span>{' '}</span>
          <span>PASS=27  WARN=0  ERROR=0</span>
          <span>fora da curva: 8 coletas</span>
        </code></pre>
      </div>
    </div>
  )
}
