import type { Language } from "../types/language";
import type { ExcelCtaCopy } from "./excelCtaCopy";
import { excelCtaCopy } from "./excelCtaCopy";
import type { PricingSectionCopy } from "./pricingPlans";
import { pricingSectionCopy } from "./pricingPlans";

export type AdvantagePillarCopy = {
  title: string;
  bullets: string[];
};

export type ProblemPointCopy = {
  title: string;
  body: string;
};

export type PlatformItemCopy = {
  title: string;
  body: string;
};

export type ResultItemCopy = {
  title: string;
  description: string;
  pill: string;
};

export type PlatformVisualCopy = {
  rucLine: string;
  poEvents7d: string;
  erp: string;
  inxora: string;
  riskRules: string;
};

export type ProcessStepCopy = {
  title: string;
  body: string;
};

export type LandingCopy = {
  header: {
    navProblema: string;
    navVentajas: string;
    navPlataforma: string;
    navResultados: string;
    navVideo: string;
    navPasos: string;
    navProveedores: string;
    navRespaldados: string;
    navPlanes: string;
    navDemo: string;
    navTienda: string;
    signIn: string;
    account: string;
    accountAria: string;
    noAccount: string;
    createAccount: string;
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
    closeVideo: string;
    /** Globos flotantes alrededor del mockup (4). */
    bubbles: [string, string, string, string];
  };
  trusted: {
    title: string;
  };
  problem: {
    kicker: string;
    titleLine1: string;
    titleAccent: string;
    lede: string;
    imageAlt: string;
    points: [ProblemPointCopy, ProblemPointCopy, ProblemPointCopy, ProblemPointCopy];
    warning: string;
  };
  platform: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    titleSuffix: string;
    lede: string;
    cta: string;
    visual: PlatformVisualCopy;
    items: [
      PlatformItemCopy,
      PlatformItemCopy,
      PlatformItemCopy,
      PlatformItemCopy,
      PlatformItemCopy,
      PlatformItemCopy,
    ];
  };
  advantages: {
    kicker: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lede: string;
    pillars: [AdvantagePillarCopy, AdvantagePillarCopy, AdvantagePillarCopy];
  };
  processFlow: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    ledeLine1: string;
    ledeLine2: string;
    ledeAccent: string;
    centerTitle: string;
    centerSubtitle: string;
    flowBadge: { title: string; body: string };
    controlBadge: { title: string; body: string };
    steps: [
      ProcessStepCopy,
      ProcessStepCopy,
      ProcessStepCopy,
      ProcessStepCopy,
      ProcessStepCopy,
      ProcessStepCopy,
      ProcessStepCopy,
      ProcessStepCopy,
    ];
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
    linkAcuerdoPiloto: string;
    linkEnvios: string;
    linkDevoluciones: string;
    libroAlt: string;
    mapIframeTitle: string;
    mapOpenGoogle: string;
    rights: string;
    developedBy: string;
    developedAccent: string;
  };
  results: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    items: [ResultItemCopy, ResultItemCopy, ResultItemCopy, ResultItemCopy];
  };
  video: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    points: [string, string, string];
    cta: string;
    videoTitle: string;
  };
  signup: {
    back: string;
    title: string;
    haveAccount: string;
    signIn: string;
    companySection: string;
    adminSection: string;
    countryLabel: string;
    countryPlaceholder: string;
    countryLoading: string;
    countryError: string;
    docLabel: string;
    docTypeAria: string;
    docNumberPlaceholderPE: string;
    docNumberPlaceholderOther: string;
    docTypeRUC: string;
    docTypeDNI: string;
    docTypeID: string;
    docTypeOther: string;
    consultRuc: string;
    consultingRuc: string;
    docHint: string;
    rucDigitsError: string;
    rucValidateError: string;
    companyNameLabel: string;
    companyNamePlaceholder: string;
    companyEmailLabel: string;
    companyEmailPlaceholder: string;
    companyEmailHint: string;
    phoneLabel: string;
    phonePlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    fullNameLabel: string;
    firstNamePlaceholder: string;
    lastNamePPlaceholder: string;
    lastNameMPlaceholder: string;
    positionLabel: string;
    positionPlaceholder: string;
    adminEmailLabel: string;
    adminEmailPlaceholder: string;
    adminEmailHint: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    pwdRules: [string, string, string, string, string];
    pwdMustMeet: string;
    pwdStrength: string;
    pwdWeak: string;
    pwdMedium: string;
    pwdStrong: string;
    pwdShow: string;
    pwdHide: string;
    pwdMatch: string;
    pwdNoMatch: string;
    pwdLengthError: string;
    pwdComplexityError: string;
    submit: string;
    submitting: string;
    submitError: string;
    legalPre: string;
    legalTerms: string;
    legalMid: string;
    legalPilot: string;
    legalAnd: string;
    legalPrivacy: string;
    legalEnd: string;
    successTitle: string;
    successSubPre: string;
    successSubPost: string;
    successCta: string;
  };
};

