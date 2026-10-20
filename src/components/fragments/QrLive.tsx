import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

type Ecc = 'L' | 'M' | 'Q' | 'H'
const eccs: { id: Ecc; label: string }[] = [
  { id: 'L', label: 'L 7%' },
  { id: 'M', label: 'M 15%' },
  { id: 'Q', label: 'Q 25%' },
  { id: 'H', label: 'H 30%' },
]
const colors = [
  { id: '#000000', name: 'Preto' },
  { id: '#1d6b2c', name: 'Verde' },
  { id: '#c2410c', name: 'Laranja' },
]

function download(href: string, name: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = name
  a.click()
}

export default function QrLive() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('https://github.com/BrunoSakamoto')
  const [ecc, setEcc] = useState<Ecc>('M')
  const [color, setColor] = useState(colors[0].id)
  const value = text.trim() || ' '

  useEffect(() => {
    if (!canvas.current) return
    QRCode.toCanvas(canvas.current, value, {
      errorCorrectionLevel: ecc,
      margin: 2,
      width: 460,
      color: { dark: color, light: '#ffffff' },
    }).catch(() => {})
  }, [value, ecc, color])

  const savePng = () => {
    if (canvas.current) download(canvas.current.toDataURL('image/png'), 'qrcode.png')
  }
  const saveSvg = async () => {
    const svg = await QRCode.toString(value, {
      type: 'svg',
      errorCorrectionLevel: ecc,
      margin: 2,
      color: { dark: color, light: '#ffffff' },
    })
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    download(url, 'qrcode.svg')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="ui qr" data-ui>
      <div className="ui__bar">
        <span>Gerador de QR Code</span>
        <span className="ui__status"><i className="ui__dot" aria-hidden /> prévia ao vivo</span>
      </div>
      <div className="qr__body">
        <div className="qr__controls">
          <div className="qr__field">
            <label htmlFor="qr-text">Link ou texto</label>
            <input
              id="qr-text"
              className="qr__input"
              value={text}
              maxLength={300}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className="qr__field">
            <span className="qr__legend" id="qr-ecc">Correção de erro</span>
            <div className="qr__seg" role="group" aria-labelledby="qr-ecc">
              {eccs.map((e) => (
                <button key={e.id} type="button" aria-pressed={ecc === e.id} onClick={() => setEcc(e.id)}>
                  {e.label}
                </button>
              ))}
            </div>
          </div>
          <div className="qr__field">
            <span className="qr__legend" id="qr-color">Cor</span>
            <div className="qr__seg" role="group" aria-labelledby="qr-color">
              {colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="qr__swatch"
                  style={{ background: c.id }}
                  aria-pressed={color === c.id}
                  aria-label={c.name}
                  onClick={() => setColor(c.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="qr__out">
          <canvas ref={canvas} className="qr__canvas" width={460} height={460} role="img" aria-label={`QR Code para ${value}`} />
          <div className="qr__downloads">
            <button type="button" className="button button--ink" onClick={savePng}>PNG</button>
            <button type="button" className="button button--ink" onClick={saveSvg}>SVG</button>
          </div>
        </div>
      </div>
    </div>
  )
}
