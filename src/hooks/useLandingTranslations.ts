import { useLanguage } from "../context/LanguageContext";
import { landingTranslations } from "../i18n/landingTranslations";

export function useLandingTranslations() {
  const { lang } = useLanguage();
  return landingTranslations[lang];
}
