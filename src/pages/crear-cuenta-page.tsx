import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { Paso1ElegirPlan, type EleccionPlan } from "./crear-cuenta/Paso1ElegirPlan";
import { ROUTES } from "../routes/paths";
import {
  type Paquete,
  type Pais,
  type RegistroPayload,
  consultarDni,
  consultarRuc,
  fetchPaises,
  fetchPaquetes,
  iniciarCheckoutSuscripcion,
  registrarEmpresa,
} from "../services/gestionApi";
import {
  sentryTrackConsultarDoc,
  sentryTrackRubroElegido,
  sentryTrackSubmit,
} from "../lib/sentry";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import type { LandingCopy } from "../i18n/landingTranslations";
import styles from "./crear-cuenta-page.module.css";

const SAAS_LOGIN_URL = "https://saas.inxora.com";
/* URL SSO del saas: le pasamos tokens JWT por query, el saas los mete
   en el authStore y redirige al dashboard sin pantalla intermedia.
   Override con VITE_SAAS_CALLBACK_URL en .env.development (dev local
   → http://localhost:5173/callback) o Vercel env (prod). */
const SAAS_CALLBACK_URL =
  (import.meta.env.VITE_SAAS_CALLBACK_URL as string | undefined)?.trim() ||
  "https://saas.inxora.com/callback";

type SignupCopy = LandingCopy["signup"];

type FormState = RegistroPayload & {
  admin_password_confirm: string;
};

/* TZ del navegador con fallback UTC — se usa como default del selector. */
function detectarTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/* Lista de zonas horarias del navegador (Intl.supportedValuesOf) con
   fallback a un set curado si el runtime no lo soporta. Mismo criterio
   que EmpresaInfoCard en app-inxora. */
function timezonesDisponibles(): string[] {
  try {
    return (Intl as unknown as { supportedValuesOf?: (k: string) => string[] })
      .supportedValuesOf?.("timeZone") ?? [];
  } catch {
    /* fallthrough */
  }
  return [
    "UTC",
    "America/Lima", "America/Bogota", "America/Santiago",
    "America/Mexico_City", "America/Argentina/Buenos_Aires",
    "America/Sao_Paulo", "America/New_York", "Europe/Madrid",
    "Europe/London", "Europe/Berlin",
  ];
}

const INITIAL: FormState = {
  empresa_nombre: "",
  empresa_tipo_documento: "RUC",
  empresa_numero_documento: "",
  empresa_pais: "",
  empresa_email: "",
  empresa_telefono: "",
  empresa_ciudad: "",
  empresa_direccion: "",
  admin_nombre: "",
  admin_apellido_paterno: "",
  admin_apellido_materno: "",
  admin_email: "",
  admin_password: "",
  admin_password_confirm: "",
  admin_cargo: "",
  codigo_paquete: "",
  empresa_timezone: detectarTimezone(),
};

/* Icono material-symbols por rubro. Fallback si el catálogo trae un
   código que aún no mapeamos → sale un icono genérico de business. */
const RUBRO_ICON: Record<string, string> = {
  ferreteria:   "handyman",
  construccion: "apartment",
  produccion:   "precision_manufacturing",
  taller:       "build",
  mostrador:    "point_of_sale",
};

function iconoRubro(codigo: string): string {
  return RUBRO_ICON[codigo] ?? "business_center";
}

/* Etiqueta amigable por función (código técnico → nombre para la landing).
   Fallback: el código snake_case capitalizado. */
const FUNCION_LABEL: Record<string, string> = {
  caja_diaria:                     "Caja diaria con arqueo",
  documentos_internos:             "Notas de venta / ticket 80mm",
  gestion_despachos_avanzada:      "Despachos multi-vehículo",
  compras_con_recepcion_separada:  "Recepción separada de compras",
  precios_avanzado:                "Precios dinámicos + aprobaciones",
  solicitudes_compra:              "Requerimientos con doble firma",
};

