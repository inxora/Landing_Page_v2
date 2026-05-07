export const GESTION_API_BASE = "https://apisaas.inxora.com/api/v1";

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

export function registrarEmpresa(payload: RegistroPayload): Promise<unknown> {
  return request("/auth/registro", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