export const landingTranslations: Record<Language, LandingCopy> = {
  es: {
    header: {
      navProblema: "El problema",
      navVentajas: "Ventajas",
      navPlataforma: "Plataforma",
      navResultados: "Resultados",
      navVideo: "Video",
      navPasos: "Paso a paso",
      navProveedores: "Proveedores",
      navRespaldados: "Respaldados",
      navPlanes: "Planes",
      navDemo: "Demo",
      navTienda: "Tienda",
      signIn: "Iniciar Sesión",
      account: "Cuenta",
      accountAria: "Abrir menú de cuenta",
      noAccount: "¿No tienes cuenta de Inxora?",
      createAccount: "Crear Cuenta",
      langAria: "Seleccionar idioma",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      h1Line1: "Organiza tu operación",
      h1Em: "mientras haces crecer tu negocio.",
      sub: "Plataforma con asistencia inteligente para compras, ventas, proveedores y seguimiento operativo. NIX-IA te ayuda a centralizar, cotizar, aprobar y dar seguimiento — todo en un solo lugar.",
      ctaSubscribe: "Solicitar Demo",
      ctaDemo: "Hablar por WhatsApp",
      play: "Ver el producto en 60 s",
      closeVideo: "Cerrar video",
      bubbles: [
        "Compras y cotizaciones",
        "Ventas y clientes",
        "Proveedores centralizados",
        "Seguimiento en tiempo real",
      ],
    },
    trusted: {
      title: "Confían en nosotros para su abastecimiento",
    },
    problem: {
      kicker: "El problema",
      titleLine1: "Tu equipo de compras opera a ciegas.",
      titleAccent: "Y eso tiene un costo.",
      lede:
        "Hojas de cálculo desperdigadas, documentos en correos, proveedores sin evaluación formal. Cuando un pedido se frena, nadie sabe dónde.",
      imageAlt:
        "Responsable de compras preocupado revisando documentos sin un sistema centralizado",
      points: [
        {
          title: "Información dispersa",
          body: "Datos en Excel, correos y chats: nadie tiene la foto completa de tus compras.",
        },
        {
          title: "Cotizaciones desordenadas",
          body: "Comparas precios a mano, sin historial ni versiones claras de cada propuesta.",
        },
        {
          title: "Poco control de proveedores",
          body: "Sin scoring, ni evaluación, ni alertas: te enteras de los problemas tarde.",
        },
        {
          title: "Decisiones lentas",
          body: "Cada aprobación se traba en un correo distinto y frena tus pedidos.",
        },
      ],
      warning: "Esto genera retrasos, errores y pérdida de dinero.",
    },
    platform: {
      kicker: "Plataforma",
      titleLead: "Capacidades que hacen diferente a ",
      titleAccent: "INXORA",
      titleSuffix: "",
      lede:
        "Más allá de un repositorio de proveedores: reglas, integraciones, analítica y trazabilidad con la seguridad que exige un entorno B2B industrial.",
      cta: "Hablar con un experto",
      visual: {
        rucLine: "RUC / proveedor",
        poEvents7d: "Eventos de OC (7d)",
        erp: "ERP",
        inxora: "INXORA",
        riskRules: "Riesgo · reglas",
      },
      items: [
        {
          title: "Registro y evaluación",
          body: "KYC, documentos, certificaciones y scoring en un solo flujo, sin hojas sueltas.",
        },
        {
          title: "Órdenes de compra",
          body: "Emisión, aprobación y vinculación a ERP con historial y versionado de cada OC.",
        },
        {
          title: "Contratos activos",
          body: "Plazos, cláusulas, SLAs y renegociación bajo un mismo techo, con avisos.",
        },
        {
          title: "Pagos y conciliación",
          body: "Factura vs. OC, circuitos de pago y conciliación bancaria sin fricción.",
        },
        {
          title: "Riesgo y compliance",
          body: "Radar de indicadores, alertas y trazas para auditoría y terceros de control.",
        },
        {
          title: "Cuenta proveedor (SRM)",
          body: "Relación, actividades y seguimiento: cada proveedor con su espacio dedicado.",
        },
      ],
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
    processFlow: {
      kicker: "Todo tu proceso conectado",
      headlineLine1: "Todo tu proceso",
      headlineLine2: "conectado.",
      ledeLine1: "Desde la solicitud hasta la entrega,",
      ledeLine2: "cada etapa fluye en",
      ledeAccent: "un solo sistema.",
      centerTitle: "INXORA",
      centerSubtitle: "Tu operación, siempre conectada.",
      flowBadge: {
        title: "Un flujo único.",
        body: "Información centralizada, equipos alineados y decisiones más rápidas.",
      },
      controlBadge: {
        title: "Todo conectado. Todo bajo control.",
        body: "Menos duplicidad, menos errores, más eficiencia.",
      },
      steps: [
        { title: "Solicitud", body: "El cliente o área interna realiza una solicitud." },
        { title: "Cotización", body: "Genera y envía cotizaciones de manera ágil." },
        { title: "Proveedor", body: "Selecciona al proveedor adecuado y negocia." },
        { title: "Aprobación", body: "Flujos de aprobación claros y transparentes." },
        { title: "Venta / Factura", body: "Convierte la operación en venta y factura." },
        { title: "Seguimiento", body: "Monitorea pedidos, avances y estados en tiempo real." },
        { title: "Entrega", body: "Controla la entrega y cierra el ciclo con éxito." },
        { title: "Reportes", body: "Información centralizada para decisiones más rápidas." },
      ],
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
      label: "¡Hola! Soy NIX-IA",
      chatTitle: "NIX-IA",
      chatSubtitle: "Asistente inteligente",
      inputPlaceholder: "Escribe algo…",
      sendAria: "Enviar mensaje",
      attachAria: "Adjuntar imagen",
      closeAria: "Cerrar asistente",
      openChatAria: "Abrir chat con NIX-IA",
      disclaimer:
        "NIX-IA puede cometer errores. Verifica la información importante.",
      typing: "NIX-IA está escribiendo…",
      errorGeneric: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      error422:
        "Solo imágenes JPEG, PNG o WebP (máx. 5 archivos, 5 MB cada una).",
      gatewayError:
        "La solicitud tardó demasiado. Inténtalo de nuevo. Si enviaste una imagen, prueba con una más pequeña o sin imagen.",
    },
    footer: {
      slogan:
        "NIX-IA TRABAJA CONTIGO EN CADA ETAPA DE TU OPERACIÓN.",
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
      linkAcuerdoPiloto: "Acuerdo de usuario piloto",
      linkEnvios: "Envíos",
      linkDevoluciones: "Devoluciones",
      libroAlt: "Libro de reclamaciones",
      mapIframeTitle: "Mapa de la oficina INXORA en Lima",
      mapOpenGoogle: "Abrir en Google Maps",
      rights: "Todos los derechos reservados.",
      developedBy: "Desarrollado por",
      developedAccent: "INXORA",
    },
    results: {
      kicker: "Sobre resultados con INXORA",
      titleLead: "Plataforma con datos,",
      titleAccent: "diseñada para acelerar",
      titleSuffix: "la compra industrial",
      description:
        "Todo en un solo panel: reducción de ciclos, más proveedores evaluados, trazabilidad total y puesta en marcha en semanas, no en trimestres.",
      items: [
        {
          title: "Ahorro de tiempo",
          description: "Reduce procesos de días a minutos.",
          pill: "Hasta 80% menos tiempo",
        },
        {
          title: "Mayor control",
          description: "Gestiona proveedores y compras en un solo lugar.",
          pill: "Todo en un solo sistema",
        },
        {
          title: "Mejores decisiones",
          description: "Compara precios, tiempos y opciones fácilmente.",
          pill: "Decisiones más inteligentes",
        },
        {
          title: "Orden y trazabilidad",
          description: "Historial completo de cada compra.",
          pill: "100% trazabilidad",
        },
      ],
    },
    video: {
      kicker: "INXORA en acción",
      titleLead: "Mira cómo INXORA",
      titleAccent: "ordena tus compras",
      titleSuffix: "en menos de un minuto",
      description:
        "Un recorrido rápido por la plataforma: del caos en Excel al control total de proveedores, contratos y pagos en un solo lugar.",
      points: [
        "De la requisición al pago, sin hojas sueltas.",
        "Proveedores evaluados, contratos y pagos en un solo panel.",
        "Visibilidad en tiempo real para decidir con datos.",
      ],
      cta: "Solicitar demo",
      videoTitle: "INXORA en 1 minuto",
    },
    signup: {
      back: "Volver al inicio",
      title: "Crea tu cuenta de INXORA",
      haveAccount: "¿Ya tienes una cuenta?",
      signIn: "Iniciar sesión",
      companySection: "Datos de la empresa",
      adminSection: "Usuario administrador",
      countryLabel: "País",
      countryPlaceholder: "Selecciona un país",
      countryLoading: "Cargando países…",
      countryError:
        "No pudimos cargar la lista de países. Intenta refrescar la página.",
      docLabel: "Documento de la empresa",
      docTypeAria: "Tipo de documento",
      docNumberPlaceholderPE: "10724670038",
      docNumberPlaceholderOther: "Tu ID fiscal",
      docTypeRUC: "RUC",
      docTypeDNI: "DNI",
      docTypeID: "ID Fiscal",
      docTypeOther: "Otro",
      consultRuc: "Consultar RUC",
      consultingRuc: "Consultando…",
      docHint: "Con el RUC podemos autocompletar los datos de tu empresa.",
      rucDigitsError: "El RUC debe tener 11 dígitos.",
      rucValidateError:
        "No pudimos validar el RUC. Verifica el número o intenta de nuevo.",
      companyNameLabel: "Razón social / Nombre",
      companyNamePlaceholder: "TEST S.A.C",
      companyEmailLabel: "Email corporativo",
      companyEmailPlaceholder: "contacto@empresa.com",
      companyEmailHint: "Para comunicaciones generales de tu organización.",
      phoneLabel: "Teléfono",
      phonePlaceholder: "994210178",
      addressLabel: "Dirección",
      addressPlaceholder: "Avenida Colonial 123",
      cityLabel: "Ciudad",
      cityPlaceholder: "Lima",
      fullNameLabel: "Nombre completo",
      firstNamePlaceholder: "Nombre",
      lastNamePPlaceholder: "Apellido paterno",
      lastNameMPlaceholder: "Apellido materno",
      positionLabel: "Cargo",
      positionPlaceholder: "Super Admin",
      adminEmailLabel: "Email del administrador",
      adminEmailPlaceholder: "admin@empresa.com",
      adminEmailHint: "Será el usuario para iniciar sesión en INXORA.",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Crea una contraseña segura",
      confirmPasswordLabel: "Repite la contraseña",
      confirmPasswordPlaceholder: "Vuelve a escribir la contraseña",
      pwdRules: [
        "Entre 8 y 64 caracteres",
        "Al menos una letra mayúscula (A-Z)",
        "Al menos una letra minúscula (a-z)",
        "Al menos un número (0-9)",
        "Al menos un carácter especial (!@#$%…)",
      ],
      pwdMustMeet: "Tu contraseña debe cumplir:",
      pwdStrength: "Seguridad:",
      pwdWeak: "Débil",
      pwdMedium: "Media",
      pwdStrong: "Fuerte",
      pwdShow: "Mostrar contraseña",
      pwdHide: "Ocultar contraseña",
      pwdMatch: "Las contraseñas coinciden.",
      pwdNoMatch: "Las contraseñas no coinciden.",
      pwdLengthError: "La contraseña debe tener entre 8 y 64 caracteres.",
      pwdComplexityError:
        "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial.",
      submit: "Crear cuenta",
      submitting: "Creando cuenta…",
      submitError:
        "No pudimos crear tu cuenta. Revisa los datos o intenta de nuevo en unos minutos.",
      legalPre: "Al crear tu cuenta aceptas nuestros ",
      legalTerms: "Términos y Condiciones de Uso",
      legalMid: ", el ",
      legalPilot: "Acuerdo de Usuario Piloto",
      legalAnd: " y la ",
      legalPrivacy: "Política de Privacidad y Confidencialidad",
      legalEnd: ".",
      successTitle: "¡Cuenta creada!",
      successSubPre: "Te enviamos un correo de confirmación a ",
      successSubPost:
        ". Sigue las instrucciones para activar tu cuenta y empezar a usar INXORA.",
      successCta: "Ir a Iniciar Sesión",
    },
  },

  en: {
    header: {
      navProblema: "The problem",
      navVentajas: "Advantages",
      navPlataforma: "Platform",
      navResultados: "Results",
      navVideo: "Video",
      navPasos: "Step by step",
      navProveedores: "Suppliers",
      navRespaldados: "Recognition",
      navPlanes: "Plans",
      navDemo: "Demo",
      navTienda: "Store",
      signIn: "Sign In",
      account: "Account",
      accountAria: "Open account menu",
      noAccount: "Don't have an Inxora account?",
      createAccount: "Create Account",
      langAria: "Select language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      h1Line1: "Organize your operation",
      h1Em: "while you grow your business.",
      sub: "AI-assisted platform for purchasing, sales, suppliers and operational tracking. NIX-IA helps you centralize, quote, approve and track — all in one place.",
      ctaSubscribe: "Request a demo",
      ctaDemo: "Chat on WhatsApp",
      play: "60-second product tour",
      closeVideo: "Close video",
      bubbles: [
        "Purchasing & quotes",
        "Sales & clients",
        "Centralized suppliers",
        "Real-time tracking",
      ],
    },
    trusted: {
      title: "They trust us for their supply chain",
    },
    problem: {
      kicker: "The problem",
      titleLine1: "Your procurement team is flying blind.",
      titleAccent: "And that has a real cost.",
      lede:
        "Spreadsheets everywhere, documents stuck in inboxes, vendors with no formal evaluation. When an order stalls, no one can pinpoint why.",
      imageAlt:
        "Procurement lead worried while reviewing documents without a centralized system",
      points: [
        {
          title: "Scattered information",
          body: "Data in spreadsheets, emails and chats — no one has the full picture of your purchasing.",
        },
        {
          title: "Disorganized quotes",
          body: "You compare prices by hand, with no history or clear versions of each proposal.",
        },
        {
          title: "Little supplier control",
          body: "No scoring, no evaluation, no alerts: you find out about problems too late.",
        },
        {
          title: "Slow decisions",
          body: "Every approval gets stuck in a different email thread and stalls your orders.",
        },
      ],
      warning: "This causes delays, errors and money lost.",
    },
    platform: {
      kicker: "Platform",
      titleLead: "Capabilities that set ",
      titleAccent: "INXORA",
      titleSuffix: " apart",
      lede:
        "Beyond a vendor database: business rules, integrations, analytics, and end-to-end traceability with the security and governance industrial B2B needs.",
      cta: "Talk to an expert",
      visual: {
        rucLine: "TIN / vendor",
        poEvents7d: "PO events (7d)",
        erp: "ERP",
        inxora: "INXORA",
        riskRules: "Risk · rules",
      },
      items: [
        {
          title: "Onboarding & assessment",
          body: "KYC, documents, certifications, and scores in one flow—no more spreadsheet chaos.",
        },
        {
          title: "Purchase orders",
          body: "Issue, approve, and connect to your ERP with full version history for every PO.",
        },
        {
          title: "Active contracts",
          body: "Milestones, terms, and SLAs in one place, with renewals and alerts covered.",
        },
        {
          title: "Payments & matching",
          body: "Invoice-to-PO matching, payment cycles, and bank reconciliation without the glue work.",
        },
        {
          title: "Risk & compliance",
          body: "Signals, alerts, and an audit trail ready for your risk and control teams.",
        },
        {
          title: "Supplier account hub (SRM)",
          body: "Contacts, activities, and pipeline—each vendor in one dedicated workspace.",
        },
      ],
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
    processFlow: {
      kicker: "Your entire process, connected",
      headlineLine1: "Your entire process",
      headlineLine2: "connected.",
      ledeLine1: "From the first request to final delivery,",
      ledeLine2: "every stage flows in",
      ledeAccent: "one single system.",
      centerTitle: "INXORA",
      centerSubtitle: "Your operation, always connected.",
      flowBadge: {
        title: "One unified flow.",
        body: "Centralized information, aligned teams and faster decisions.",
      },
      controlBadge: {
        title: "All connected. All under control.",
        body: "Less duplication, fewer errors, more efficiency.",
      },
      steps: [
        { title: "Request", body: "Customer or internal team submits a request." },
        { title: "Quotation", body: "Generate and send quotes in a snap." },
        { title: "Supplier", body: "Pick the right supplier and negotiate." },
        { title: "Approval", body: "Clear, transparent approval workflows." },
        { title: "Sale / Invoice", body: "Turn the operation into a sale and invoice." },
        { title: "Tracking", body: "Monitor orders, progress and status in real time." },
        { title: "Delivery", body: "Control the delivery and close the loop." },
        { title: "Reports", body: "Centralized data for faster decisions." },
      ],
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
      label: "Hi! I’m NIX-IA",
      chatTitle: "NIX-IA",
      chatSubtitle: "Smart assistant",
      inputPlaceholder: "Type a message…",
      sendAria: "Send message",
      attachAria: "Attach image",
      closeAria: "Close assistant",
      openChatAria: "Open chat with NIX-IA",
      disclaimer:
        "NIX-IA may make mistakes. Double-check important information.",
      typing: "NIX-IA is typing…",
      errorGeneric: "Couldn’t send your message. Please try again.",
      error422:
        "Only JPEG, PNG, or WebP images (max. 5 files, 5 MB each).",
      gatewayError:
        "The request took too long. Please try again. If you sent an image, try a smaller one or send without an image.",
    },
    footer: {
      slogan:
        "NIX-IA WORKS WITH YOU AT EVERY STAGE OF YOUR OPERATION.",
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
      linkAcuerdoPiloto: "Pilot user agreement",
      linkEnvios: "Shipping",
      linkDevoluciones: "Returns",
      libroAlt: "Complaints book",
      mapIframeTitle: "INXORA office location map in Lima",
      mapOpenGoogle: "Open in Google Maps",
      rights: "All rights reserved.",
      developedBy: "Developed by",
      developedAccent: "INXORA",
    },
    results: {
      kicker: "About results with INXORA",
      titleLead: "A data-driven platform,",
      titleAccent: "built to accelerate",
      titleSuffix: "industrial purchasing",
      description:
        "Everything in one panel: shorter cycles, more vetted suppliers, full traceability, and a go-live in weeks—not quarters.",
      items: [
        {
          title: "Time saved",
          description: "Turn processes that took days into minutes.",
          pill: "Up to 80% less time",
        },
        {
          title: "More control",
          description: "Manage suppliers and purchasing in one place.",
          pill: "All in one system",
        },
        {
          title: "Better decisions",
          description: "Compare prices, lead times and options easily.",
          pill: "Smarter decisions",
        },
        {
          title: "Order and traceability",
          description: "A complete history of every purchase.",
          pill: "100% traceability",
        },
      ],
    },
    video: {
      kicker: "INXORA in action",
      titleLead: "See how INXORA",
      titleAccent: "organizes your purchasing",
      titleSuffix: "in under a minute",
      description:
        "A quick tour of the platform: from spreadsheet chaos to full control of suppliers, contracts and payments in one place.",
      points: [
        "From requisition to payment, with no loose sheets.",
        "Vetted suppliers, contracts and payments in a single panel.",
        "Real-time visibility to decide with data.",
      ],
      cta: "Request a demo",
      videoTitle: "INXORA in 1 minute",
    },
    signup: {
      back: "Back to home",
      title: "Create your INXORA account",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      companySection: "Company details",
      adminSection: "Administrator user",
      countryLabel: "Country",
      countryPlaceholder: "Select a country",
      countryLoading: "Loading countries…",
      countryError: "We couldn't load the country list. Please refresh the page.",
      docLabel: "Company document",
      docTypeAria: "Document type",
      docNumberPlaceholderPE: "10724670038",
      docNumberPlaceholderOther: "Your tax ID",
      docTypeRUC: "RUC",
      docTypeDNI: "DNI",
      docTypeID: "Tax ID",
      docTypeOther: "Other",
      consultRuc: "Look up RUC",
      consultingRuc: "Looking up…",
      docHint: "With the RUC we can autofill your company details.",
      rucDigitsError: "The RUC must have 11 digits.",
      rucValidateError:
        "We couldn't validate the RUC. Check the number or try again.",
      companyNameLabel: "Legal / company name",
      companyNamePlaceholder: "TEST S.A.C",
      companyEmailLabel: "Company email",
      companyEmailPlaceholder: "contact@company.com",
      companyEmailHint: "Used for general communications with your organization.",
      phoneLabel: "Phone",
      phonePlaceholder: "994210178",
      addressLabel: "Address",
      addressPlaceholder: "123 Colonial Avenue",
      cityLabel: "City",
      cityPlaceholder: "Lima",
      fullNameLabel: "Full name",
      firstNamePlaceholder: "First name",
      lastNamePPlaceholder: "Last name",
      lastNameMPlaceholder: "Second last name",
      positionLabel: "Role",
      positionPlaceholder: "Super Admin",
      adminEmailLabel: "Administrator email",
      adminEmailPlaceholder: "admin@company.com",
      adminEmailHint: "This will be the username to sign in to INXORA.",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a strong password",
      confirmPasswordLabel: "Repeat the password",
      confirmPasswordPlaceholder: "Type the password again",
      pwdRules: [
        "Between 8 and 64 characters",
        "At least one uppercase letter (A-Z)",
        "At least one lowercase letter (a-z)",
        "At least one number (0-9)",
        "At least one special character (!@#$%…)",
      ],
      pwdMustMeet: "Your password must meet:",
      pwdStrength: "Strength:",
      pwdWeak: "Weak",
      pwdMedium: "Medium",
      pwdStrong: "Strong",
      pwdShow: "Show password",
      pwdHide: "Hide password",
      pwdMatch: "Passwords match.",
      pwdNoMatch: "Passwords don't match.",
      pwdLengthError: "The password must be between 8 and 64 characters.",
      pwdComplexityError:
        "The password must include at least one uppercase letter, one lowercase letter, one number and one special character.",
      submit: "Create account",
      submitting: "Creating account…",
      submitError:
        "We couldn't create your account. Check the details or try again in a few minutes.",
      legalPre: "By creating your account you accept our ",
      legalTerms: "Terms of Use",
      legalMid: ", the ",
      legalPilot: "Pilot User Agreement",
      legalAnd: " and the ",
      legalPrivacy: "Privacy and Confidentiality Policy",
      legalEnd: ".",
      successTitle: "Account created!",
      successSubPre: "We sent a confirmation email to ",
      successSubPost:
        ". Follow the instructions to activate your account and start using INXORA.",
      successCta: "Go to Sign in",
    },
  },

  pt: {
    header: {
      navProblema: "O problema",
      navVentajas: "Vantagens",
      navPlataforma: "Plataforma",
      navResultados: "Resultados",
      navVideo: "Vídeo",
      navPasos: "Passo a passo",
      navProveedores: "Fornecedores",
      navRespaldados: "Reconhecimentos",
      navPlanes: "Planos",
      navDemo: "Demo",
      navTienda: "Loja",
      signIn: "Entrar",
      account: "Conta",
      accountAria: "Abrir menu da conta",
      noAccount: "Ainda não tem conta na Inxora?",
      createAccount: "Criar Conta",
      langAria: "Selecionar idioma",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      h1Line1: "Organize sua operação",
      h1Em: "enquanto faz seu negócio crescer.",
      sub: "Plataforma com assistência inteligente para compras, vendas, fornecedores e acompanhamento operacional. A NIX-IA ajuda a centralizar, cotar, aprovar e acompanhar — tudo em um só lugar.",
      ctaSubscribe: "Solicitar Demo",
      ctaDemo: "Falar pelo WhatsApp",
      play: "Ver o produto em 60 s",
      closeVideo: "Fechar vídeo",
      bubbles: [
        "Compras e cotações",
        "Vendas e clientes",
        "Fornecedores centralizados",
        "Acompanhamento em tempo real",
      ],
    },
    trusted: {
      title: "Confiam em nós para o seu abastecimento",
    },
    problem: {
      kicker: "O problema",
      titleLine1: "Sua equipe de compras opera no escuro.",
      titleAccent: "E isso tem um custo.",
      lede:
        "Planilhas espalhadas, anexos em e-mails, fornecedores sem avaliação formal. Quando um pedido trava, ninguém sabe o porquê.",
      imageAlt:
        "Responsável de compras preocupado revisando documentos sem um sistema centralizado",
      points: [
        {
          title: "Informação dispersa",
          body: "Dados em planilhas, e-mails e chats: ninguém tem a visão completa das suas compras.",
        },
        {
          title: "Cotações desorganizadas",
          body: "Você compara preços na mão, sem histórico nem versões claras de cada proposta.",
        },
        {
          title: "Pouco controle de fornecedores",
          body: "Sem score, sem avaliação, sem alertas: você descobre os problemas tarde.",
        },
        {
          title: "Decisões lentas",
          body: "Cada aprovação fica presa em um fio de e-mail diferente e trava seus pedidos.",
        },
      ],
      warning: "Isso gera atrasos, erros e perda de dinheiro.",
    },
    platform: {
      kicker: "Plataforma",
      titleLead: "Capacidades que colocam a ",
      titleAccent: "INXORA",
      titleSuffix: " em outro patamar",
      lede:
        "Além de um repositório de fornecedores: regras, integrações, análise e rastreabilidade com a segurança e governança que o B2B industrial exige.",
      cta: "Falar com um especialista",
      visual: {
        rucLine: "RUC / fornecedor",
        poEvents7d: "Eventos de OC (7d)",
        erp: "ERP",
        inxora: "INXORA",
        riskRules: "Risco · regras",
      },
      items: [
        {
          title: "Cadastro e avaliação",
          body: "KYC, documentos, certificações e score no mesmo fluxo, sem arquivos soltos.",
        },
        {
          title: "Ordens de compra",
          body: "Emissão, aprovação e ligação ao ERP com histórico e versionamento de cada OC.",
        },
        {
          title: "Contratos ativos",
          body: "Prazos, cláusulas, SLAs e renegociação em um só lugar, com alertas.",
        },
        {
          title: "Pagamentos e conciliação",
          body: "Nota vs. OC, fluxos de pagamento e conciliação bancária sem fricção.",
        },
        {
          title: "Risco e compliance",
          body: "Indicadores, alertas e rastros para auditoria e áreas de controle.",
        },
        {
          title: "Conta fornecedor (SRM)",
          body: "Relacionamento, atividades e funil: cada fornecedor com seu espaço dedicado.",
        },
      ],
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
    processFlow: {
      kicker: "Todo o seu processo conectado",
      headlineLine1: "Todo o seu processo",
      headlineLine2: "conectado.",
      ledeLine1: "Da solicitação até a entrega,",
      ledeLine2: "cada etapa flui em",
      ledeAccent: "um único sistema.",
      centerTitle: "INXORA",
      centerSubtitle: "Sua operação, sempre conectada.",
      flowBadge: {
        title: "Um fluxo único.",
        body: "Informação centralizada, equipes alinhadas e decisões mais rápidas.",
      },
      controlBadge: {
        title: "Tudo conectado. Tudo sob controle.",
        body: "Menos duplicação, menos erros, mais eficiência.",
      },
      steps: [
        { title: "Solicitação", body: "O cliente ou área interna faz uma solicitação." },
        { title: "Cotação", body: "Gere e envie cotações de forma ágil." },
        { title: "Fornecedor", body: "Selecione o fornecedor adequado e negocie." },
        { title: "Aprovação", body: "Fluxos de aprovação claros e transparentes." },
        { title: "Venda / Fatura", body: "Converte a operação em venda e fatura." },
        { title: "Acompanhamento", body: "Monitore pedidos, avanços e status em tempo real." },
        { title: "Entrega", body: "Controle a entrega e feche o ciclo com sucesso." },
        { title: "Relatórios", body: "Informação centralizada para decisões mais rápidas." },
      ],
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
      label: "Olá! Sou a NIX-IA",
      chatTitle: "NIX-IA",
      chatSubtitle: "Assistente inteligente",
      inputPlaceholder: "Escreva algo…",
      sendAria: "Enviar mensagem",
      attachAria: "Anexar imagem",
      closeAria: "Fechar assistente",
      openChatAria: "Abrir chat com a NIX-IA",
      disclaimer:
        "A NIX-IA pode cometer erros. Verifique informações importantes.",
      typing: "A NIX-IA está escrevendo…",
      errorGeneric: "Não foi possível enviar a mensagem. Tente novamente.",
      error422:
        "Somente imagens JPEG, PNG ou WebP (máx. 5 arquivos, 5 MB cada).",
      gatewayError:
        "A solicitação demorou demais. Tente novamente. Se enviou uma imagem, tente uma menor ou sem imagem.",
    },
    footer: {
      slogan:
        "A NIX-IA TRABALHA COM VOCÊ EM CADA ETAPA DA SUA OPERAÇÃO.",
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
      linkAcuerdoPiloto: "Acordo de usuário piloto",
      linkEnvios: "Envios",
      linkDevoluciones: "Devoluções",
      libroAlt: "Livro de reclamações",
      mapIframeTitle: "Mapa do escritório INXORA em Lima",
      mapOpenGoogle: "Abrir no Google Maps",
      rights: "Todos os direitos reservados.",
      developedBy: "Desenvolvido por",
      developedAccent: "INXORA",
    },
    results: {
      kicker: "Sobre resultados com a INXORA",
      titleLead: "Plataforma com dados,",
      titleAccent: "feita para acelerar",
      titleSuffix: "a compra industrial",
      description:
        "Tudo em um só painel: redução de ciclos, mais fornecedores avaliados, rastreabilidade total e implantação em semanas, não em trimestres.",
      items: [
        {
          title: "Economia de tempo",
          description: "Reduz processos de dias para minutos.",
          pill: "Até 80% menos tempo",
        },
        {
          title: "Mais controle",
          description: "Gerencie fornecedores e compras em um só lugar.",
          pill: "Tudo em um só sistema",
        },
        {
          title: "Melhores decisões",
          description: "Compare preços, prazos e opções facilmente.",
          pill: "Decisões mais inteligentes",
        },
        {
          title: "Ordem e rastreabilidade",
          description: "Histórico completo de cada compra.",
          pill: "100% de rastreabilidade",
        },
      ],
    },
    video: {
      kicker: "INXORA em ação",
      titleLead: "Veja como a INXORA",
      titleAccent: "organiza suas compras",
      titleSuffix: "em menos de um minuto",
      description:
        "Um tour rápido pela plataforma: do caos das planilhas ao controle total de fornecedores, contratos e pagamentos em um só lugar.",
      points: [
        "Da requisição ao pagamento, sem planilhas soltas.",
        "Fornecedores avaliados, contratos e pagamentos em um único painel.",
        "Visibilidade em tempo real para decidir com dados.",
      ],
      cta: "Solicitar demo",
      videoTitle: "INXORA em 1 minuto",
    },
    signup: {
      back: "Voltar ao início",
      title: "Crie sua conta INXORA",
      haveAccount: "Já tem uma conta?",
      signIn: "Entrar",
      companySection: "Dados da empresa",
      adminSection: "Usuário administrador",
      countryLabel: "País",
      countryPlaceholder: "Selecione um país",
      countryLoading: "Carregando países…",
      countryError:
        "Não foi possível carregar a lista de países. Tente atualizar a página.",
      docLabel: "Documento da empresa",
      docTypeAria: "Tipo de documento",
      docNumberPlaceholderPE: "10724670038",
      docNumberPlaceholderOther: "Seu CNPJ / ID fiscal",
      docTypeRUC: "RUC",
      docTypeDNI: "DNI",
      docTypeID: "ID fiscal",
      docTypeOther: "Outro",
      consultRuc: "Consultar RUC",
      consultingRuc: "Consultando…",
      docHint: "Com o RUC podemos preencher automaticamente os dados da sua empresa.",
      rucDigitsError: "O RUC deve ter 11 dígitos.",
      rucValidateError:
        "Não foi possível validar o RUC. Verifique o número ou tente novamente.",
      companyNameLabel: "Razão social / Nome",
      companyNamePlaceholder: "TEST S.A.C",
      companyEmailLabel: "E-mail corporativo",
      companyEmailPlaceholder: "contato@empresa.com",
      companyEmailHint: "Usado para comunicações gerais da sua organização.",
      phoneLabel: "Telefone",
      phonePlaceholder: "994210178",
      addressLabel: "Endereço",
      addressPlaceholder: "Avenida Colonial 123",
      cityLabel: "Cidade",
      cityPlaceholder: "Lima",
      fullNameLabel: "Nome completo",
      firstNamePlaceholder: "Nome",
      lastNamePPlaceholder: "Sobrenome",
      lastNameMPlaceholder: "Segundo sobrenome",
      positionLabel: "Cargo",
      positionPlaceholder: "Super Admin",
      adminEmailLabel: "E-mail do administrador",
      adminEmailPlaceholder: "admin@empresa.com",
      adminEmailHint: "Será o usuário para entrar na INXORA.",
      passwordLabel: "Senha",
      passwordPlaceholder: "Crie uma senha segura",
      confirmPasswordLabel: "Repita a senha",
      confirmPasswordPlaceholder: "Digite a senha novamente",
      pwdRules: [
        "Entre 8 e 64 caracteres",
        "Pelo menos uma letra maiúscula (A-Z)",
        "Pelo menos uma letra minúscula (a-z)",
        "Pelo menos um número (0-9)",
        "Pelo menos um caractere especial (!@#$%…)",
      ],
      pwdMustMeet: "Sua senha deve cumprir:",
      pwdStrength: "Segurança:",
      pwdWeak: "Fraca",
      pwdMedium: "Média",
      pwdStrong: "Forte",
      pwdShow: "Mostrar senha",
      pwdHide: "Ocultar senha",
      pwdMatch: "As senhas coincidem.",
      pwdNoMatch: "As senhas não coincidem.",
      pwdLengthError: "A senha deve ter entre 8 e 64 caracteres.",
      pwdComplexityError:
        "A senha deve incluir pelo menos uma maiúscula, uma minúscula, um número e um caractere especial.",
      submit: "Criar conta",
      submitting: "Criando conta…",
      submitError:
        "Não foi possível criar sua conta. Verifique os dados ou tente novamente em alguns minutos.",
      legalPre: "Ao criar sua conta você aceita nossos ",
      legalTerms: "Termos e Condições de Uso",
      legalMid: ", o ",
      legalPilot: "Acordo de Usuário Piloto",
      legalAnd: " e a ",
      legalPrivacy: "Política de Privacidade e Confidencialidade",
      legalEnd: ".",
      successTitle: "Conta criada!",
      successSubPre: "Enviamos um e-mail de confirmação para ",
      successSubPost:
        ". Siga as instruções para ativar sua conta e começar a usar a INXORA.",
      successCta: "Ir para Entrar",
    },
  },
};