function labelFuncion(codigo: string): string {
  return (
    FUNCION_LABEL[codigo] ??
    codigo.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/* Lista precomputada a nivel módulo — no cambia entre renders. */
const TIMEZONES = timezonesDisponibles();

function isPeru(pais: Pais | undefined): boolean {
  if (!pais) return false;
  return pais.codigo?.toUpperCase() === "PE";
}

/* Reglas que valida el backend (POST /auth/registro). Las etiquetas legibles
   vienen de las traducciones (t.signup.pwdRules), en este mismo orden. */
type PasswordCheckKey = "length" | "upper" | "lower" | "digit" | "special";
const PASSWORD_RULE_KEYS: PasswordCheckKey[] = [
  "length",
  "upper",
  "lower",
  "digit",
  "special",
];
type PasswordChecks = Record<PasswordCheckKey, boolean>;

function getPasswordChecks(pwd: string): PasswordChecks {
  return {
    length: pwd.length >= 8 && pwd.length <= 64,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    digit: /\d/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

/** Devuelve un código de error de contraseña, o null si es válida. */
function getPasswordErrorCode(pwd: string): "length" | "complexity" | null {
  const checks = getPasswordChecks(pwd);
  if (!checks.length) return "length";
  if (!checks.upper || !checks.lower || !checks.digit || !checks.special) {
    return "complexity";
  }
  return null;
}

/* Extrae un mensaje legible de un error de la API. Cubre:
   · 422 FastAPI validación:  { detail: [{ msg, loc }, ...] }
   · 4xx HTTPException:       { detail: "mensaje string" }
   · Envoltorio { message }   (algunos handlers custom).
   · err.detail string directo. */
function extractApiError(err: unknown, fallback: string): string {
  const detail = (err as { detail?: unknown })?.detail;
  const fromList = (list: unknown): string | undefined => {
    if (!Array.isArray(list)) return undefined;
    const msgs = list
      .map((d) => (d as { msg?: string })?.msg)
      .filter((m): m is string => Boolean(m))
      .map((m) => m.replace(/^Value error,\s*/i, ""));
    return msgs.length ? msgs.join(" ") : undefined;
  };
  if (Array.isArray(detail)) return fromList(detail) ?? fallback;
  if (detail && typeof detail === "object") {
    const obj = detail as { detail?: unknown; message?: string };
    // FastAPI HTTPException(detail=str) → body = { detail: "..." }.
    if (typeof obj.detail === "string" && obj.detail.trim()) return obj.detail;
    return fromList(obj.detail) ?? obj.message ?? fallback;
  }
  if (typeof detail === "string") return detail;
  return fallback;
}

const CrearCuentaPage = () => {
  const t = useLandingTranslations();
  const s = t.signup;

  /* Query params vienen del pricing del landing:
       /crear-cuenta?plan=growth&periodicidad=anual&checkout=1
     - `plan` + `periodicidad` → se muestran como chip arriba del form.
     - `checkout=1` → post-registro, en vez de redirigir al login SaaS,
       llamamos a /suscripcion/checkout y mandamos al usuario a MP.
     - `moneda` → default PEN (MP-Perú solo acepta PEN por ahora). */
  const [sp, setSp] = useSearchParams();
  const planPreseleccionado = sp.get("plan");           // 'start' | 'growth' | null
  const periodicidadPreseleccionada = sp.get("periodicidad"); // 'mensual' | 'anual' | 'monthly' | 'annual' | null
  const modoCheckout = sp.get("checkout") === "1";
  const monedaCheckout = (sp.get("moneda") as "USD" | "PEN") || "PEN";

  /* Signup en 2 pasos estilo Netflix (2026-08-02):
     Paso 1 = elige tu plan · Paso 2 = form de registro.
     Si el usuario llegó desde el pricing (o sea `?plan=` en URL),
     salta directo al paso 2. Sin query → arranca en paso 1. */
  const [paso, setPaso] = useState<1 | 2>(planPreseleccionado ? 2 : 1);

  /* Trackea si el usuario entró en la página desde paso 1 (sin plan
     en URL). Se congela al montar — no cambia después de avanzar al
     paso 2. Se usa para:
       · Mostrar el progress indicator (● Plan · ○ Cuenta) también
         en el paso 2 cuando el usuario pasó por el 1.
       · Renderizar el botón "Cambiar de plan" en el header (vuelve
         al paso 1) en vez del "Volver al inicio" (que sale a home).
       · Renderizar el mini "Cambiar" al lado del chip. */
  const [pasoPor1] = useState<boolean>(!planPreseleccionado);

  /* Etiqueta legible para el chip — normaliza el valor del query
     param (puede venir como 'annual'/'monthly' del pricing, o
     'anual'/'mensual' del paso 1) al vocabulario en español. */
  const labelPeriodicidad = (v: string | null): string => {
    if (!v) return "";
    if (v === "annual"  || v === "anual")   return "Anual";
    if (v === "monthly" || v === "mensual") return "Mensual";
    return v;
  };

  const handleEleccionPlan = (eleccion: EleccionPlan) => {
    /* Actualizar URL para que sea bookmarkeable y consistente con las
       otras entradas (pricing del landing). `replace=true` porque no
       queremos que "volver" del navegador regrese al paso 1 con URL
       vieja — mejor que salga del signup. */
    const nuevo = new URLSearchParams();
    nuevo.set("plan", eleccion.plan);
    nuevo.set("periodicidad", eleccion.periodicidad);
    if (eleccion.checkout) nuevo.set("checkout", "1");
    setSp(nuevo, { replace: true });
    setPaso(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const volverAPaso1 = () => {
    setSp(new URLSearchParams(), { replace: true });
    setPaso(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [form, setForm] = useState<FormState>(INITIAL);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisesLoading, setPaisesLoading] = useState(true);
  const [paisesError, setPaisesError] = useState<string | null>(null);

  /* Catálogo de rubros (paquetes). Trae ACTIVOS + PRÓXIMAMENTE — los
     inactivos se pintan deshabilitados con badge. Sin rubro elegido el
     submit no procede (validación explícita, no HTML5). */
  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [paquetesLoading, setPaquetesLoading] = useState(true);
  const [paquetesError, setPaquetesError] = useState<string | null>(null);

  const [rucLoading, setRucLoading] = useState(false);
  const [rucError, setRucError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* Cargar países al montar */
  useEffect(() => {
    const ctrl = new AbortController();
    setPaisesLoading(true);
    fetchPaises(ctrl.signal)
      .then((data) => {
        setPaises(Array.isArray(data) ? data : []);
        setPaisesError(null);
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === "AbortError") return;
        setPaisesError(s.countryError);
      })
      .finally(() => setPaisesLoading(false));
    return () => ctrl.abort();
  }, [s.countryError]);

  /* Cargar rubros (paquetes) al montar. Traemos también los inactivos
     para exhibirlos como "Próximamente" — el UX vende el roadmap. */
  useEffect(() => {
    const ctrl = new AbortController();
    setPaquetesLoading(true);
    fetchPaquetes(ctrl.signal)
      .then((data) => {
        setPaquetes(Array.isArray(data) ? data : []);
        setPaquetesError(null);
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === "AbortError") return;
        setPaquetesError(s.rubroError);
      })
      .finally(() => setPaquetesLoading(false));
    return () => ctrl.abort();
  }, [s.rubroError]);

  const selectedPais = useMemo(
    () => paises.find((p) => p.codigo === form.empresa_pais),
    [paises, form.empresa_pais],
  );

  const peruSelected = isPeru(selectedPais);

  const confirmFilled = form.admin_password_confirm.length > 0;
  const passwordsMatch =
    confirmFilled && form.admin_password === form.admin_password_confirm;

  const set =
    <K extends keyof FormState>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  /* Consulta el documento (RUC o DNI en Perú) contra el catálogo del
     backend y autocompleta datos. Enruta por `empresa_tipo_documento`:
     - RUC (11 dígitos) → nombre + dirección + ciudad de la empresa.
     - DNI (8 dígitos)  → nombre completo como empresa + apellidos + nombres
       del admin. Es la vía para personas naturales que se registran
       como empresa unipersonal. */
  const handleConsultarRuc = useCallback(async () => {
    const numero = form.empresa_numero_documento.trim();
    const tipo = form.empresa_tipo_documento;

    if (tipo === "DNI") {
      if (!/^\d{8}$/.test(numero)) {
        setRucError(s.dniDigitsError);
        sentryTrackConsultarDoc("DNI", false, "digits");
        return;
      }
      setRucError(null);
      setRucLoading(true);
      try {
        const data = await consultarDni(numero);
        setForm((f) => ({
          ...f,
          empresa_nombre: data.nombre_completo || f.empresa_nombre,
          empresa_direccion: data.direccion || f.empresa_direccion,
          admin_nombre: data.nombres || f.admin_nombre,
          admin_apellido_paterno:
            data.apellido_paterno || f.admin_apellido_paterno,
          admin_apellido_materno:
            data.apellido_materno || f.admin_apellido_materno,
        }));
        sentryTrackConsultarDoc("DNI", true);
      } catch {
        setRucError(s.dniValidateError);
        sentryTrackConsultarDoc("DNI", false, "api");
      } finally {
        setRucLoading(false);
      }
      return;
    }

    if (!/^\d{11}$/.test(numero)) {
      setRucError(s.rucDigitsError);
      sentryTrackConsultarDoc("RUC", false, "digits");
      return;
    }
    setRucError(null);
    setRucLoading(true);
    try {
      const data = await consultarRuc(numero);
      setForm((f) => ({
        ...f,
        empresa_nombre: data.nombre || f.empresa_nombre,
        empresa_direccion: data.direccion || f.empresa_direccion,
        empresa_ciudad:
          data.distrito || data.provincia || data.departamento || f.empresa_ciudad,
      }));
      sentryTrackConsultarDoc("RUC", true);
    } catch {
      setRucError(s.rucValidateError);
      sentryTrackConsultarDoc("RUC", false, "api");
    } finally {
      setRucLoading(false);
    }
  }, [
    form.empresa_numero_documento,
    form.empresa_tipo_documento,
    s.rucDigitsError,
    s.rucValidateError,
    s.dniDigitsError,
    s.dniValidateError,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    sentryTrackSubmit("start");

    /* Rubro obligatorio — el paquete define qué funciones se activan y
       cataloga la empresa. Sin rubro no seguimos. */
    if (!form.codigo_paquete) {
      setSubmitError(s.rubroRequired);
      sentryTrackSubmit("error", "no-rubro");
      return;
    }

    const pwdCode = getPasswordErrorCode(form.admin_password);
    if (pwdCode === "length") {
      setSubmitError(s.pwdLengthError);
      return;
    }
    if (pwdCode === "complexity") {
      setSubmitError(s.pwdComplexityError);
      return;
    }
    if (form.admin_password !== form.admin_password_confirm) {
      setSubmitError(s.pwdNoMatch);
      return;
    }

    const paisCodigo = selectedPais?.codigo || form.empresa_pais;

    const payload: RegistroPayload = {
      empresa_nombre: form.empresa_nombre.trim(),
      empresa_tipo_documento: form.empresa_tipo_documento,
      empresa_numero_documento: form.empresa_numero_documento.trim(),
      empresa_pais: paisCodigo,
      empresa_email: form.empresa_email.trim(),
      empresa_telefono: form.empresa_telefono.trim(),
      empresa_ciudad: form.empresa_ciudad.trim(),
      empresa_direccion: form.empresa_direccion.trim(),
      admin_nombre: form.admin_nombre.trim(),
      admin_apellido_paterno: form.admin_apellido_paterno.trim(),
      admin_apellido_materno: form.admin_apellido_materno.trim(),
      admin_email: form.admin_email.trim(),
      admin_password: form.admin_password,
      admin_cargo: form.admin_cargo.trim(),
      codigo_paquete: form.codigo_paquete,
      empresa_timezone: form.empresa_timezone,
    };

    setSubmitting(true);
    try {
      const resp = await registrarEmpresa(payload);
      sentryTrackSubmit("ok", form.codigo_paquete);

      /* Flujo "Suscribirme ahora": el signup vino desde pricing con
         `?checkout=1&plan=...&periodicidad=...`. Encadenar el checkout
         MP con el token JWT recién emitido y redirigir al init_point.
         El pricing pasa `annual|monthly` (inglés — enum `BillingCycle`);
         acá lo normalizamos al vocabulario español que espera el backend. */
      const periodicidadBackend =
        periodicidadPreseleccionada === "anual" || periodicidadPreseleccionada === "annual"
          ? "anual"
          : "mensual";

      /* SSO al saas: guardamos los tokens en localStorage para que
         `CallbackPage` los recoja al aterrizar. Usamos localStorage
         (no query params) porque MP tiene un límite de longitud en
         `back_url` y los JWT (~400 chars c/u) hacen que la URL supere
         los ~2000 chars aceptados por MP → devuelve "Tenemos un
         problema". El TTL (10 min) evita que tokens viejos de una
         sesión abandonada auto-loguen a otro visitante que use el
         mismo navegador. */
      try {
        localStorage.setItem(
          "inxora_sso_pending",
          JSON.stringify({
            token:     resp.token_acceso,
            refresh:   resp.token_refresh,
            issued_at: Date.now(),
          }),
        );
      } catch {
        /* localStorage bloqueado (modo privado antiguo) — el callback
           caerá a login normal, no rompemos el flujo. */
      }
      const callbackUrl = SAAS_CALLBACK_URL;

      if (
        modoCheckout &&
        (planPreseleccionado === "start" || planPreseleccionado === "growth" || planPreseleccionado === "scale")
      ) {
        try {
          const co = await iniciarCheckoutSuscripcion(
            {
              codigo_plan: planPreseleccionado,
              periodicidad: periodicidadBackend,
              moneda: monedaCheckout,
              email_pagador: payload.admin_email,
              // Tras el pago MP redirige al callback SSO del saas con
              // los tokens en el query → usuario entra logueado al
              // dashboard sin pantalla intermedia.
              back_url_override: callbackUrl,
            },
            resp.token_acceso,
          );
          window.location.assign(co.url);
          return; // el navegador va a MP; no seguimos.
        } catch (chkErr) {
          const chkMsg = extractApiError(chkErr, s.submitError);
          setSubmitError(
            `Cuenta creada, pero no pudimos iniciar el pago automáticamente: ${chkMsg}. ` +
            `Iniciá sesión y suscribite desde Configuración.`,
          );
          sentryTrackSubmit("error", `checkout_falla: ${chkMsg}`);
          // NO marcamos `submitted=true` para que el usuario vea el
          // banner de error rojo arriba del form en vez del pantallazo
          // verde "cuenta creada" (que ocultaría el error).
          return;
        }
      }

      /* Flujo "Prueba gratis" (sin checkout): auto-loguear directo al
         saas — sin pantalla intermedia ni email mentiroso. */
      window.location.assign(callbackUrl);
      return;
    } catch (err) {
      const msg = extractApiError(err, s.submitError);
      setSubmitError(msg);
      // Estatus HTTP si el helper lo capturó en `err.status` — útil para
      // separar 409 (email/RUC duplicado) de 500 (bug real).
      const status = (err as { status?: number })?.status;
      sentryTrackSubmit("error", status ? `${status}: ${msg}` : msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <RouterLink to={ROUTES.home} className={styles.brand}>
            <img src="/LOGO-35.svg" alt="INXORA" />
          </RouterLink>
          <div className={styles.successState}>
            <span
              className={`material-symbols-rounded ${styles.successIcon}`}
              aria-hidden
            >
              check_circle
            </span>
            <h1 className={styles.successTitle}>{s.successTitle}</h1>
            <p className={styles.successSub}>
              {s.successSubPre}
              <strong>{form.admin_email}</strong>
              {s.successSubPost}
            </p>
            <a className={styles.primaryBtn} href={SAAS_LOGIN_URL}>
              {s.successCta}
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          {/* Si el usuario está en paso 2 y arrancó en paso 1, el link
              vuelve al selector de plan (no al home). En el resto de
              casos va al home como antes. */}
          {paso === 2 && pasoPor1 ? (
            <button
              type="button"
              onClick={volverAPaso1}
              className={styles.backLink}
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" aria-hidden>
                arrow_back
              </span>
              Cambiar de plan
            </button>
          ) : (
            <RouterLink to={ROUTES.home} className={styles.backLink}>
              <span className="material-symbols-rounded" aria-hidden>
                arrow_back
              </span>
              {s.back}
            </RouterLink>
          )}
        </header>

        <div className={styles.intro}>
          <RouterLink to={ROUTES.home} className={styles.brand}>
            <img src="/LOGO-35.svg" alt="INXORA" />
          </RouterLink>

          {pasoPor1 && (
            <ol
              aria-label="Pasos del registro"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                listStyle: "none",
                padding: 0,
                margin: "0 0 16px 0",
                fontSize: 13,
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--inx-navy)", fontWeight: 500 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 22, height: 22, borderRadius: "50%",
                  background: "var(--inx-cyan, #139ed4)", color: "#fff",
                  fontSize: 12, fontWeight: 600,
                }}>1</span>
                Plan
              </li>
              <li style={{
                display: "flex", alignItems: "center", gap: 6,
                color: paso === 2 ? "var(--inx-navy)" : "rgba(23,29,76,0.4)",
                fontWeight: paso === 2 ? 500 : 400,
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 22, height: 22, borderRadius: "50%",
                  background: paso === 2 ? "var(--inx-cyan, #139ed4)" : "rgba(23,29,76,0.10)",
                  color: paso === 2 ? "#fff" : "rgba(23,29,76,0.5)",
                  fontSize: 12, fontWeight: 600,
                }}>2</span>
                Cuenta
              </li>
            </ol>
          )}

          {paso === 2 && (
            <>
              <h1 className={styles.title}>{s.title}</h1>
              <p className={styles.sub}>
                {s.haveAccount}{" "}
                <a className={styles.loginLink} href={SAAS_LOGIN_URL}>
                  {s.signIn}
                </a>
              </p>
              {/* Chip visible cuando el signup vino del pricing (con o sin
                  checkout auto). Confirma al usuario qué eligió antes de
                  completar el form + permite volver a cambiarlo. */}
              {planPreseleccionado && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 12,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: modoCheckout ? "rgba(19,158,212,0.10)" : "rgba(23,29,76,0.06)",
                    border: `1px solid ${modoCheckout ? "rgba(19,158,212,0.35)" : "rgba(23,29,76,0.15)"}`,
                    fontSize: 13,
                    color: "var(--inx-navy)",
                  }}
                >
                  <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 16 }}>
                    {modoCheckout ? "credit_card" : "bolt"}
                  </span>
                  <span>
                    {modoCheckout
                      ? "Después del registro: pagar plan "
                      : "Prueba gratis con plan "}
                    <strong style={{ textTransform: "capitalize" }}>{planPreseleccionado}</strong>
                    {periodicidadPreseleccionada && (
                      <> · <strong>{labelPeriodicidad(periodicidadPreseleccionada)}</strong></>
                    )}
                  </span>
                  {/* Link para volver al paso 1 y cambiar la elección.
                      Solo aparece si arrancó desde paso 1 — si vino del
                      pricing del landing lo mandamos a cambiar allá para
                      no perder contexto. */}
                  {pasoPor1 && (
                    <button
                      type="button"
                      onClick={volverAPaso1}
                      style={{
                        marginLeft: 4, padding: "2px 8px", borderRadius: 999,
                        border: "1px solid transparent", background: "transparent",
                        color: "var(--inx-cyan, #139ed4)", fontSize: 12,
                        fontWeight: 500, cursor: "pointer",
                      }}
                    >
                      Cambiar
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {paso === 1 && (
          <Paso1ElegirPlan
            onElegir={handleEleccionPlan}
            periodicidadInicial={
              periodicidadPreseleccionada === "anual" || periodicidadPreseleccionada === "annual"
                ? "annual"
                : "monthly"
            }
          />
        )}

        {paso === 2 && (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* ── Rubro (paquete a aplicar) ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.rubroSection}</h2>
            <p className={styles.sectionSubtitle}>{s.rubroSubtitle}</p>

            {paquetesLoading && (
              <p className={styles.rubroStatus}>{s.rubroLoading}</p>
            )}
            {paquetesError && (
              <p className={styles.fieldError}>{paquetesError}</p>
            )}

            {!paquetesLoading && !paquetesError && (
              <div
                className={styles.rubroGrid}
                role="radiogroup"
                aria-label={s.rubroSection}
              >
                {paquetes.map((p) => {
                  const seleccionado = form.codigo_paquete === p.codigo;
                  const disabled = !p.activo;
                  return (
                    <button
                      key={p.codigo}
                      type="button"
                      role="radio"
                      aria-checked={seleccionado}
                      aria-disabled={disabled}
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;
                        sentryTrackRubroElegido(p.codigo);
                        setForm((f) => ({ ...f, codigo_paquete: p.codigo }));
                      }}
                      className={[
                        styles.rubroCard,
                        seleccionado && styles.rubroCardSelected,
                        disabled && styles.rubroCardDisabled,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      title={disabled ? s.rubroSoonHint : undefined}
                    >
                      {disabled && (
                        <span className={styles.rubroBadge}>{s.rubroSoon}</span>
                      )}
                      <span
                        className={`material-symbols-rounded ${styles.rubroIcon}`}
                        aria-hidden
                      >
                        {iconoRubro(p.codigo)}
                      </span>
                      <h3 className={styles.rubroNombre}>{p.nombre}</h3>
                      {p.descripcion && (
                        <p className={styles.rubroDesc}>{p.descripcion}</p>
                      )}
                      {!disabled && p.verticales.length > 0 && (
                        <div className={styles.rubroFuncionesWrap}>
                          <span className={styles.rubroFuncionesLabel}>
                            {s.rubroIncludes}
                          </span>
                          <ul className={styles.rubroFuncionesList}>
                            {p.verticales.map((f) => (
                              <li key={f} className={styles.rubroFuncionChip}>
                                {labelFuncion(f)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── Datos de la empresa ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.companySection}</h2>

            <Field label={s.countryLabel} htmlFor="empresa_pais">
              <select
                id="empresa_pais"
                className={styles.input}
                value={form.empresa_pais}
                onChange={set("empresa_pais")}
                required
                disabled={paisesLoading || !!paisesError}
              >
                <option value="">
                  {paisesLoading ? s.countryLoading : s.countryPlaceholder}
                </option>
                {paises.map((p) => (
                  <option key={p.codigo} value={p.codigo}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              {paisesError && <p className={styles.fieldError}>{paisesError}</p>}
            </Field>

            {/* Zona horaria — misma lista que app-inxora (Intl.supportedValuesOf
                con fallback a set curado). Default = TZ del navegador. */}
            <Field
              label={s.timezoneLabel}
              htmlFor="empresa_timezone"
              hint={s.timezoneHint}
            >
              <select
                id="empresa_timezone"
                className={styles.input}
                value={form.empresa_timezone}
                onChange={set("empresa_timezone")}
                required
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label={s.docLabel}
              htmlFor="empresa_numero_documento"
              wide
            >
              <div className={styles.inlineField}>
                <select
                  id="empresa_tipo_documento"
                  className={styles.input}
                  value={form.empresa_tipo_documento}
                  onChange={set("empresa_tipo_documento")}
                  required
                  aria-label={s.docTypeAria}
                >
                  {peruSelected ? (
                    <>
                      <option value="RUC">{s.docTypeRUC}</option>
                      <option value="DNI">{s.docTypeDNI}</option>
                    </>
                  ) : (
                    <>
                      <option value="ID">{s.docTypeID}</option>
                      <option value="OTRO">{s.docTypeOther}</option>
                    </>
                  )}
                </select>
                <input
                  id="empresa_numero_documento"
                  className={styles.input}
                  type="text"
                  placeholder={
                    peruSelected
                      ? s.docNumberPlaceholderPE
                      : s.docNumberPlaceholderOther
                  }
                  value={form.empresa_numero_documento}
                  onChange={set("empresa_numero_documento")}
                  required
                />
                {peruSelected &&
                  (form.empresa_tipo_documento === "RUC" ||
                    form.empresa_tipo_documento === "DNI") && (
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={handleConsultarRuc}
                      disabled={rucLoading}
                    >
                      {rucLoading
                        ? form.empresa_tipo_documento === "DNI"
                          ? s.consultingDni
                          : s.consultingRuc
                        : form.empresa_tipo_documento === "DNI"
                          ? s.consultDni
                          : s.consultRuc}
                    </button>
                  )}
              </div>
              {rucError && <p className={styles.fieldError}>{rucError}</p>}
              <p className={styles.controlNote}>{s.docHint}</p>
            </Field>

            <Field label={s.companyNameLabel} htmlFor="empresa_nombre">
              <input
                id="empresa_nombre"
                className={styles.input}
                type="text"
                placeholder={s.companyNamePlaceholder}
                value={form.empresa_nombre}
                onChange={set("empresa_nombre")}
                required
              />
            </Field>

            <Field
              label={s.companyEmailLabel}
              htmlFor="empresa_email"
              hint={s.companyEmailHint}
            >
              <input
                id="empresa_email"
                className={styles.input}
                type="email"
                placeholder={s.companyEmailPlaceholder}
                value={form.empresa_email}
                onChange={set("empresa_email")}
                required
                autoComplete="email"
              />
            </Field>

            <Field label={s.phoneLabel} htmlFor="empresa_telefono">
              <input
                id="empresa_telefono"
                className={styles.input}
                type="tel"
                placeholder={s.phonePlaceholder}
                value={form.empresa_telefono}
                onChange={set("empresa_telefono")}
                required
                autoComplete="tel"
              />
            </Field>

            <Field label={s.addressLabel} htmlFor="empresa_direccion">
              <input
                id="empresa_direccion"
                className={styles.input}
                type="text"
                placeholder={s.addressPlaceholder}
                value={form.empresa_direccion}
                onChange={set("empresa_direccion")}
                required
              />
            </Field>

            <Field label={s.cityLabel} htmlFor="empresa_ciudad">
              <input
                id="empresa_ciudad"
                className={styles.input}
                type="text"
                placeholder={s.cityPlaceholder}
                value={form.empresa_ciudad}
                onChange={set("empresa_ciudad")}
                required
              />
            </Field>
          </section>

          {/* ── Usuario administrador ── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.adminSection}</h2>

            <Field label={s.fullNameLabel} htmlFor="admin_nombre" wide>
              <div className={styles.inlineField}>
                <input
                  id="admin_nombre"
                  className={styles.input}
                  type="text"
                  placeholder={s.firstNamePlaceholder}
                  value={form.admin_nombre}
                  onChange={set("admin_nombre")}
                  required
                  autoComplete="given-name"
                />
                <input
                  id="admin_apellido_paterno"
                  className={styles.input}
                  type="text"
                  placeholder={s.lastNamePPlaceholder}
                  value={form.admin_apellido_paterno}
                  onChange={set("admin_apellido_paterno")}
                  required
                  autoComplete="family-name"
                />
                <input
                  id="admin_apellido_materno"
                  className={styles.input}
                  type="text"
                  placeholder={s.lastNameMPlaceholder}
                  value={form.admin_apellido_materno}
                  onChange={set("admin_apellido_materno")}
                  required
                  autoComplete="additional-name"
                />
              </div>
            </Field>

            <Field label={s.positionLabel} htmlFor="admin_cargo">
              <input
                id="admin_cargo"
                className={styles.input}
                type="text"
                placeholder={s.positionPlaceholder}
                value={form.admin_cargo}
                onChange={set("admin_cargo")}
                required
                autoComplete="organization-title"
              />
            </Field>

            <Field
              label={s.adminEmailLabel}
              htmlFor="admin_email"
              hint={s.adminEmailHint}
            >
              <input
                id="admin_email"
                className={styles.input}
                type="email"
                placeholder={s.adminEmailPlaceholder}
                value={form.admin_email}
                onChange={set("admin_email")}
                required
                autoComplete="email"
              />
            </Field>

            <Field label={s.passwordLabel} htmlFor="admin_password">
              <div className={styles.inputWrap}>
                <input
                  id="admin_password"
                  className={`${styles.input} ${styles.inputWithAffix}`}
                  type={showPassword ? "text" : "password"}
                  placeholder={s.passwordPlaceholder}
                  value={form.admin_password}
                  onChange={set("admin_password")}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? s.pwdHide : s.pwdShow}
                  aria-pressed={showPassword}
                  title={showPassword ? s.pwdHide : s.pwdShow}
                >
                  <span className="material-symbols-rounded" aria-hidden>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              <PasswordStrength value={form.admin_password} copy={s} />
            </Field>

            <Field
              label={s.confirmPasswordLabel}
              htmlFor="admin_password_confirm"
              hint={
                confirmFilled ? (
                  <span
                    className={passwordsMatch ? styles.matchOk : styles.matchBad}
                  >
                    {passwordsMatch ? s.pwdMatch : s.pwdNoMatch}
                  </span>
                ) : undefined
              }
            >
              <div className={styles.inputWrap}>
                <input
                  id="admin_password_confirm"
                  className={`${styles.input} ${styles.inputWithAffix}`}
                  type="password"
                  placeholder={s.confirmPasswordPlaceholder}
                  value={form.admin_password_confirm}
                  onChange={set("admin_password_confirm")}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                {confirmFilled && (
                  <span
                    className={`${styles.matchIcon} ${
                      passwordsMatch ? styles.matchOk : styles.matchBad
                    }`}
                    aria-hidden
                  >
                    <span className="material-symbols-rounded">
                      {passwordsMatch ? "check_circle" : "cancel"}
                    </span>
                  </span>
                )}
              </div>
            </Field>
          </section>

          {submitError && (
            <p className={styles.submitError} role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={submitting}
          >
            {submitting ? s.submitting : s.submit}
            {!submitting && (
              <span className="material-symbols-rounded" aria-hidden>
                arrow_forward
              </span>
            )}
          </button>

          <p className={styles.legalNote}>
            {s.legalPre}
            <RouterLink to={ROUTES.terminos}>{s.legalTerms}</RouterLink>
            {s.legalMid}
            <RouterLink to={ROUTES.acuerdoPiloto}>{s.legalPilot}</RouterLink>
            {s.legalAnd}
            <RouterLink to={ROUTES.politicaPrivacidad}>
              {s.legalPrivacy}
            </RouterLink>
            {s.legalEnd}
          </p>
        </form>
        )}
      </div>
    </main>
  );
};

type FieldProps = {
  label: string;
  htmlFor?: string;
  /** Texto/contenido de ayuda mostrado a la derecha del campo (estilo Oracle). */
  hint?: React.ReactNode;
  /** Si el control debe ocupar también el ancho de la columna de ayuda. */
  wide?: boolean;
  /** Marca el campo como obligatorio (asterisco). Por defecto true. */
  required?: boolean;
  children: React.ReactNode;
};

const Field = ({
  label,
  htmlFor,
  hint,
  wide = false,
  required = true,
  children,
}: FieldProps) => (
  <div className={styles.field}>
    <label className={styles.label} htmlFor={htmlFor}>
      {label}
      {required && (
        <span className={styles.req} aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
    <div
      className={[styles.fieldControl, wide ? styles.fieldControlWide : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
    {!wide && <div className={styles.fieldHint}>{hint}</div>}
  </div>
);

/** Indicador de requisitos + barra de progreso de seguridad de la contraseña. */
const PasswordStrength = ({
  value,
  copy,
}: {
  value: string;
  copy: SignupCopy;
}) => {
  const checks = getPasswordChecks(value);
  const score = PASSWORD_RULE_KEYS.reduce(
    (n, key) => n + (checks[key] ? 1 : 0),
    0,
  );
  const pct = Math.round((score / PASSWORD_RULE_KEYS.length) * 100);
  const level = score <= 2 ? "weak" : score <= 4 ? "medium" : "strong";
  const levelLabel =
    level === "weak"
      ? copy.pwdWeak
      : level === "medium"
        ? copy.pwdMedium
        : copy.pwdStrong;
  const fillClass =
    level === "weak"
      ? styles.pwdBarWeak
      : level === "medium"
        ? styles.pwdBarMedium
        : styles.pwdBarStrong;
  const textClass =
    level === "weak"
      ? styles.pwdLevelWeak
      : level === "medium"
        ? styles.pwdLevelMedium
        : styles.pwdLevelStrong;

  return (
    <div className={styles.pwdStrength}>
      <div
        className={styles.pwdBarTrack}
        role="progressbar"
        aria-label={copy.passwordLabel}
        aria-valuemin={0}
        aria-valuemax={PASSWORD_RULE_KEYS.length}
        aria-valuenow={score}
      >
        <span
          className={`${styles.pwdBarFill} ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={styles.pwdHint}>
        {value ? (
          <>
            {copy.pwdStrength}{" "}
            <strong className={textClass}>{levelLabel}</strong>
          </>
        ) : (
          copy.pwdMustMeet
        )}
      </p>
      <ul className={styles.pwdRules}>
        {PASSWORD_RULE_KEYS.map((key, i) => {
          const ok = checks[key];
          return (
            <li
              key={key}
              className={ok ? styles.pwdRuleOk : styles.pwdRulePending}
            >
              <span className="material-symbols-rounded" aria-hidden>
                {ok ? "check_circle" : "radio_button_unchecked"}
              </span>
              <span>{copy.pwdRules[i]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CrearCuentaPage;
