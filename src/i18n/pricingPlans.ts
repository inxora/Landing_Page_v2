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

export type PricingPlanData = {
  name: string;
  price: string;
  period: string;
  description: string;
  popularLabel?: string;
  enterpriseBadge?: string;
  groups: PricingGroup[];
  cta: string;
};

export type PricingSectionCopy = {
  kicker: string;
  title: string;
  lede: string;
  plans: [PricingPlanData, PricingPlanData, PricingPlanData];
};

const es: PricingSectionCopy = {
  kicker: "Planes",
  title: "Elige el plan que encaja con tu operación",
  lede: "Precios orientativos en USD. Escala cuando tu equipo crezca.",
  plans: [
    {
      name: "Básico",
      price: "$99",
      period: "/ mes",
      description:
        "Para equipos pequeños que inician su gestión de compras industriales.",
      groups: [
        {
          title: "Acceso y usuarios",
          items: [
            { text: "2 usuarios", icon: "check", badge: "máx" },
            { text: "20 proveedores activos", icon: "check", badge: "máx" },
            { text: "Roles admin / comprador", icon: "check" },
          ],
        },
        {
          title: "Módulos",
          items: [
            { text: "15 cotizaciones / mes", icon: "check", badge: "límite" },
            { text: "10 solicitudes / mes", icon: "check", badge: "límite" },
            { text: "5 órdenes de compra / mes", icon: "check", badge: "límite" },
            { text: "Dashboard básico", icon: "check" },
            { text: "Catálogo de productos", icon: "check" },
            { text: "Análisis avanzado", icon: "dash" },
          ],
        },
        {
          title: "IA y soporte",
          items: [
            { text: "Sara Xora (asistente IA)", icon: "dash" },
            { text: "Chat con asesores INXORA", icon: "dash" },
            { text: "Soporte por email", icon: "check" },
          ],
        },
      ],
      cta: "Empezar básico",
    },
    {
      name: "Pro",
      price: "$249",
      period: "/ mes",
      description:
        "Para empresas en crecimiento con flujos de compra frecuentes y equipos activos.",
      popularLabel: "Más popular",
      groups: [
        {
          title: "Acceso y usuarios",
          items: [
            { text: "8 usuarios", icon: "check", badge: "máx" },
            { text: "100 proveedores activos", icon: "check", badge: "máx" },
            { text: "Roles admin / comprador", icon: "check" },
          ],
        },
        {
          title: "Módulos",
          items: [
            { text: "Cotizaciones ilimitadas", icon: "check" },
            { text: "Solicitudes ilimitadas", icon: "check" },
            { text: "Órdenes ilimitadas", icon: "check" },
            { text: "Dashboard completo + KPIs", icon: "check" },
            { text: "Análisis básico (gasto, categorías)", icon: "check" },
          ],
        },
        {
          title: "IA y soporte",
          items: [
            { text: "Sara Xora", icon: "star", badge: "300 consultas/mes" },
            { text: "Chat con asesores INXORA", icon: "star" },
            { text: "Soporte prioritario (48h)", icon: "check" },
          ],
        },
      ],
      cta: "Empezar Pro",
    },
    {
      name: "Enterprise",
      price: "$599",
      period: "/ mes",
      description:
        "Para operaciones industriales con múltiples equipos, países y volúmenes altos.",
      enterpriseBadge: "Enterprise",
      groups: [
        {
          title: "Acceso y usuarios",
          items: [
            { text: "Usuarios ilimitados", icon: "check" },
            { text: "Proveedores ilimitados", icon: "check" },
            { text: "Soporte multipaís / multimoneda", icon: "check" },
          ],
        },
        {
          title: "Módulos",
          items: [
            { text: "Todo ilimitado", icon: "check" },
            { text: "Análisis avanzado (top proveedores, ROI)", icon: "check" },
            { text: "Acceso API + webhooks", icon: "check" },
            { text: "Historial de precios + auditoría", icon: "check" },
          ],
        },
        {
          title: "IA y soporte",
          items: [
            { text: "Sara Xora ilimitada", icon: "star" },
            { text: "Asesor INXORA dedicado", icon: "star" },
            { text: "Soporte 24/7 + onboarding", icon: "check" },
          ],
        },
      ],
      cta: "Hablar con ventas",
    },
  ],
};

