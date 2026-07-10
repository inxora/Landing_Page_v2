import type { Language } from "../types/language";

export type PricingFeatureIcon = "check" | "dash" | "star";

export type PricingFeature = {
  text: string;
  icon: PricingFeatureIcon;
  badge?: string;
};

export type PricingGroup = {
  title: string;
  items: PricingFeature[];
};

export type PricingCycle = {
  price:  string;   // Ej: "$53" o "$583"
  period: string;   // Ej: "/ mes  (S/ 180)"
};

export type PricingPlanData = {
  name: string;
  /* Precios por ciclo — el toggle Mensual/Anual del componente elige
     cuál renderizar. Regla: annual = monthly × 11 (1 mes gratis). */
  monthly: PricingCycle;
  annual:  PricingCycle;
  description: string;
  popularLabel?: string;
  enterpriseBadge?: string;
  groups: PricingGroup[];
  /* Ítem de implementación — se pinta al final del último grupo y
     cambia según el ciclo activo: mensual muestra el precio único,
     anual muestra que está incluido. */
  implementation: {
    monthly: PricingFeature;
    annual:  PricingFeature;
  };
  cta: string;
};

export type PricingBillingLabels = {
  monthly: string;
  annual:  string;
  /** Ej: "Ahorra 1 mes" — chip al lado del toggle Anual. */
  annualHint: string;
};

export type PricingSectionCopy = {
  kicker: string;
  title: string;
  lede: string;
  billing: PricingBillingLabels;
  /* N planes. Hoy son 2 activos (Start / Growth). Al sumar Scale u
     otros, extender el array — el componente `pricing-section.tsx`
     itera por `plans.length` y centra automáticamente. */
  plans: PricingPlanData[];
};

const es: PricingSectionCopy = {
  kicker: "Planes",
  title: "Elige el plan que encaja con tu operación",
  lede: "Precios en USD (equivalente en soles al costado). Todos incluyen IGV.",
  billing: {
    monthly:    "Mensual",
    annual:     "Anual",
    annualHint: "1 mes gratis",
  },
  plans: [
    {
      name: "Start",
      monthly: { price: "$53",  period: "/ mes  (S/ 180)"   },
      annual:  { price: "$583", period: "/ año  (S/ 1,980)" },
      description:
        "Personalización operativa para arrancar con ventas, compras, inventario y caja.",
      groups: [
        {
          title: "Acceso y usuarios",
          items: [
            { text: "5 usuarios", icon: "check", badge: "máx" },
            { text: "Personalización operativa", icon: "check" },
          ],
        },
        {
          title: "Módulos incluidos",
          items: [
            { text: "Ventas y compras", icon: "check" },
            { text: "Inventario y caja", icon: "check" },
            { text: "Facturación electrónica", icon: "check" },
            { text: "Catálogo de productos + proveedores", icon: "check" },
          ],
        },
        {
          title: "Soporte",
          items: [
            { text: "Soporte por email", icon: "check" },
          ],
        },
      ],
      implementation: {
        monthly: { text: "Implementación: $53 (S/ 180) único", icon: "dash" },
        annual:  { text: "Sin costo de implementación",         icon: "star" },
      },
      cta: "Empezar con Start",
    },
    {
      name: "Growth",
      monthly: { price: "$104",   period: "/ mes  (S/ 354)"   },
      annual:  { price: "$1,144", period: "/ año  (S/ 3,894)" },
      description:
        "Indicadores comerciales, logística y seguimiento para equipos que ya están operando y necesitan analítica.",
      popularLabel: "Más popular",
      groups: [
        {
          title: "Acceso y usuarios",
          items: [
            { text: "8 usuarios", icon: "check", badge: "máx" },
            { text: "Roles y permisos avanzados", icon: "check" },
          ],
        },
        {
          title: "Módulos incluidos",
          items: [
            { text: "Todo lo de Start", icon: "check" },
            { text: "Logística y seguimiento", icon: "star" },
            { text: "Reportes y análisis", icon: "star" },
            { text: "Indicadores comerciales", icon: "star" },
          ],
        },
        {
          title: "Soporte",
          items: [
            { text: "Soporte prioritario", icon: "check" },
          ],
        },
      ],
      implementation: {
        monthly: { text: "Implementación: $104 (S/ 354) único", icon: "dash" },
        annual:  { text: "Sin costo de implementación",          icon: "star" },
      },
      cta: "Empezar con Growth",
    },
  ],
};

