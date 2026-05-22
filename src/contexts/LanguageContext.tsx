"use client";
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: () => { },
  isDarkTheme: true,
  toggleTheme: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("pt");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguageState(savedLanguage);
      document.documentElement.setAttribute("lang", savedLanguage === "en" ? "en" : "pt-BR");
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkTheme(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setIsDarkTheme(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "pt-BR");
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const next = !prev;
      const theme = next ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isDarkTheme, toggleTheme }}>
      {children}
    </LanguageContext.Provider>
  );
}
