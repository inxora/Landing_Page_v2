import type { Language } from "../types/language";

/** WhatsApp INXORA (+51 913 087 207) — cotizaciones y contacto comercial */
export const WHATSAPP_QUOTE_URL =
  "https://api.whatsapp.com/send?phone=51913087207";

/** WhatsApp para el botón "Hablar por WhatsApp" del hero (+51 946 885 531) */
export const WHATSAPP_DEMO_URL =
  "https://api.whatsapp.com/send?phone=51946885531";

const DEMO_MESSAGE_BY_LANG: Record<Language, string> = {
  es: "Hola, me gustaría solicitar una demo personalizada de INXORA.",
  en: "Hi, I'd like to request a personalized demo of INXORA.",
  pt: "Olá, gostaria de solicitar uma demo personalizada da INXORA.",
};

export function buildWhatsAppDemoUrl(lang: Language): string {
  return `${WHATSAPP_DEMO_URL}&text=${encodeURIComponent(DEMO_MESSAGE_BY_LANG[lang])}`;
}
