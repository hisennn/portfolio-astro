import Header from "./components/Header";
import Hero from "./components/Hero";
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
        <main className="max-w-[1100px] mx-auto px-5 md:px-6 pt-12 md:pt-20 pb-0 flex flex-col gap-16 md:gap-20">
          <div className="hero-layout">
            <Hero />
            <About />
          </div>
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