const en: PricingSectionCopy = {
  kicker: "Plans",
  title: "Pick the plan that fits your operation",
  lede: "Indicative prices in USD. Scale as your team grows.",
  plans: [
    {
      name: "Basic",
      price: "$99",
      period: "/ month",
      description: "For small teams starting structured industrial procurement.",
      groups: [
        {
          title: "Access & users",
          items: [
            { text: "2 users", icon: "check", badge: "max" },
            { text: "20 active suppliers", icon: "check", badge: "max" },
            { text: "Admin / buyer roles", icon: "check" },
          ],
        },
        {
          title: "Modules",
          items: [
            { text: "15 quotes / month", icon: "check", badge: "limit" },
            { text: "10 requests / month", icon: "check", badge: "limit" },
            { text: "5 purchase orders / month", icon: "check", badge: "limit" },
            { text: "Basic dashboard", icon: "check" },
            { text: "Product catalog", icon: "check" },
            { text: "Advanced analytics", icon: "dash" },
          ],
        },
        {
          title: "AI & support",
          items: [
            { text: "Sara Xora (AI assistant)", icon: "dash" },
            { text: "Chat with INXORA advisors", icon: "dash" },
            { text: "Email support", icon: "check" },
          ],
        },
      ],
      cta: "Start on Basic",
    },
    {
      name: "Pro",
      price: "$249",
      period: "/ month",
      description: "For growing companies with frequent buying flows and active teams.",
      popularLabel: "Most popular",
      groups: [
        {
          title: "Access & users",
          items: [
            { text: "8 users", icon: "check", badge: "max" },
            { text: "100 active suppliers", icon: "check", badge: "max" },
            { text: "Admin / buyer roles", icon: "check" },
          ],
        },
        {
          title: "Modules",
          items: [
            { text: "Unlimited quotes", icon: "check" },
            { text: "Unlimited requests", icon: "check" },
            { text: "Unlimited orders", icon: "check" },
            { text: "Full dashboard + KPIs", icon: "check" },
            { text: "Basic analytics (spend, categories)", icon: "check" },
          ],
        },
        {
          title: "AI & support",
          items: [
            { text: "Sara Xora", icon: "star", badge: "300 queries/mo" },
            { text: "Chat with INXORA advisors", icon: "star" },
            { text: "Priority support (48h)", icon: "check" },
          ],
        },
      ],
      cta: "Start on Pro",
    },
    {
      name: "Enterprise",
      price: "$599",
      period: "/ month",
      description:
        "For industrial operations with multiple teams, countries, and high volumes.",
      enterpriseBadge: "Enterprise",
      groups: [
        {
          title: "Access & users",
          items: [
            { text: "Unlimited users", icon: "check" },
            { text: "Unlimited suppliers", icon: "check" },
            { text: "Multi-country / multi-currency", icon: "check" },
          ],
        },
        {
          title: "Modules",
          items: [
            { text: "Everything unlimited", icon: "check" },
            { text: "Advanced analytics (top suppliers, ROI)", icon: "check" },
            { text: "API access + webhooks", icon: "check" },
            { text: "Price history + audit trail", icon: "check" },
          ],
        },
        {
          title: "AI & support",
          items: [
            { text: "Unlimited Sara Xora", icon: "star" },
            { text: "Dedicated INXORA advisor", icon: "star" },
            { text: "24/7 support + onboarding", icon: "check" },
          ],
        },
      ],
      cta: "Talk to sales",
    },
  ],
};

