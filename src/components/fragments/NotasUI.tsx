import amostras from '../../assets/notas-amostras.jpg'

const checagens = [
  { campo: 'Chave de acesso', regra: '44 dígitos, DV módulo 11' },
  { campo: 'CNPJ do emitente', regra: 'dígitos verificadores, inclusive alfanumérico' },
  { campo: 'Itens', regra: 'somam o total da nota' },
]

export default function NotasUI() {
  return (
    <div className="ui" data-ui>
      <div className="ui__bar">
        <span>notas-fiscais-ia</span>
        <span>Gemini contra o gabarito</span>
      </div>
      <div className="ui__body notas">
        <img
          className="notas__img"
          src={amostras}
          alt="Três notas sintéticas: um DANFE em PDF, o mesmo tipo fotografado e um cupom de NFC-e em foto desfocada"
          loading="lazy"
          decoding="async"
        />
        <ul className="ui__list" aria-label="Validação fiscal de cada nota">
          {checagens.map((c) => (
            <li key={c.campo}>
              <span className="ui__status"><i className="ui__dot" aria-hidden />{c.campo}</span>
              <span>{c.regra}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
