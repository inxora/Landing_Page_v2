import type { Language } from "../types/language";
import type { ExcelCtaCopy } from "./excelCtaCopy";
import { excelCtaCopy } from "./excelCtaCopy";
import type { PricingSectionCopy } from "./pricingPlans";
import { pricingSectionCopy } from "./pricingPlans";

export type AdvantagePillarCopy = {
  title: string;
  bullets: string[];
};

export type ProcessStepCopy = {
  title: string;
  subtitle: string;
};

export type LandingCopy = {
  header: {
    navVentajas: string;
    navPasos: string;
    navProveedores: string;
    navRespaldados: string;
    navPlanes: string;
    navDemo: string;
    navTienda: string;
    requestQuote: string;
    langAria: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    h1Line1: string;
    h1Em: string;
    sub: string;
    ctaSubscribe: string;
    ctaDemo: string;
    play: string;
  };
  trusted: {
    title: string;
  };
  advantages: {
    kicker: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lede: string;
    pillars: [AdvantagePillarCopy, AdvantagePillarCopy, AdvantagePillarCopy];
  };
  process: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    ledeLine1: string;
    ledeLine2: string;
    steps: [ProcessStepCopy, ProcessStepCopy, ProcessStepCopy, ProcessStepCopy];
    ctaQuote: string;
  };
  suppliers: {
    kicker: string;
    title: string;
    lede: string;
    ctaSupplier: string;
  };
  recognitions: {
    kicker: string;
    title: string;
    lede: string;
  };
  pricing: PricingSectionCopy;
  excelCta: ExcelCtaCopy;
  assistance: {
    label: string;
    chatTitle: string;
    chatSubtitle: string;
    inputPlaceholder: string;
    sendAria: string;
    attachAria: string;
    closeAria: string;
    openChatAria: string;
    disclaimer: string;
    typing: string;
    errorGeneric: string;
    error422: string;
    gatewayError: string;
  };
  footer: {
    slogan: string;
    navEmpresa: string;
    navCategorias: string;
    navEnlaces: string;
    linkNosotros: string;
    linkContacto: string;
    linkFaq: string;
    linkCotizaciones: string;
    linkCatalogo: string;
    linkSuministros: string;
    linkSeguridad: string;
    linkHerramientas: string;
    linkAviso: string;
    linkPrivacidad: string;
    linkCookies: string;
    linkTerminos: string;
    linkEnvios: string;
    linkDevoluciones: string;
    libroAlt: string;
    mapIframeTitle: string;
    mapOpenGoogle: string;
    rights: string;
    developedBy: string;
    developedAccent: string;
  };
};

