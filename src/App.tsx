import Navbar from './components/Navbar'
import Section from './components/Section'
import ProjectCard from './components/ProjectCard'
import Footer from './components/Footer'
import { projects } from './data/projects'
import { motion } from 'framer-motion'

export default function App() {
  return (
    <div>
      <Navbar />

      <Section id="inicio" className="pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-semibold tracking-tight">
              Bruno Araújo Sakamoto
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mt-4 text-lg text-white/80 max-w-xl">
              FullStack | Backend | Frontend 
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mt-4 text-lg text-white/80 max-w-xl">
              Apaixonado por criar soluções bem projetadas, com UI/UX de alto nível e código limpo.            
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 flex gap-3">
              <a href="#projetos" className="rounded-xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90 transition">Ver projetos</a>
              <a href="#contato" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-medium hover:bg-white/10 transition">Contato</a>
            </motion.div>
          </div>

        </div>
      </Section>

      <Section id="projetos" title="Projetos em Destaque" subtitle="Alguns trabalhos que mostram meu foco em qualidade, performance e experiência.">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p as any} i={i} />
          ))}
        </div>
      </Section>

      <Section id="sobre" title="Sobre mim" subtitle="Desenvolvedor que une backend sólido com frontends caprichados.">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Stack favorita</h3>
            <p className="mt-2 text-white/80 text-sm">Python/FastAPI, React/Vite. Banco: Postgres. Infra: Docker. Sempre pensando em escalabilidade e DX.</p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li>• API bem definida, autenticação, testes e logs.</li>
              <li>• Frontends acessíveis, animados e responsivos.</li>
              <li>• CI/CD e boas práticas de versionamento.</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Destaques de UI/UX</h3>
            <p className="mt-2 text-white/80 text-sm">Microinterações, transições sutis, foco no conteúdo e na hierarquia visual.</p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li>• Cartões com efeito tilt e glassmorphism.</li>
              <li>• Navegação fixada com blur e mudança de opacidade ao scroll.</li>
              <li>• Fundo “aurora” neutro escuro — moderno, sem pesar.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="objetivos" title="Objetivos" subtitle="Onde quero chegar como desenvolvedor.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'FullStack sólido', d: 'Dominar arquiteturas modernas, testes e observabilidade.' },
            { t: 'Backend escalável', d: 'Projetar APIs robustas e performáticas com boas práticas.' },
            { t: 'Frontend refinado', d: 'Interfaces elegantes, acessíveis e rápidas.' },
          ].map((b) => (
            <div key={b.t} className="glass rounded-2xl p-6">
              <h4 className="font-semibold">{b.t}</h4>
              <p className="mt-2 text-sm text-white/80">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contato" title="Contatos">
        <div className="glass rounded-2xl p-6">
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://github.com/BrunoSakamoto" target="_blank" className="rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10 transition" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/" target="_blank" className="rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10 transition" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
