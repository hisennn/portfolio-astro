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
    const savedLanguage = localStorage.getItem("language");
    const language = savedLanguage === "en" ? "en" : "pt";
    setLanguageState(language);
    document.documentElement.setAttribute("lang", language === "en" ? "en" : "pt-BR");
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "pt-BR");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
