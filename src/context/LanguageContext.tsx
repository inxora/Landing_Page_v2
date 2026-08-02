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

// 2026-08-02 — Mientras el selector de idioma esté desactivado
// (ver `site-header.tsx`), forzamos español y limpiamos cualquier
// valor cacheado previo. Sin selector visible, un usuario con
// `inxora_lang=en` en localStorage no podría cambiarlo y quedaría
// atrapado viendo la landing en un idioma que no eligió. Cuando el
// selector vuelva, revertir a la lógica original de `readStoredLang`.
function readStoredLang(): Language {
  try {
    localStorage.removeItem(STORAGE_KEY);
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
