
import Navbar from './components/layout/Navbar'
import ThemeToggle from './components/ui/ThemeToggle'
import CursorTrail from './components/ui/CursorTrail'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Certifications from './components/sections/Certifications'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:p-3"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <Hero />

        {/* Navigation begins below the Hero */}
        <Navbar />

        <About />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      <ThemeToggle />
      <CursorTrail />
    </>
  )
}

export default App