export const landingTranslations: Record<Language, LandingCopy> = {
  es: {
    header: {
      navVentajas: "Ventajas",
      navPasos: "Paso a paso",
      navProveedores: "Proveedores",
      navRespaldados: "Respaldados",
      navPlanes: "Planes",
      navDemo: "Demo",
      navTienda: "Tienda",
      requestQuote: "Solicita una Demo",
      langAria: "Seleccionar idioma",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      h1Line1: "Control total sobre tus proveedores",
      h1Em: "Sin Excel, sin riesgos ocultos.",
      sub: "INXORA es tu software de control y seguimiento de proveedores. Centraliza evaluaciones, contratos y pagos en un solo panel. Recupera la trazabilidad de tu cadena de suministro hoy.",
      ctaSubscribe: "Suscríbete",
      ctaDemo: "Solicita una demo",
      play: "Ver el producto en 60 s",
    },
    trusted: {
      title: "Confían en nosotros para su abastecimiento",
    },
    advantages: {
      kicker: "Ventajas de Inxora",
      titleBefore: "Somos la ",
      titleHighlight: "solución",
      titleAfter: " más inteligente para tus compras industriales",
      lede:
        "Todo en un solo panel con las 3T: Transparencia, Trazabilidad, Tranquilidad.",
      pillars: [
        {
          title: "Transparencia",
          bullets: [
            "Tableros y reportes: gasto, categorías y negocio en un solo vistazo —decisiones con datos, no con Excel suelto—.",
            "KPIs de compra alineados a tu operación: base única, sin cifras duplicadas ni versiones en paralelo.",
            "Más visibilidad para liderar: de la requisición al proveedor, sin puntos ciegos.",
          ],
        },
        {
          title: "Trazabilidad",
          bullets: [
            "Ciclos más cortos en la ruta de solicitud a OC: menos fricción entre equipos, más claridad (referencia: hasta −42% en tiempo de ciclo con equipos acompañados).",
            "Cada paso con autor y registro: trazabilidad auditable, sin “se perdió en el correo”.",
            "Seguimiento de corte, recepción y versiones: de la requisición al proveedor con historial completo.",
          ],
        },
        {
          title: "Tranquilidad",
          bullets: [
            "Más proveedores evaluados con el mismo equipo: mayor cobertura sin aumentar plantilla (hasta +3,2× de evaluación en referencias de implementación).",
            "Indicadores y ahorro comparativo en el panel: deja de consolidar a mano.",
            "Puesta en marcha en semanas, no en trimestres: onboarding, datos y formación con referencia típica de go-live alrededor de 30 días.",
          ],
        },
      ],
    },
    process: {
      kicker: "Nuestro paso a paso",
      headlineLine1: "Comienza ahora",
      headlineLine2: "y pide tu producto en Inxora",
      ledeLine1:
        "Tenemos un proceso simple y eficiente para obtener los suministros industriales",
      ledeLine2: "que tu empresa necesita",
      steps: [
        { title: "Cotiza con Sara", subtitle: "En minutos" },
        { title: "Confirma tu pedido", subtitle: "Al instante" },
        { title: "Envío y pago", subtitle: "Seguro" },
        { title: "Soporte técnico", subtitle: "Constante" },
      ],
      ctaQuote: "Cotizar ahora",
    },
    suppliers: {
      kicker: "Nuestros proveedores",
      title: "Trabajando con proveedores de confianza internacional",
      lede: "Trabajamos con los mejores fabricantes y distribuidores de la industria para garantizar productos de alta calidad.",
      ctaSupplier: "Volverme proveedor",
    },
    recognitions: {
      kicker: "Reconocimientos",
      title: "Respaldados por el ecosistema de innovación del Perú y del mundo",
      lede: "Inxora es impulsada por instituciones que validan nuestro compromiso con la transformación digital y la excelencia operativa en el sector industrial.",
    },
    pricing: pricingSectionCopy.es,
    excelCta: excelCtaCopy.es,
    assistance: {
      label: "Estoy lista para ayudarte",
      chatTitle: "Sara Xora",
      chatSubtitle: "Asistente virtual",
      inputPlaceholder: "Escribe algo…",
      sendAria: "Enviar mensaje",
      attachAria: "Adjuntar imagen",
      closeAria: "Cerrar asistente",
      openChatAria: "Abrir chat con Sara Xora",
      disclaimer:
        "Sara puede cometer errores. Verifica la información importante.",
      typing: "Sara está escribiendo…",
      errorGeneric: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      error422:
        "Solo imágenes JPEG, PNG o WebP (máx. 5 archivos, 5 MB cada una).",
      gatewayError:
        "La solicitud tardó demasiado. Inténtalo de nuevo. Si enviaste una imagen, prueba con una más pequeña o sin imagen.",
    },
    footer: {
      slogan:
        "Tu socio estratégico en suministros industriales y equipos de seguridad.",
      navEmpresa: "Empresa",
      navCategorias: "Categorías",
      navEnlaces: "Enlaces útiles",
      linkNosotros: "Nosotros",
      linkContacto: "Contacto",
      linkFaq: "FAQ",
      linkCotizaciones: "Cotizaciones",
      linkCatalogo: "Catálogo",
      linkSuministros: "Suministros",
      linkSeguridad: "Seguridad",
      linkHerramientas: "Herramientas",
      linkAviso: "Aviso legal",
      linkPrivacidad: "Política de privacidad",
      linkCookies: "Política de cookies",
      linkTerminos: "Términos y condiciones",
      linkEnvios: "Envíos",
      linkDevoluciones: "Devoluciones",
      libroAlt: "Libro de reclamaciones",
      mapIframeTitle: "Mapa de la oficina INXORA en Lima",
      mapOpenGoogle: "Abrir en Google Maps",
      rights: "Todos los derechos reservados.",
      developedBy: "Desarrollado por",
      developedAccent: "INXORA",
    },
  },

  en: {
    header: {
      navVentajas: "Advantages",
      navPasos: "Step by step",
      navProveedores: "Suppliers",
      navRespaldados: "Recognition",
      navPlanes: "Plans",
      navDemo: "Demo",
      navTienda: "Store",
      requestQuote: "Request a Demo",
      langAria: "Select language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      h1Line1: "Total control of your industrial suppliers",
      h1Em: "No spreadsheets. No hidden risks.",
      sub: "INXORA is your supplier control and tracking software. Centralize assessments, contracts, and payments in one place—and restore end-to-end traceability across your supply chain.",
      ctaSubscribe: "Subscribe",
      ctaDemo: "Get a quick demo",
      play: "60-second product tour",
    },
    trusted: {
      title: "They trust us for their supply chain",
    },
    advantages: {
      kicker: "INXORA advantages",
      titleBefore: "We are the smartest ",
      titleHighlight: "solution",
      titleAfter: " for your industrial purchases",
      lede:
        "Everything in one place with the 3T: Transparency, Traceability, Peace of mind.",
      pillars: [
        {
          title: "Transparency",
          bullets: [
            "Dashboards and reports: spend, categories, and operations in one place—data-led decisions, not flying spreadsheets.",
            "Procurement KPIs aligned to your business: one source of truth without duplicate numbers.",
            "Clear line of sight from request to vendor for leadership.",
          ],
        },
        {
          title: "Traceability",
          bullets: [
            "Shorter paths from request to purchase order: less friction, clearer handoffs (illustrative: up to ~42% PO cycle time improvement on supported rollouts).",
            "Each step with ownership and timestamps: auditable traceability instead of “lost in email.”",
            "Track cutoffs, receipt, and revisions with full history on every event.",
          ],
        },
        {
          title: "Peace of mind",
          bullets: [
            "More vendors vetted with the same team: broader coverage without headcount (illustrative: up to ~3.2× evaluation coverage in reference scenarios).",
            "Comparative savings and metrics in the panel—less manual consolidation.",
            "Go-lives in weeks, not quarters: onboarding, data, and training, with a typical go-live in the ~30-day range.",
          ],
        },
      ],
    },
    process: {
      kicker: "Our step-by-step process",
      headlineLine1: "Start today",
      headlineLine2: "and order through Inxora",
      ledeLine1:
        "A simple, efficient process to get the industrial supplies",
      ledeLine2: "your business needs",
      steps: [
        { title: "Quote with Sara", subtitle: "In minutes" },
        { title: "Confirm your order", subtitle: "Instantly" },
        { title: "Shipping & payment", subtitle: "Secure" },
        { title: "Technical support", subtitle: "Always on" },
      ],
      ctaQuote: "Quote now",
    },
    suppliers: {
      kicker: "Our suppliers",
      title: "Working with trusted international partners",
      lede: "We partner with leading manufacturers and distributors to deliver high-quality products.",
      ctaSupplier: "Become a supplier",
    },
    recognitions: {
      kicker: "Recognition",
      title: "Backed by the innovation ecosystem of Peru and the world",
      lede: "Inxora is driven by institutions that validate our commitment to digital transformation and operational excellence in the industrial sector.",
    },
    pricing: pricingSectionCopy.en,
    excelCta: excelCtaCopy.en,
    assistance: {
      label: "I’m ready to help you",
      chatTitle: "Sara Xora",
      chatSubtitle: "Virtual assistant",
      inputPlaceholder: "Type a message…",
      sendAria: "Send message",
      attachAria: "Attach image",
      closeAria: "Close assistant",
      openChatAria: "Open chat with Sara Xora",
      disclaimer:
        "Sara may make mistakes. Double-check important information.",
      typing: "Sara is typing…",
      errorGeneric: "Couldn’t send your message. Please try again.",
      error422:
        "Only JPEG, PNG, or WebP images (max. 5 files, 5 MB each).",
      gatewayError:
        "The request took too long. Please try again. If you sent an image, try a smaller one or send without an image.",
    },
    footer: {
      slogan:
        "Your strategic partner for industrial supplies and safety equipment.",
      navEmpresa: "Company",
      navCategorias: "Categories",
      navEnlaces: "Useful links",
      linkNosotros: "About us",
      linkContacto: "Contact",
      linkFaq: "FAQ",
      linkCotizaciones: "Quotes",
      linkCatalogo: "Catalog",
      linkSuministros: "Supplies",
      linkSeguridad: "Safety",
      linkHerramientas: "Tools",
      linkAviso: "Legal notice",
      linkPrivacidad: "Privacy policy",
      linkCookies: "Cookie policy",
      linkTerminos: "Terms & conditions",
      linkEnvios: "Shipping",
      linkDevoluciones: "Returns",
      libroAlt: "Complaints book",
      mapIframeTitle: "INXORA office location map in Lima",
      mapOpenGoogle: "Open in Google Maps",
      rights: "All rights reserved.",
      developedBy: "Developed by",
      developedAccent: "INXORA",
    },
  },

  pt: {
    header: {
      navVentajas: "Vantagens",
      navPasos: "Passo a passo",
      navProveedores: "Fornecedores",
      navRespaldados: "Reconhecimentos",
      navPlanes: "Planos",
      navDemo: "Demo",
      navTienda: "Loja",
      requestQuote: "Solicitar Demo",
      langAria: "Selecionar idioma",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      h1Line1: "Controle total dos seus fornecedores",
      h1Em: "Sem planilhas, sem riscos invisíveis.",
      sub: "A INXORA é o seu software de controle e acompanhamento de fornecedores. Centralize avaliações, contratos e pagamentos em um só painel. Recupere a rastreabilidade da cadeia de suprimentos hoje.",
      ctaSubscribe: "Assine",
      ctaDemo: "Solicite uma demo",
      play: "Ver o produto em 60 s",
    },
    trusted: {
      title: "Confiam em nós para o seu abastecimento",
    },
    advantages: {
      kicker: "Vantagens da Inxora",
      titleBefore: "A ",
      titleHighlight: "solução",
      titleAfter: " mais inteligente para suas compras industriais",
      lede:
        "Tudo em um só painel com as 3T: Transparência, Rastreabilidade, Tranquilidade.",
      pillars: [
        {
          title: "Transparência",
          bullets: [
            "Relatórios e painéis: gasto, categorias e operação no mesmo lugar —decisões com dados, sem planilhas soltas—.",
            "KPIs de compras alinhados ao negócio: base única, sem números duplicados.",
            "Mais visibilidade da requisição ao fornecedor, para liderar com clareza.",
          ],
        },
        {
          title: "Rastreabilidade",
          bullets: [
            "Ciclos mais curtos do pedido à ordem de compra: menos atrito, mais clareza (referência: até cerca de −42% no tempo de ciclo em acompanhamentos de referência).",
            "Cada etapa com autoria e registro: rastreabilidade auditável, nada de “perdeu no e-mail”.",
            "Seguimento de corte, recepção e versões, com histórico completo.",
          ],
        },
        {
          title: "Tranquilidade",
          bullets: [
            "Mais fornecedores avaliados com o mesmo time: maior cobertura sem ampliar cabeça (referência: até cerca de +3,2× a cobertura de avaliação).",
            "Indicadores e economia comparativa no painel, sem consolidar na mão.",
            "Entrada em produção em semanas, não em trimestres: onboarding, dados e treinamento, com go-live de referência em torno de 30 dias.",
          ],
        },
      ],
    },
    process: {
      kicker: "Nosso passo a passo",
      headlineLine1: "Comece agora",
      headlineLine2: "e peça seu produto na Inxora",
      ledeLine1:
        "Temos um processo simples e eficiente para obter os insumos industriais",
      ledeLine2: "que sua empresa precisa",
      steps: [
        { title: "Cotar com a Sara", subtitle: "Em minutos" },
        { title: "Confirme seu pedido", subtitle: "Na hora" },
        { title: "Envio e pagamento", subtitle: "Seguro" },
        { title: "Suporte técnico", subtitle: "Contínuo" },
      ],
      ctaQuote: "Cotar agora",
    },
    suppliers: {
      kicker: "Nossos fornecedores",
      title: "Parceria com fornecedores internacionais de confiança",
      lede: "Trabalhamos com os melhores fabricantes e distribuidores do setor para garantir produtos de alta qualidade.",
      ctaSupplier: "Quero ser fornecedor",
    },
    recognitions: {
      kicker: "Reconhecimentos",
      title: "Apoiados pelo ecossistema de inovação do Peru e do mundo",
      lede: "A Inxora é impulsionada por instituições que validam nosso compromisso com a transformação digital e a excelência operacional no setor industrial.",
    },
    pricing: pricingSectionCopy.pt,
    excelCta: excelCtaCopy.pt,
    assistance: {
      label: "Estou pronta para ajudar você",
      chatTitle: "Sara Xora",
      chatSubtitle: "Assistente virtual",
      inputPlaceholder: "Escreva algo…",
      sendAria: "Enviar mensagem",
      attachAria: "Anexar imagem",
      closeAria: "Fechar assistente",
      openChatAria: "Abrir chat com Sara Xora",
      disclaimer:
        "A Sara pode cometer erros. Verifique informações importantes.",
      typing: "A Sara está escrevendo…",
      errorGeneric: "Não foi possível enviar a mensagem. Tente novamente.",
      error422:
        "Somente imagens JPEG, PNG ou WebP (máx. 5 arquivos, 5 MB cada).",
      gatewayError:
        "A solicitação demorou demais. Tente novamente. Se enviou uma imagem, tente uma menor ou sem imagem.",
    },
    footer: {
      slogan:
        "Seu parceiro estratégico em insumos industriais e equipamentos de segurança.",
      navEmpresa: "Empresa",
      navCategorias: "Categorias",
      navEnlaces: "Links úteis",
      linkNosotros: "Sobre nós",
      linkContacto: "Contato",
      linkFaq: "FAQ",
      linkCotizaciones: "Cotações",
      linkCatalogo: "Catálogo",
      linkSuministros: "Insumos",
      linkSeguridad: "Segurança",
      linkHerramientas: "Ferramentas",
      linkAviso: "Aviso legal",
      linkPrivacidad: "Política de privacidade",
      linkCookies: "Política de cookies",
      linkTerminos: "Termos e condições",
      linkEnvios: "Envios",
      linkDevoluciones: "Devoluções",
      libroAlt: "Livro de reclamações",
      mapIframeTitle: "Mapa do escritório INXORA em Lima",
      mapOpenGoogle: "Abrir no Google Maps",
      rights: "Todos os direitos reservados.",
      developedBy: "Desenvolvido por",
      developedAccent: "INXORA",
    },
  },
};
