/**
 * Base URL del backend de gestión.
 *
 * - En `pnpm dev`: default a "/api/v1" → el proxy Vite forwardea a
 *   `VITE_PROXY_TARGET` (default `http://localhost:8000`). Para pegarle
 *   a prod desde dev, crear `.env.development.local` con
 *   `VITE_PROXY_TARGET=https://apisaas.inxora.com`.
 * - En build de producción (Vercel): el rewrite del hosting mapea
 *   "/api/*" a la API real. Alternativamente setear `VITE_API_URL` con
 *   la URL absoluta (requiere CORS habilitado en el backend).
 */
export const GESTION_API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "/api/v1";

export type Pais = {
  codigo: string;
  nombre: string;
};

export type ConsultarRucResult = {
  ruc: string;
  nombre?: string;
  estado?: string;
  condicion?: string;
  direccion?: string;
  distrito?: string;
  provincia?: string;
  departamento?: string;
};

/* Respuesta de `/catalogo/consultar-dni`. Alimenta los campos del
   admin (nombres/apellidos) y también el nombre + dirección de la
   "empresa" cuando el registro es como persona natural. */
export type ConsultarDniResult = {
  dni: string;
  nombre_completo?: string;
  nombres?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  direccion?: string;
};

export type RegistroPayload = {
  empresa_nombre: string;
  empresa_tipo_documento: string;
  empresa_numero_documento: string;
  empresa_pais: string;
  empresa_email: string;
  empresa_telefono: string;
  empresa_ciudad: string;
  empresa_direccion: string;
  admin_nombre: string;
  admin_apellido_paterno: string;
  admin_apellido_materno: string;
  admin_email: string;
  admin_password: string;
  admin_cargo: string;
  /* Rubro elegido por la empresa (paquete a aplicar al crearse). El
     backend usa esto para setear `empresa.vertical` + activar las
     funciones incluidas + sembrar catálogos default. */
  codigo_paquete: string;
  /* IANA timezone (ej. "America/Lima"). Se guarda en `empresa.timezone`
     y afecta todas las fechas user-facing del backend + frontend. */
  empresa_timezone: string;
};

/* Rubro seleccionable en el signup. `activo=false` se muestra como
   "Próximamente" y no se puede elegir. Las funciones incluidas viajan
   en `verticales` por compat con el backend actual. */
export type Paquete = {
  codigo: string;
  nombre: string;
  descripcion: string | null;
  icono_url: string | null;
  activo: boolean;
  verticales: string[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${GESTION_API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let detail: unknown = null;
    try {
      detail = await res.json();
    } catch {
      /* ignore */
    }
    const err = new Error(`HTTP ${res.status}`) as Error & {
      status?: number;
      detail?: unknown;
    };
    err.status = res.status;
    err.detail = detail;
    throw err;
  }
  return res.json() as Promise<T>;
}

export function fetchPaises(signal?: AbortSignal): Promise<Pais[]> {
  return request<Pais[]>("/catalogo/paises", { method: "GET", signal });
}

/** Trae TODOS los rubros del catálogo, incluidos los "próximamente"
 *  (`activo=false`) — la landing los muestra deshabilitados con badge. */
export function fetchPaquetes(signal?: AbortSignal): Promise<Paquete[]> {
  return request<Paquete[]>("/paquete?activos_solo=false", { method: "GET", signal });
}

export function consultarRuc(
  ruc: string,
  signal?: AbortSignal,
): Promise<ConsultarRucResult> {
  return request<ConsultarRucResult>("/catalogo/consultar-ruc", {
    method: "POST",
    body: JSON.stringify({ ruc }),
    signal,
  });
}

/** Consulta un DNI peruano (8 dígitos) contra RENIEC vía api.json.pe.
 *  Rellena nombres/apellidos del admin + nombre completo de la empresa
 *  cuando el registro es persona natural. */
export function consultarDni(
  dni: string,
  signal?: AbortSignal,
): Promise<ConsultarDniResult> {
  return request<ConsultarDniResult>("/catalogo/consultar-dni", {
    method: "POST",
    body: JSON.stringify({ dni }),
    signal,
  });
}

/* Respuesta del registro. Incluye tokens JWT desde 2026-08-01 para
   que el landing pueda encadenar el checkout Mercado Pago inmediato
   ("Suscribirme ahora") sin un login extra. */
export type RegistroResponse = {
  mensaje:       string;
  empresa_id:    string;
  usuario_id:    string;
  token_acceso:  string;
  token_refresh: string;
};

export function registrarEmpresa(payload: RegistroPayload): Promise<RegistroResponse> {
  return request<RegistroResponse>("/auth/registro", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ─── Suscripción · Mercado Pago (2026-08-01) ─────────────────
 * Endpoints privados (requieren JWT). Se usan solo desde el landing
 * en el flujo "Suscribirme ahora": registro → tokens → checkout. */

export type IniciarCheckoutPayload = {
  codigo_plan:    "start" | "growth" | "scale";
  periodicidad?:  "mensual" | "anual";
  moneda?:        "USD" | "PEN";
  email_pagador?: string;
  /* Override del back_url que MP usa post-pago. El landing lo usa
     para armar el SSO al saas: `saas.inxora.com/callback?token=...`. */
  back_url_override?: string;
};

export type CheckoutRespuesta = {
  url:              string;   // init_point de MP al que redirigir
  mp_preapproval_id: string;
};

export function iniciarCheckoutSuscripcion(
  payload: IniciarCheckoutPayload,
  tokenAcceso: string,
): Promise<CheckoutRespuesta> {
  return request<CheckoutRespuesta>("/suscripcion/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${tokenAcceso}`,
    },
  });
}
