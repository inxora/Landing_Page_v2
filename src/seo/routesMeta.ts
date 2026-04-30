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
      "Conoce la misión de INXORA: digitalizar el abastecimiento industrial en Perú y Latinoamérica con tecnología, logística y soporte técnico especializado.",
  },
  [ROUTES.contacto]: {
    title: `Contacto · ${brand}`,
    description:
      "Datos de contacto INXORA: dirección en Lima, teléfono, correo y canales para cotizaciones, soporte y consultas comerciales.",
  },
  [ROUTES.faq]: {
    title: `Preguntas frecuentes · ${brand}`,
    description:
      "Respuestas sobre cotizaciones, envíos, pagos, garantías y uso de la plataforma industrial INXORA.",
  },
  [ROUTES.cotizaciones]: {
    title: `Cotizaciones industriales · ${brand}`,
    description:
      "Solicita cotización de suministros industriales: proceso rápido, comparación de opciones y acompañamiento del equipo INXORA.",
  },
  [ROUTES.catalogo]: {
    title: `Catálogo de productos industriales · ${brand}`,
    description:
      "Explora el catálogo INXORA: electricidad, herramientas, seguridad, neumática, iluminación y más líneas para tu operación.",
  },
  [ROUTES.suministros]: {
    title: `Suministros industriales · ${brand}`,
    description:
      "Soluciones de abastecimiento industrial: categorías, marcas líderes y entrega trazable con INXORA.",
  },
  [ROUTES.seguridad]: {
    title: `Seguridad industrial y EPP · ${brand}`,
    description:
      "Equipos y elementos de protección personal, señalización y soluciones de seguridad industrial disponibles vía INXORA.",
  },
  [ROUTES.herramientas]: {
    title: `Herramientas y equipos de trabajo · ${brand}`,
    description:
      "Herramientas manuales y eléctricas, mediciones y equipos para taller y planta. Consulta disponibilidad en INXORA.",
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
    title: `Envíos y entregas · ${brand}`,
    description:
      "Información sobre cobertura de envíos, tiempos orientativos y seguimiento de pedidos INXORA en Perú.",
  },
  [ROUTES.devoluciones]: {
    title: `Devoluciones y garantías · ${brand}`,
    description:
      "Procedimiento de devoluciones, plazos y condiciones de garantía para compras realizadas a través de INXORA.",
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