const en: PricingSectionCopy = {
  kicker: "Plans",
  title: "Pick the plan that fits your operation",
  lede: "Prices in USD (local Sol equivalent alongside). VAT included.",
  billing: {
    monthly:    "Monthly",
    annual:     "Annual",
    annualHint: "1 month free",
  },
  plans: [
    {
      name: "Start",
      monthly: { price: "$53",  period: "/ mo  (S/ 180)"   },
      annual:  { price: "$583", period: "/ yr  (S/ 1,980)" },
      description:
        "Operational setup to run sales, purchases, inventory and cash.",
      groups: [
        {
          title: "Access & users",
          items: [
            { text: "5 users", icon: "check", badge: "max" },
            { text: "Operational customization", icon: "check" },
          ],
        },
        {
          title: "Included modules",
          items: [
            { text: "Sales & purchases", icon: "check" },
            { text: "Inventory & cash", icon: "check" },
            { text: "Electronic invoicing", icon: "check" },
            { text: "Product & supplier catalog", icon: "check" },
          ],
        },
        {
          title: "Support",
          items: [
            { text: "Email support", icon: "check" },
          ],
        },
      ],
      implementation: {
        monthly: { text: "Setup: $53 (S/ 180) one-off", icon: "dash" },
        annual:  { text: "Setup included",              icon: "star" },
      },
      cta: "Start with Start",
    },
    {
      name: "Growth",
      monthly: { price: "$104",   period: "/ mo  (S/ 354)"   },
      annual:  { price: "$1,144", period: "/ yr  (S/ 3,894)" },
      description:
        "Commercial KPIs, logistics tracking, and reporting for teams already operating and needing analytics.",
      popularLabel: "Most popular",
      groups: [
        {
          title: "Access & users",
          items: [
            { text: "8 users", icon: "check", badge: "max" },
            { text: "Advanced roles & permissions", icon: "check" },
          ],
        },
        {
          title: "Included modules",
          items: [
            { text: "Everything in Start", icon: "check" },
            { text: "Logistics & tracking", icon: "star" },
            { text: "Reports & analytics", icon: "star" },
            { text: "Commercial KPIs", icon: "star" },
          ],
        },
        {
          title: "Support",
          items: [
            { text: "Priority support", icon: "check" },
          ],
        },
      ],
      implementation: {
        monthly: { text: "Setup: $104 (S/ 354) one-off", icon: "dash" },
        annual:  { text: "Setup included",               icon: "star" },
      },
      cta: "Start with Growth",
    },
  ],
};

const pt: PricingSectionCopy = {
  kicker: "Planos",
  title: "Escolha o plano que combina com sua operação",
  lede: "Preços em USD (equivalente em soles ao lado). Incluem ICMS/VAT.",
  billing: {
    monthly:    "Mensal",
    annual:     "Anual",
    annualHint: "1 mês grátis",
  },
  plans: [
    {
      name: "Start",
      monthly: { price: "$53",  period: "/ mês  (S/ 180)"   },
      annual:  { price: "$583", period: "/ ano  (S/ 1,980)" },
      description:
        "Configuração operacional para começar com vendas, compras, estoque e caixa.",
      groups: [
        {
          title: "Acesso e usuários",
          items: [
            { text: "5 usuários", icon: "check", badge: "máx" },
            { text: "Personalização operacional", icon: "check" },
          ],
        },
        {
          title: "Módulos inclusos",
          items: [
            { text: "Vendas e compras", icon: "check" },
            { text: "Estoque e caixa", icon: "check" },
            { text: "Faturamento eletrônico", icon: "check" },
            { text: "Catálogo de produtos e fornecedores", icon: "check" },
          ],
        },
        {
          title: "Suporte",
          items: [
            { text: "Suporte por e-mail", icon: "check" },
          ],
        },
      ],
      implementation: {
        monthly: { text: "Implantação: $53 (S/ 180) único", icon: "dash" },
        annual:  { text: "Implantação incluída",             icon: "star" },
      },
      cta: "Começar com Start",
    },
    {
      name: "Growth",
      monthly: { price: "$104",   period: "/ mês  (S/ 354)"   },
      annual:  { price: "$1,144", period: "/ ano  (S/ 3,894)" },
      description:
        "KPIs comerciais, logística e relatórios para equipes já em operação que precisam de analítica.",
      popularLabel: "Mais popular",
      groups: [
        {
          title: "Acesso e usuários",
          items: [
            { text: "8 usuários", icon: "check", badge: "máx" },
            { text: "Perfis e permissões avançados", icon: "check" },
          ],
        },
        {
          title: "Módulos inclusos",
          items: [
            { text: "Tudo do Start", icon: "check" },
            { text: "Logística e rastreamento", icon: "star" },
            { text: "Relatórios e análises", icon: "star" },
            { text: "KPIs comerciais", icon: "star" },
          ],
        },
        {
          title: "Suporte",
          items: [
            { text: "Suporte prioritário", icon: "check" },
          ],
        },
      ],
      implementation: {
        monthly: { text: "Implantação: $104 (S/ 354) único", icon: "dash" },
        annual:  { text: "Implantação incluída",              icon: "star" },
      },
      cta: "Começar com Growth",
    },
  ],
};

export const pricingSectionCopy: Record<Language, PricingSectionCopy> = {
  es,
  en,
  pt,
};
