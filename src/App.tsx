import Hero from './components/Hero'
import PipelineScene from './components/PipelineScene'
import Work from './components/Work'
import About from './components/About'
import Stack from './components/Stack'
import Numeros from './components/Numeros'
import Experiencia from './components/Experiencia'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { useMagnet } from './hooks/useMagnet'

export default function App() {
  useReveal()
  useMagnet()
  return (
    <>
      <div className="progresso" aria-hidden />
      <div className="page">
        <Hero />
        <main>
          <Numeros />
          <PipelineScene />
          <Work />
          <About />
          <Experiencia />
          <Stack />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  )
}
