import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { Language } from "../types/language";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

const STORAGE_KEY = "inxora_lang";

function readStoredLang(): Language {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (v === "es" || v === "en" || v === "pt") return v;
  } catch {
    /* ignore */
  }
  return "es";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(readStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    const htmlLang =
      lang === "pt" ? "pt-BR" : lang === "en" ? "en" : "es";
    document.documentElement.lang = htmlLang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
};