const pt: PricingSectionCopy = {
  kicker: "Planos",
  title: "Escolha o plano que combina com sua operação",
  lede: "Preços indicativos em USD. Escale conforme o time cresce.",
  plans: [
    {
      name: "Básico",
      price: "$99",
      period: "/ mês",
      description:
        "Para equipes pequenas que começam a gestão de compras industriais.",
      groups: [
        {
          title: "Acesso e usuários",
          items: [
            { text: "2 usuários", icon: "check", badge: "máx" },
            { text: "20 fornecedores ativos", icon: "check", badge: "máx" },
            { text: "Perfis admin / comprador", icon: "check" },
          ],
        },
        {
          title: "Módulos",
          items: [
            { text: "15 cotações / mês", icon: "check", badge: "limite" },
            { text: "10 solicitações / mês", icon: "check", badge: "limite" },
            { text: "5 ordens de compra / mês", icon: "check", badge: "limite" },
            { text: "Dashboard básico", icon: "check" },
            { text: "Catálogo de produtos", icon: "check" },
            { text: "Análise avançada", icon: "dash" },
          ],
        },
        {
          title: "IA e suporte",
          items: [
            { text: "Sara Xora (assistente IA)", icon: "dash" },
            { text: "Chat com assessores INXORA", icon: "dash" },
            { text: "Suporte por e-mail", icon: "check" },
          ],
        },
      ],
      cta: "Começar no Básico",
    },
    {
      name: "Pro",
      price: "$249",
      period: "/ mês",
      description:
        "Para empresas em crescimento com fluxos de compra frequentes e equipes ativas.",
      popularLabel: "Mais popular",
      groups: [
        {
          title: "Acesso e usuários",
          items: [
            { text: "8 usuários", icon: "check", badge: "máx" },
            { text: "100 fornecedores ativos", icon: "check", badge: "máx" },
            { text: "Perfis admin / comprador", icon: "check" },
          ],
        },
        {
          title: "Módulos",
          items: [
            { text: "Cotações ilimitadas", icon: "check" },
            { text: "Solicitações ilimitadas", icon: "check" },
            { text: "Ordens ilimitadas", icon: "check" },
            { text: "Dashboard completo + KPIs", icon: "check" },
            { text: "Análise básica (gasto, categorias)", icon: "check" },
          ],
        },
        {
          title: "IA e suporte",
          items: [
            { text: "Sara Xora", icon: "star", badge: "300 consultas/mês" },
            { text: "Chat com assessores INXORA", icon: "star" },
            { text: "Suporte prioritário (48h)", icon: "check" },
          ],
        },
      ],
      cta: "Começar no Pro",
    },
    {
      name: "Enterprise",
      price: "$599",
      period: "/ mês",
      description:
        "Para operações industriais com várias equipes, países e volumes altos.",
      enterpriseBadge: "Enterprise",
      groups: [
        {
          title: "Acesso e usuários",
          items: [
            { text: "Usuários ilimitados", icon: "check" },
            { text: "Fornecedores ilimitados", icon: "check" },
            { text: "Multipaís / multimoneda", icon: "check" },
          ],
        },
        {
          title: "Módulos",
          items: [
            { text: "Tudo ilimitado", icon: "check" },
            { text: "Análise avançada (top fornecedores, ROI)", icon: "check" },
            { text: "Acesso API + webhooks", icon: "check" },
            { text: "Histórico de preços + auditoria", icon: "check" },
          ],
        },
        {
          title: "IA e suporte",
          items: [
            { text: "Sara Xora ilimitada", icon: "star" },
            { text: "Assessor INXORA dedicado", icon: "star" },
            { text: "Suporte 24/7 + onboarding", icon: "check" },
          ],
        },
      ],
      cta: "Falar com vendas",
    },
  ],
};

export const pricingSectionCopy: Record<Language, PricingSectionCopy> = {
  es,
  en,
  pt,
};
