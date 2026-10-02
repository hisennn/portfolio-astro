"use client";
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "pt" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const language = document.documentElement.lang === "en" ? "en" : "pt";
    setLanguageState(language);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "pt-BR");
    try {
      localStorage.setItem("language", lang);
    } catch (_) {
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
