import type { Language } from "../types/language";

export type AdvantageItemCopy = {
  title: string;
  description: string;
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
    navTienda: string;
    requestQuote: string;
    langAria: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    headlineBefore: string;
    headlineHighlight: string;
    body: string;
    ctaQuote: string;
    ctaDispatch: string;
  };
  trusted: {
    title: string;
  };
  advantages: {
    kicker: string;
    title: string;
    lede: string;
    items: [AdvantageItemCopy, AdvantageItemCopy, AdvantageItemCopy, AdvantageItemCopy];
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
  ecommerce: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    cta: string;
    industries: [string, string, string, string];
  };
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
      navTienda: "Tienda",
      requestQuote: "Solicitar cotización",
      langAria: "Seleccionar idioma",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      headlineBefore: "El nuevo estándar del abastecimiento en",
      headlineHighlight: "Latinoamérica",
      body: "Vendemos suministros industriales críticos a las empresas más importantes de Perú y Latinoamérica, diferenciándonos por nuestra confianza y rapidez.",
      ctaQuote: "Cotizar al instante ahora",
      ctaDispatch: "Gestionar despacho",
    },
    trusted: {
      title: "Nuestros clientes de confianza:",
    },
    advantages: {
      kicker: "Ventajas de Inxora",
      title: "Somos la solución más inteligente para tus compras industriales",
      lede: "INXORA transforma el proceso tradicional de adquisición de suministros industriales, optimizando tiempos de respuesta.",
      items: [
        {
          title: "Garantía de calidad",
          description:
            "Reduce el tiempo de cotización y adquisición de productos hasta en un 70%.",
        },
        {
          title: "Ahorro económico",
          description:
            "Consolidamos tus compras para ofrecerte mejores precios y condiciones comerciales claras.",
        },
        {
          title: "Ahorro de tiempo",
          description:
            "Automatiza cotizaciones y seguimiento para que tu equipo priorice lo estratégico.",
        },
        {
          title: "Soporte especializado",
          description:
            "Acompañamiento técnico y comercial en cada etapa del proceso de compra.",
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
      title: "Respaldados por el ecosistema de innovación del Perú",
      lede: "Inxora es impulsada por instituciones que validan nuestro compromiso con la transformación digital y la excelencia operativa en el sector industrial.",
    },
    ecommerce: {
      kicker: "No esperes más",
      titleLine1: "Explora nuestros mejores",
      titleLine2: "productos en nuestro e-commerce",
      lede: "Selecciona tu industria y conoce los productos que tenemos para ti.",
      cta: "Visitar el e-commerce",
      industries: [
        "Electricidad",
        "Iluminación",
        "Instrumentación",
        "Mecánica industrial",
      ],
    },
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
      navTienda: "Store",
      requestQuote: "Request a quote",
      langAria: "Select language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      headlineBefore: "The new standard for industrial procurement in",
      headlineHighlight: "Latin America",
      body: "We supply critical industrial products to leading companies in Peru and Latin America—trusted, fast, and dependable.",
      ctaQuote: "Get an instant quote",
      ctaDispatch: "Manage dispatch",
    },
    trusted: {
      title: "Trusted by leading companies:",
    },
    advantages: {
      kicker: "INXORA advantages",
      title: "The smarter way to manage industrial purchasing",
      lede: "INXORA transforms traditional industrial procurement with faster response times and a streamlined buying experience.",
      items: [
        {
          title: "Quality assurance",
          description:
            "Cut quoting and purchasing time by up to 70% with reliable sourcing.",
        },
        {
          title: "Cost savings",
          description:
            "We consolidate your purchases to unlock better pricing and clear commercial terms.",
        },
        {
          title: "Time savings",
          description:
            "Automate quotes and follow-ups so your team can focus on strategy.",
        },
        {
          title: "Specialized support",
          description:
            "Technical and commercial guidance at every stage of the buying process.",
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
      title: "Backed by Peru’s innovation ecosystem",
      lede: "Inxora is supported by institutions that endorse our commitment to digital transformation and operational excellence in industry.",
    },
    ecommerce: {
      kicker: "Don’t wait",
      titleLine1: "Explore our best",
      titleLine2: "products in our e-commerce",
      lede: "Choose your industry and discover the products we have for you.",
      cta: "Visit the e-commerce",
      industries: [
        "Electrical",
        "Lighting",
        "Instrumentation",
        "Industrial mechanics",
      ],
    },
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
      navTienda: "Loja",
      requestQuote: "Solicitar cotação",
      langAria: "Selecionar idioma",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      headlineBefore: "O novo padrão de abastecimento na",
      headlineHighlight: "América Latina",
      body: "Fornecemos insumos industriais críticos às principais empresas do Peru e da América Latina, com confiança e agilidade.",
      ctaQuote: "Cotar agora mesmo",
      ctaDispatch: "Gerenciar envio",
    },
    trusted: {
      title: "Nossos clientes de confiança:",
    },
    advantages: {
      kicker: "Vantagens da Inxora",
      title: "A solução mais inteligente para suas compras industriais",
      lede: "A INXORA transforma o processo tradicional de aquisição de insumos industriais, otimizando prazos de resposta.",
      items: [
        {
          title: "Garantia de qualidade",
          description:
            "Reduza o tempo de cotação e aquisição de produtos em até 70%.",
        },
        {
          title: "Economia financeira",
          description:
            "Consolidamos suas compras para oferecer melhores preços e condições comerciais claras.",
        },
        {
          title: "Economia de tempo",
          description:
            "Automatize cotações e acompanhamento para sua equipe focar no estratégico.",
        },
        {
          title: "Suporte especializado",
          description:
            "Acompanhamento técnico e comercial em cada etapa do processo de compra.",
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
      title: "Apoiados pelo ecossistema de inovação do Peru",
      lede: "A Inxora é impulsionada por instituições que validam nosso compromisso com a transformação digital e a excelência operacional no setor industrial.",
    },
    ecommerce: {
      kicker: "Não espere mais",
      titleLine1: "Explore nossos melhores",
      titleLine2: "produtos no e-commerce",
      lede: "Selecione seu setor e conheça os produtos que temos para você.",
      cta: "Visitar o e-commerce",
      industries: [
        "Eletricidade",
        "Iluminação",
        "Instrumentação",
        "Mecânica industrial",
      ],
    },
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
      rights: "Todos os direitos reservados.",
      developedBy: "Desenvolvido por",
      developedAccent: "INXORA",
    },
  },
};
