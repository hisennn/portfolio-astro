import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroField from "./components/HeroField";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import type { ProjectPreviews } from "./components/Projects";
import Education from "./components/Education";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App({ projectPreviews }: { projectPreviews: ProjectPreviews }) {
  return (
    <LanguageProvider>
      <div className="site-shell min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Header />
        <main className="home-main">
          <div className="hero-layout">
            <HeroField />
            <Hero />
          </div>
          <About />
          <Projects previews={projectPreviews} />
          <Experience />
          <Skills />
          <Education />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
