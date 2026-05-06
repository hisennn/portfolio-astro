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
      <div className="site-shell min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Header />
        <main className="max-w-[1200px] mx-5 md:mx-auto px-0 md:px-6 pt-16 md:pt-32 pb-24 md:pb-32 flex min-w-0 flex-col gap-24 md:gap-32">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
