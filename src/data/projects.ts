export type ProjectId = 'tradutor' | 'leitor' | 'jogo' | 'qrcode'

export type Project = {
  id: ProjectId
  name: string
  category: string
  description: string
  tech: readonly string[]
  github: string
  field: 'mint' | 'grey' | 'orange' | 'black'
}

export const projects: readonly Project[] = [
  {
    id: 'tradutor',
    name: 'TradutorDocumentos',
    category: 'Full stack, Spring Boot e React',
    description:
      'Um tradutor de arquivos inteiros. Você entra com a conta Google, envia um DOCX ou PDF e recebe o documento traduzido, com o histórico de tudo o que já passou por ali. O backend em Spring Boot cuida da autenticação com OAuth2 e JWT e conversa com a API de tradução; o React acompanha cada arquivo do envio ao download.',
    tech: ['Java', 'Spring Boot', 'React', 'OAuth2', 'JWT'],
    github: 'https://github.com/ProjetoIntegrador4-Semestre/TradutorDocumentos',
    field: 'mint',
  },
  {
    id: 'leitor',
    name: 'Leitor de Documentos',
    category: 'Full stack, Python e FastAPI',
    description:
      'Notas fiscais chegam como PDF e saem como linhas no Postgres. O Gemini lê o documento e encontra emitente, CNPJ, data, itens e total; a API em FastAPI valida e normaliza cada campo antes de gravar. API e banco sobem juntos com Docker Compose, então o projeto roda igual em qualquer máquina.',
    tech: ['Python', 'FastAPI', 'Postgres', 'Docker', 'Gemini'],
    github: 'https://github.com/BrunoSakamoto/LeitorDocumentosPython',
    field: 'grey',
  },
  {
    id: 'jogo',
    name: 'Bytes Brilhantes',
    category: 'Jogo em Java, orientação a objetos',
    description:
      'Um jogo em Java feito para estudar orientação a objetos de verdade, não só em exercício. Cada peça do jogo é uma classe com uma responsabilidade, e os padrões de projeto entram onde resolvem um problema real. A arquitetura é modular, para que uma mudança numa parte não exija mexer em todas as outras.',
    tech: ['Java', 'POO', 'Design Patterns'],
    github: 'https://github.com/Game-JAVA/Bytes-brilhantes',
    field: 'orange',
  },
  {
    id: 'qrcode',
    name: 'Gerador de QR Code',
    category: 'Backend, CLI, API e interface',
    description:
      'Gera QR Codes a partir de qualquer link ou texto, com cor, borda, nível de correção de erro e um logo opcional no centro. Funciona de três jeitos: na linha de comando com Typer, como API REST em FastAPI e numa interface em Streamlit com prévia em tempo real. Sai em PNG para a tela e em SVG para impressão. Experimente aqui mesmo.',
    tech: ['Python', 'FastAPI', 'Streamlit', 'Typer', 'Pillow'],
    github: 'https://github.com/BrunoSakamoto/QRcodeGenerator',
    field: 'black',
  },
]
