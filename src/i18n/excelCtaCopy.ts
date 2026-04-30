import type { Language } from "../types/language";

export type ExcelCtaCopy = {
  badge: string;
  titleLine1: string;
  titleLine2Before: string;
  titleLine2Brand: string;
  titleLine2After: string;
  sub: string;
  cta: string;
};

export const excelCtaCopy: Record<Language, ExcelCtaCopy> = {
  es: {
    badge: "Demo",
    titleLine1: "Deja de operar con Excel.",
    titleLine2Before: "Empieza a operar con",
    titleLine2Brand: "INXORA",
    titleLine2After: ".",
    sub: "Agenda una demo con nuestro equipo. Te mostramos la plataforma con datos de tu industria y te damos un plan de implementación concreto.",
    cta: "Solicitar demo",
  },
  en: {
    badge: "Demo",
    titleLine1: "Stop running on spreadsheets.",
    titleLine2Before: "Start running on",
    titleLine2Brand: "INXORA",
    titleLine2After: ".",
    sub: "Book a demo with our team. We walk you through the platform with data from your industry and a concrete rollout plan.",
    cta: "Request a demo",
  },
  pt: {
    badge: "Demo",
    titleLine1: "Pare de operar no Excel.",
    titleLine2Before: "Comece a operar na",
    titleLine2Brand: "INXORA",
    titleLine2After: ".",
    sub: "Agende uma demo com nosso time. Mostramos a plataforma com dados do seu setor e um plano de implementação concreto.",
    cta: "Solicitar demo",
  },
};
