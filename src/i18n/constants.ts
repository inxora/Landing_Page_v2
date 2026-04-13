import type { Language } from "../types/language";

export const LANGUAGE_OPTIONS: {
  value: Language;
  label: string;
  code: string;
}[] = [
  { value: "es", label: "Español", code: "ES" },
  { value: "en", label: "English", code: "EN" },
  { value: "pt", label: "Português", code: "PT" },
];
