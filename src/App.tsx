import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="site-shell min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Header />
        <main className="max-w-[1100px] mx-auto px-5 md:px-6 pt-20 md:pt-28 pb-0 flex flex-col gap-20 md:gap-24">
          <div className="hero-layout">
            <Hero />
            <About />
          </div>
          <Projects />
          <Experience />
          <Skills />
          <Education />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
