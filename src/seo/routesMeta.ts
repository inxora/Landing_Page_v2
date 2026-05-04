import { SITE_ORIGIN } from "../config/site";
import { ROUTES } from "../routes/paths";

export type RouteSeo = {
  title: string;
  description: string;
};

const brand = "INXORA";

const home: RouteSeo = {
  title: `${brand} - Centraliza tus proveedores`,
  description:
    "INXORA SaaS es tu software de control y seguimiento de proveedores para equipos de compras industriales. Centraliza evaluaciones, contratos y pagos en un solo panel. Recupera la trazabilidad de tu cadena de suministro.",
};

const ROUTES_META: Record<string, RouteSeo> = {
  "/": home,
  [ROUTES.nosotros]: {
    title: `Nosotros · ${brand}`,
    description:
      "Conoce la misión de INXORA: digitalizar la gestión de proveedores en Perú y Latinoamérica con tecnología SaaS para equipos de compras industriales.",
  },
  [ROUTES.contacto]: {
    title: `Contacto · ${brand}`,
    description:
      "Contacta con el equipo INXORA: dirección en Lima, teléfono, correo y canales para soporte y consultas comerciales sobre nuestra plataforma SaaS.",
  },
  [ROUTES.faq]: {
    title: `Preguntas frecuentes · ${brand}`,
    description:
      "Respuestas sobre el uso de la plataforma INXORA, onboarding, integración, planes y soporte para equipos de compras industriales.",
  },
  [ROUTES.cotizaciones]: {
    title: `Solicitar demo · ${brand}`,
    description:
      "Solicita una demo personalizada de INXORA: te mostramos cómo centralizar la gestión de tus proveedores y recuperar la trazabilidad de tus compras.",
  },
  [ROUTES.catalogo]: {
    title: `Funcionalidades · ${brand}`,
    description:
      "Explora las funcionalidades de INXORA: evaluación de proveedores, gestión de contratos, seguimiento de pagos y trazabilidad de compras en un solo panel.",
  },
  [ROUTES.suministros]: {
    title: `Gestión de proveedores · ${brand}`,
    description:
      "INXORA centraliza la gestión de proveedores industriales: evaluaciones, contratos, pagos y trazabilidad de tu cadena de suministro en una sola plataforma.",
  },
  [ROUTES.seguridad]: {
    title: `Seguridad y cumplimiento · ${brand}`,
    description:
      "Gestiona el cumplimiento y los criterios de seguridad de tus proveedores industriales con INXORA: auditoría, trazabilidad y control en un solo panel.",
  },
  [ROUTES.herramientas]: {
    title: `Herramientas de gestión · ${brand}`,
    description:
      "Herramientas de control y seguimiento de proveedores para equipos de compras industriales. Digitaliza tu proceso de abastecimiento con INXORA.",
  },
  [ROUTES.avisoLegal]: {
    title: `Aviso legal · ${brand}`,
    description:
      "Aviso legal del sitio web INXORA: titularidad, uso de la información y limitaciones de responsabilidad.",
  },
  [ROUTES.politicaPrivacidad]: {
    title: `Política de privacidad · ${brand}`,
    description:
      "Política de privacidad INXORA: tratamiento de datos personales conforme a la normativa aplicable en Perú.",
  },
  [ROUTES.politicaCookies]: {
    title: `Política de cookies · ${brand}`,
    description:
      "Uso de cookies y tecnologías similares en inxora.com: finalidades, conservación y cómo gestionar tus preferencias.",
  },
  [ROUTES.terminos]: {
    title: `Términos y condiciones · ${brand}`,
    description:
      "Condiciones generales de uso de la plataforma INXORA y sus servicios de control y seguimiento de proveedores: contratación, precios, responsabilidades y legislación aplicable.",
  },
  [ROUTES.envios]: {
    title: `Política de envíos · ${brand}`,
    description:
      "Política de envíos y entregas de INXORA: condiciones aplicables a los servicios contratados a través de la plataforma.",
  },
  [ROUTES.devoluciones]: {
    title: `Política de devoluciones · ${brand}`,
    description:
      "Política de devoluciones y cancelaciones de INXORA: procedimiento, plazos y condiciones aplicables a los servicios de la plataforma.",
  },
  [ROUTES.libroReclamaciones]: {
    title: `Libro de reclamaciones · ${brand}`,
    description:
      "Libro de reclamaciones virtual INXORA conforme a la Ley N° 29571. Registra tu reclamo o queja de forma segura.",
  },
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

export function getRouteMeta(pathname: string): RouteSeo {
  const key = normalizePath(pathname);
  return ROUTES_META[key] ?? home;
}

export function canonicalUrl(pathname: string): string {
  const path = normalizePath(pathname);
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

/** Alternativas de idioma (?lang=) alineadas con index.html */
export function hreflangUrls(pathname: string): { es: string; en: string; pt: string } {
  const path = normalizePath(pathname);
  if (path === "/") {
    const root = `${SITE_ORIGIN}/`;
    return {
      es: `${root}?lang=es`,
      en: `${root}?lang=en`,
      pt: `${root}?lang=pt`,
    };
  }
  const base = `${SITE_ORIGIN}${path}`;
  return {
    es: `${base}?lang=es`,
    en: `${base}?lang=en`,
    pt: `${base}?lang=pt`,
  };
}
