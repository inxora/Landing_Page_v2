import type { Language } from "../types/language";

export type ExcelCtaFormCopy = {
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  sending: string;
  disclaimer: string;
  errorMessage: string;
  successTitle: string;
  successSub: string;
};

export type ExcelCtaCopy = {
  badge: string;
  titleLine1: string;
  titleLine2Before: string;
  titleLine2Brand: string;
  titleLine2After: string;
  sub: string;
  cta: string;
  form: ExcelCtaFormCopy;
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
    form: {
      firstNameLabel: "Nombre",
      firstNamePlaceholder: "Juan",
      lastNameLabel: "Apellido",
      lastNamePlaceholder: "Pérez",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "juan@empresa.com",
      phoneLabel: "Teléfono / WhatsApp",
      phonePlaceholder: "+51 900 000 000",
      sending: "Enviando…",
      disclaimer:
        "Al enviar, aceptas que nos contactemos contigo para coordinar tu demo.",
      errorMessage:
        "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp.",
      successTitle: "¡Listo! Te esperamos.",
      successSub:
        "Te enviamos un correo de confirmación. Nuestro equipo se pondrá en contacto contigo muy pronto.",
    },
  },
  en: {
    badge: "Demo",
    titleLine1: "Stop running on spreadsheets.",
    titleLine2Before: "Start running on",
    titleLine2Brand: "INXORA",
    titleLine2After: ".",
    sub: "Book a demo with our team. We walk you through the platform with data from your industry and a concrete rollout plan.",
    cta: "Request a demo",
    form: {
      firstNameLabel: "First name",
      firstNamePlaceholder: "John",
      lastNameLabel: "Last name",
      lastNamePlaceholder: "Smith",
      emailLabel: "Work email",
      emailPlaceholder: "john@company.com",
      phoneLabel: "Phone / WhatsApp",
      phonePlaceholder: "+1 555 000 0000",
      sending: "Sending…",
      disclaimer:
        "By submitting, you agree we may contact you to schedule your demo.",
      errorMessage:
        "We couldn't send your request. Check your connection and try again, or message us on WhatsApp.",
      successTitle: "You're all set.",
      successSub:
        "We've sent a confirmation email. Our team will be in touch with you shortly.",
    },
  },
  pt: {
    badge: "Demo",
    titleLine1: "Pare de operar no Excel.",
    titleLine2Before: "Comece a operar na",
    titleLine2Brand: "INXORA",
    titleLine2After: ".",
    sub: "Agende uma demo com nosso time. Mostramos a plataforma com dados do seu setor e um plano de implementação concreto.",
    cta: "Solicitar demo",
    form: {
      firstNameLabel: "Nome",
      firstNamePlaceholder: "João",
      lastNameLabel: "Sobrenome",
      lastNamePlaceholder: "Silva",
      emailLabel: "E-mail corporativo",
      emailPlaceholder: "joao@empresa.com",
      phoneLabel: "Telefone / WhatsApp",
      phonePlaceholder: "+55 11 90000 0000",
      sending: "Enviando…",
      disclaimer:
        "Ao enviar, você aceita que entremos em contato para agendar sua demo.",
      errorMessage:
        "Não foi possível enviar sua solicitação. Verifique sua conexão e tente novamente, ou fale conosco pelo WhatsApp.",
      successTitle: "Tudo pronto! Esperamos por você.",
      successSub:
        "Enviamos um e-mail de confirmação. Nossa equipe entrará em contato em breve.",
    },
  },
};
