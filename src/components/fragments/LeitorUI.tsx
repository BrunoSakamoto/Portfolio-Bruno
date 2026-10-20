const services = [
  { name: 'api', image: 'fastapi · porta 8000', ok: true },
  { name: 'db', image: 'postgres:16 · saudável', ok: true },
  { name: 'gemini', image: 'serviço externo', ok: false },
]

export default function LeitorUI() {
  return (
    <div className="ui" data-ui>
      <div className="ui__bar">
        <span>docker compose up</span>
        <span className="ui__status"><i className="ui__dot" aria-hidden /> 2 de 2 no ar</span>
      </div>
      <div className="ui__body ui__split">
        <ul className="ui__list" aria-label="Serviços do Docker Compose">
          {services.map((s) => (
            <li key={s.name}>
              <span className="ui__status">
                <i className={s.ok ? 'ui__dot' : 'ui__dot ui__dot--wait'} aria-hidden />
                {s.name}
              </span>
              <span>{s.image}</span>
            </li>
          ))}
        </ul>
        <pre className="code"><code>
          <span>SELECT emitente, total</span>
          <span>  FROM notas_fiscais</span>
          <span> ORDER BY emissao DESC</span>
          <span> LIMIT 3;</span>
          <span>{' '}</span>
          <span><span className="k">Padaria Pão de Cada Dia</span>  54,70</span>
          <span><span className="k">Mercado Bom Preço</span>      212,35</span>
          <span><span className="k">Farmácia Central</span>        48,90</span>
        </code></pre>
      </div>
    </div>
  )
}
