import Navbar from './components/Navbar'
import Section from './components/Section'
import ProjectCard from './components/ProjectCard'
import Footer from './components/Footer'
import { projects } from './data/projects'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { FaPython, FaReact, FaDocker, FaHtml5, FaCss3Alt, FaJs, FaGithub, FaJava } from 'react-icons/fa'
import { SiTypescript, SiPostgresql } from 'react-icons/si'

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-4 text-2xl md:text-3xl font-medium text-white/90 max-w-xl"
            >
              <TypeAnimation
                sequence={[
                  'Desenvolvedor FullStack', 2000,
                  'Desenvolvedor Backend', 2000,
                  'Desenvolvedor Frontend', 2000,
                ]}
                wrapper="span"
                speed={30}
                deletionSpeed={50}
                repeat={Infinity}
              />
            </motion.div>

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

      <Section
        id="skills"
        title="Principais Tecnologias"
        subtitle="Ferramentas e linguagens que utilizo no meu dia a dia."
      >
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {[
            { Icon: FaPython, color: '#3776AB', label: 'Python' },
            { Icon: FaReact, color: '#61DAFB', label: 'React' },
            { Icon: SiPostgresql, color: '#336791', label: 'SQL' },
            { Icon: SiTypescript, color: '#3178C6', label: 'TypeScript' },
            { Icon: FaDocker, color: '#0db7ed', label: 'Docker' },
            { Icon: FaHtml5, color: '#E34F26', label: 'HTML' },
            { Icon: FaCss3Alt, color: '#1572B6', label: 'CSS' },
            { Icon: FaJs, color: '#F7DF1E', label: 'JavaScript' },
            { Icon: FaJava, color: '#E76F00', label: 'Java' },
            { Icon: FaGithub, color: '#FFFFFF', label: 'GitHub' },
          ].map(({ Icon, color, label }) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.15,
                rotate: 3,
                transition: { type: 'spring', stiffness: 200, damping: 10 },
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Icon className="text-5xl" style={{ color }} />
              </motion.div>

              <motion.span
                className="text-sm text-white/80"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
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
        <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center">
          <p className="text-white/80 mb-6 text-center text-lg">
            Entre em contato comigo pelas redes abaixo:
          </p>

          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/BrunoSakamoto"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl border border-white/20 hover:bg-white/10 transition flex flex-col items-center hover:scale-110 duration-200"
            >
              <Github className="w-10 h-10" />
              <span className="mt-2 text-sm">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/bruno-a-sakamoto/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl border border-white/20 hover:bg-white/10 transition flex flex-col items-center hover:scale-110 duration-200"
            >
              <Linkedin className="w-10 h-10" />
              <span className="mt-2 text-sm">LinkedIn</span>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=brunosakar2005@gmail.com&su=Contato%20via%20Portfólio"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl border border-white/20 hover:bg-white/10 transition flex flex-col items-center hover:scale-110 duration-200"
            >
              <Mail className="w-10 h-10" />
              <span className="mt-2 text-sm">E-mail</span>
            </a>

          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
