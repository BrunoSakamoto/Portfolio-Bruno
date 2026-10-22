export type ProjectId = 'anp' | 'notas' | 'rastreador' | 'onibus'

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
    id: 'anp',
    name: 'Combustíveis ANP',
    category: 'Engenharia de dados em lote',
    description:
      'Pipeline de ponta a ponta sobre a série histórica de preços de combustíveis da ANP. Baixa os arquivos semestrais, carrega 2,1 milhões de coletas no DuckDB, modela e testa com dbt e roda todo mês no Airflow. Os testes de qualidade pegam problemas reais da fonte, como etanol registrado com preço de gasolina, e um painel em Streamlit responde se posto de bandeira branca é mesmo mais barato.',
    tech: ['Python', 'Airflow', 'dbt', 'DuckDB', 'Streamlit'],
    github: 'https://github.com/BrunoSakamoto/combustiveis-anp',
    field: 'mint',
  },
  {
    id: 'notas',
    name: 'Notas fiscais com IA',
    category: 'IA aplicada, medida contra um gabarito',
    description:
      'Extrai os dados de DANFEs e cupons de NFC-e, em PDF ou foto, com o Gemini e saída estruturada, e mede o acerto campo a campo contra um gabarito sintético com CNPJ, CPF e chave de acesso válidos. Uma linha de base sem IA mostra o que o modelo acrescenta, e uma validação fiscal que não depende do modelo aponta quais notas precisam de revisão humana.',
    tech: ['Python', 'Gemini', 'Pydantic', 'DuckDB', 'pytest'],
    github: 'https://github.com/BrunoSakamoto/notas-fiscais-ia',
    field: 'grey',
  },
  {
    id: 'rastreador',
    name: 'Rastreador de candidaturas',
    category: 'Full stack, Spring Boot e React',
    description:
      'Um quadro para acompanhar a busca de emprego: cada vaga é uma ficha arrastada de etapa em etapa, com o histórico de cada mudança e métricas como taxa de resposta, funil e mediana de dias até a primeira resposta. API em Spring Boot 4 com JWT e PostgreSQL versionado pelo Flyway, interface em React 19 com atualização otimista e testes de integração contra um Postgres de verdade.',
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL'],
    github: 'https://github.com/BrunoSakamoto/rastreador-candidaturas',
    field: 'orange',
  },
  {
    id: 'onibus',
    name: 'Ônibus em tempo real',
    category: 'Streaming com Kafka',
    description:
      'Acompanha os cerca de 3.500 ônibus do Rio em tempo real. Um produtor lê a API de GPS da Prefeitura a cada 30 segundos e publica no Kafka; o processador grava no PostgreSQL e calcula a velocidade de cada linha em janelas de 5 minutos pelo horário do GPS, porque 16% das posições chegam atrasadas. Derrubar o processador no meio de um lote não duplica nem perde nada. O log desta pasta é o da execução real, com uma queda da API no meio.',
    tech: ['Python', 'Kafka', 'PostgreSQL', 'FastAPI', 'Docker'],
    github: 'https://github.com/BrunoSakamoto/onibus-tempo-real',
    field: 'black',
  },
]
