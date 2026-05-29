import { SITE_ORIGIN } from "../config/site";
import { ROUTES } from "../routes/paths";

export type RouteSeo = {
  title: string;
  description: string;
};

const brand = "INXORA";

const home: RouteSeo = {
  title: `${brand} - Plataforma para compras, ventas y proveedores con IA`,
  description:
    "Plataforma con asistencia inteligente para compras, ventas, proveedores y seguimiento operativo. NIX-IA te ayuda a centralizar tu operación en un solo lugar. Controla. Decide. Crece.",
};

const ROUTES_META: Record<string, RouteSeo> = {
  "/": home,
  [ROUTES.nosotros]: {
    title: `Nosotros · ${brand}`,
    description:
      "Conoce la misión de INXORA: ayudar a las empresas a centralizar compras, ventas, proveedores y seguimiento operativo con una plataforma inteligente impulsada por NIX-IA.",
  },
  [ROUTES.contacto]: {
    title: `Contacto · ${brand}`,
    description:
      "Contacta con el equipo INXORA: WhatsApp +51 946 885 531, correo contacto@inxora.com y canales para soporte y consultas comerciales sobre nuestra plataforma.",
  },
  [ROUTES.faq]: {
    title: `Preguntas frecuentes · ${brand}`,
    description:
      "Respuestas sobre cómo usar INXORA: compras, ventas, proveedores, seguimiento operativo, NIX-IA, planes y soporte para tu equipo.",
  },
  [ROUTES.cotizaciones]: {
    title: `Solicitar demo · ${brand}`,
    description:
      "Solicita una demo personalizada de INXORA y descubre cómo organizar compras, ventas, proveedores y seguimiento en una sola plataforma con NIX-IA.",
  },
  [ROUTES.catalogo]: {
    title: `Funcionalidades · ${brand}`,
    description:
      "Explora las funcionalidades de INXORA: compras y cotizaciones, ventas y clientes, gestión de proveedores, seguimiento operativo y NIX-IA, tu asistente inteligente.",
  },
  [ROUTES.suministros]: {
    title: `Gestión de proveedores · ${brand}`,
    description:
      "INXORA centraliza la gestión de proveedores: evaluación, cotizaciones, órdenes y seguimiento, todo en una plataforma con asistencia inteligente.",
  },
  [ROUTES.seguridad]: {
    title: `Seguridad y cumplimiento · ${brand}`,
    description:
      "Seguridad y trazabilidad en INXORA: compliance, datos protegidos, control de roles y seguimiento de cada acción en tiempo real.",
  },
  [ROUTES.herramientas]: {
    title: `Herramientas de gestión · ${brand}`,
    description:
      "Herramientas para organizar tu operación: compras, ventas, proveedores y seguimiento, con NIX-IA como asistente inteligente.",
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
