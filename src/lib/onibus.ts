// Recorte real do projeto Ônibus em tempo real: os 3.643 ônibus em linha do Rio em 10 buscas seguidas
// à API de GPS da Prefeitura (22/10/2026, a partir das 9h41, uma busca a cada 30 s). Cada posição é
// [lat, lon, km/h], com lat e lon em décimos de milésimo de grau a partir da origem e km/h -1 quando o
// GPS não informou. No arquivo, o primeiro quadro vem inteiro e os seguintes como diferenças.
export type Posicao = [number, number, number]
export type Recorte = { lat0: number; lon0: number; esc: number; frames: Posicao[][] }
type Arquivo = { lat0: number; lon0: number; esc: number; n: number; base: number[]; deltas: number[][] }

let pedido: Promise<Recorte> | null = null

function decodificar(a: Arquivo): Recorte {
  const quadro = (plano: number[]) => Array.from({ length: a.n }, (_, i): Posicao => [plano[i * 3], plano[i * 3 + 1], plano[i * 3 + 2]])
  const frames = [quadro(a.base)]
  for (const d of a.deltas) {
    const ant = frames[frames.length - 1]
    frames.push(ant.map(([la, lo], i): Posicao => [la + d[i * 3], lo + d[i * 3 + 1], d[i * 3 + 2]]))
  }
  return { lat0: a.lat0, lon0: a.lon0, esc: a.esc, frames }
}

export function carregarRecorte(): Promise<Recorte> {
  pedido ??= fetch(`${import.meta.env.BASE_URL}onibus-rio.json`).then(async (r) => {
    if (!r.ok) throw new Error(String(r.status))
    return decodificar((await r.json()) as Arquivo)
  })
  return pedido
}

export const INICIO = { h: 9, m: 41, s: 30 }
export const PASSO_REAL_S = 30

export function horaDoQuadro(k: number) {
  const total = INICIO.h * 3600 + INICIO.m * 60 + INICIO.s + k * PASSO_REAL_S
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  return `${h}h${String(m).padStart(2, '0')}`
}

// Escala fria: andando em azul-gelo, devagar em azul médio, parado em branco (o que mais chama atenção)
export const corVelocidade = (kmh: number) =>
  kmh < 0 ? '#5d6b7e' : kmh < 3 ? '#f4f7fb' : kmh < 20 ? '#4d86d6' : '#8ccaff'

const LIM = { lon0: -43.8, lon1: -43.05, lat0: -23.08, lat1: -22.74 }
const COS = Math.cos((23 * Math.PI) / 180)

/** Projeta o recorte dentro de uma caixa (x, y, largura, altura), mantendo a proporção do mapa. */
export function projetor(r: Recorte, caixa: { x: number; y: number; w: number; h: number }) {
  const largura = (LIM.lon1 - LIM.lon0) * COS
  const altura = LIM.lat1 - LIM.lat0
  const escala = Math.min(caixa.w / largura, caixa.h / altura)
  const x0 = caixa.x + (caixa.w - largura * escala) / 2
  const y0 = caixa.y + (caixa.h - altura * escala) / 2
  return (la: number, lo: number): [number, number] => {
    const lon = r.lon0 + lo / r.esc
    const lat = r.lat0 + la / r.esc
    return [x0 + (lon - LIM.lon0) * COS * escala, y0 + (LIM.lat1 - lat) * escala]
  }
}
