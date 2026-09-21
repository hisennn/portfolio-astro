import Header from "./components/Header";
import Hero from "./components/Hero";
import ExperienceSkills from "./components/ExperienceSkills";
import Projects from "./components/Projects";
import type { ProjectPreviews } from "./components/Projects";
import Education from "./components/Education";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useImageDrift } from "./hooks/useImageDrift";

export default function App({ projectPreviews }: { projectPreviews: ProjectPreviews }) {
  useImageDrift();

  return (
    <LanguageProvider>
      <div className="site-shell min-h-screen text-[var(--text-primary)]">
        <div className="site-lift">
          <Header />
          <main className="home-main">
            <div className="hero-layout">
              <img className="hero-floral" src="/images/blue-flowers-original.png" alt="" aria-hidden="true" width={1536} height={1024} decoding="async" />
              <Hero />
            </div>
            <Projects previews={projectPreviews} />
            <ExperienceSkills />
            <Education />
          </main>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
