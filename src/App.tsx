import { D } from './tokens'
import Hero from './components/Hero'
import Features from './components/Features'
import Calculators from './components/Calculators'
import Process from './components/Process'
import Contact from './components/Contact'
import Trust from './components/Trust'
import FAQ from './components/FAQ'
import KnowledgeBase from './components/KnowledgeBase'
import PreFooterBanner from './components/PreFooterBanner'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <div className="overflow-x-hidden" style={{ background: D.bg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Hero />
      <Features />
      <Calculators />
      <Process />
      <Contact />
      <Trust />
      <KnowledgeBase />
      <FAQ />
      <PreFooterBanner />
      <Footer />
    </div>
  )
}
