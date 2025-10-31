export const projects = [
    {
        title: 'TradutorDocumentos (Full Stack)',
        role: 'Spring Boot + React',
        description: 'Sistema de tradução automática com Java (Spring Boot) e React.',
        highlights: [
            'Login com Google',
            'Upload DOCX/PDF com histórico',
            'Integração com API de tradução'
        ],
        tech: ['Java', 'Spring Boot', 'React', 'JWT/OAuth2'],
        github: 'https://github.com/ProjetoIntegrador4-Semestre/TradutorDocumentos'
    },
    {
        title: 'Leitor de Documentos (Full Stack)',
        role: 'Python + FastAPI + Postgres',
        description: 'Leitura de notas fiscais com FastAPI e armazenamento no Postgres/Docker.',
        highlights: [
            'Utilização do Gemini para leitura',
            'Docker Compose para orquestração',
            'Persistência dos dados estruturados'
        ],
        tech: ['Python', 'FastAPI', 'Postgres', 'Docker'],
        github: 'https://github.com/BrunoSakamoto/LeitorDocumentosPython'
    },
    {
        title: 'Jogo Java (Full Stack)',
        role: 'POO + Design Patterns',
        description: 'Projeto de estudo de Programação Orientada a Objetos em Java.',
        highlights: [
            'Aplicação de Design Patterns',
            'Arquitetura modular',
            'Ênfase em boas práticas'
        ],
        tech: ['Java', 'OOP', 'Patterns'],
        github: 'https://github.com/Game-JAVA/Bytes-brilhantes'
    },

    {
        title: 'Gerador de QR Code (Backend)',
        role: 'CLI + API (FastAPI) + UI (Streamlit)',
        description: 'Ferramenta para gerar QR Codes a partir de links/textos, com personalização de cores, borda, nível de correção de erro (ECC) e logo central opcional. Saída em PNG e SVG.',
        highlights: [
            'Três modos de uso: CLI, API REST e interface visual',
            'Suporte a logo central com ECC (L/M/Q/H) e prévia em tempo real',
            'Endpoint SVG para impressão com qualidade'
        ],
        tech: ['Python', 'FastAPI', 'Streamlit', 'Typer', 'Pillow', 'qrcode'],
        github: 'https://github.com/BrunoSakamoto/QRcodeGenerator',
    }
] as const