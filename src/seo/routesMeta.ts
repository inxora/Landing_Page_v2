import { SITE_ORIGIN } from "../config/site";
import { ROUTES } from "../routes/paths";

export type RouteSeo = {
  title: string;
  description: string;
};

const brand = "INXORA";

const home: RouteSeo = {
  title: `${brand} - ERP de Compras, Inventario, Ventas y Finanzas`,
  description:
    "INXORA es el ERP en la nube para empresas industriales: centraliza compras y proveedores, inventario y almacenes, ventas, facturación electrónica y finanzas en un solo panel. Automatiza cotizaciones con IA.",
};

const ROUTES_META: Record<string, RouteSeo> = {
  "/": home,
  [ROUTES.nosotros]: {
    title: `Nosotros · ${brand}`,
    description:
      "Conoce la misión de INXORA: digitalizar la gestión empresarial de la industria en Perú y Latinoamérica con un ERP en la nube para compras, inventario, ventas y finanzas.",
  },
  [ROUTES.contacto]: {
    title: `Contacto · ${brand}`,
    description:
      "Contacta con el equipo INXORA: dirección en Lima, teléfono, correo y canales para soporte y consultas comerciales sobre nuestro ERP en la nube.",
  },
  [ROUTES.faq]: {
    title: `Preguntas frecuentes · ${brand}`,
    description:
      "Respuestas sobre el ERP INXORA: onboarding, integración, módulos de compras, inventario, ventas y finanzas, planes y soporte para empresas industriales.",
  },
  [ROUTES.cotizaciones]: {
    title: `Solicitar demo · ${brand}`,
    description:
      "Solicita una demo personalizada de INXORA: te mostramos cómo gestionar compras, proveedores, inventario, ventas, facturación y finanzas en una sola plataforma.",
  },
  [ROUTES.catalogo]: {
    title: `Funcionalidades · ${brand}`,
    description:
      "Explora las funcionalidades del ERP INXORA: compras y proveedores, inventario y almacenes, ventas, facturación electrónica, cuentas por cobrar y pagar, y analítica en un solo panel.",
  },
  [ROUTES.suministros]: {
    title: `Gestión de proveedores · ${brand}`,
    description:
      "INXORA centraliza la gestión de proveedores y compras industriales: evaluación, cotizaciones, órdenes de compra y trazabilidad, integrado con inventario y finanzas en un ERP.",
  },
  [ROUTES.seguridad]: {
    title: `Seguridad y cumplimiento · ${brand}`,
    description:
      "Gestiona el cumplimiento y los criterios de seguridad de tus proveedores industriales con el ERP INXORA: auditoría, trazabilidad y control en un solo panel.",
  },
  [ROUTES.herramientas]: {
    title: `Herramientas de gestión · ${brand}`,
    description:
      "Herramientas de gestión empresarial para la industria: compras, inventario, ventas y finanzas. Digitaliza tus operaciones con el ERP INXORA.",
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
