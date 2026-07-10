/**
 * Sentry — observabilidad del landing público (signup + info pages).
 *
 * Espeja el setup de `app-inxora` pero con acentos propios del landing:
 * - Los eventos más críticos son los que rompen el signup (RUC/DNI que
 *   no responden, submit rechazado, paquetes que no cargan). Por eso
 *   habilitamos breadcrumbs específicos para el flujo — ver
 *   `sentryTrackSignup*` más abajo.
 * - Session Replay es especialmente valioso acá: cuando un prospecto
 *   se queda trabado registrándose, verás el video del intento (con
 *   texto e imágenes enmascarados por privacidad).
 *
 * Inactivo cuando `VITE_SENTRY_DSN` está vacío (dev local típico) —
 * no hace I/O, `Sentry.captureException` es no-op.
 *
 * Privacidad:
 * - `sendDefaultPii: false` — sin IPs ni headers.
 * - `maskAllText` + `blockAllMedia` en el replay: no capturamos el
 *   contenido de los campos (RUC, DNI, email, password) ni imágenes.
 *   Solo el timing de clicks / focus / navegación.
 */
import * as Sentry from "@sentry/react";

const DSN = (import.meta.env.VITE_SENTRY_DSN as string | undefined) ?? "";
const ENV = import.meta.env.MODE; // 'development' | 'production'
const RELEASE =
  (import.meta.env.VITE_APP_VERSION as string | undefined) ?? "dev";

export function initSentry(): void {
  if (!DSN) return;
  Sentry.init({
    dsn: DSN,
    environment: ENV,
    release: RELEASE,
    sendDefaultPii: false,

    // ─── Integraciones ─────────────────────────────────────────
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // ─── Sample rates ──────────────────────────────────────────
    // Tracing: 10% en prod, 100% en dev. Landing tiene menos tráfico
    // que el SaaS, por lo que 10% es holgado para detectar picos.
    tracesSampleRate: ENV === "production" ? 0.1 : 1.0,
    // Session Replay normal: 10% en prod, 0% en dev.
    replaysSessionSampleRate: ENV === "production" ? 0.1 : 0,
    // Session Replay cuando hay error: 100% — si el signup falla,
    // queremos el video sí o sí. Un intento de registro es oro.
    replaysOnErrorSampleRate: 1.0,
  });
}

/* ─── Breadcrumbs del flujo signup ─────────────────────────────
 *
 * Se llaman desde `crear-cuenta-page.tsx` en los momentos clave para
 * dejar rastro en Sentry aunque nadie llegue a lanzar una excepción.
 * Con esto el timeline de un error muestra `rubro:ferreteria` →
 * `ruc-consulta:OK` → `submit:400` en vez de solo "500 en /registro".
 * Todas son NO-OP si Sentry no está inicializado.
 */

function breadcrumb(category: string, message: string, data?: Record<string, unknown>) {
  if (!DSN) return;
  Sentry.addBreadcrumb({
    category,
    message,
    level: "info",
    data,
  });
}

export function sentryTrackRubroElegido(codigo: string): void {
  breadcrumb("signup.rubro", `Rubro elegido: ${codigo}`, { codigo });
}

export function sentryTrackConsultarDoc(tipo: "RUC" | "DNI", ok: boolean, msg?: string): void {
  breadcrumb(
    "signup.consulta_doc",
    `${tipo} ${ok ? "OK" : "ERROR"}${msg ? ` — ${msg}` : ""}`,
    { tipo, ok, msg },
  );
}

export function sentryTrackSubmit(estado: "start" | "ok" | "error", detalle?: string): void {
  breadcrumb("signup.submit", `Submit ${estado}${detalle ? ` — ${detalle}` : ""}`, {
    estado,
    detalle,
  });
}
