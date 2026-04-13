/**
 * Cliente API — mismo patrón que landingpage-inxora / ecommerce-inxora.
 * En el navegador: baseUrl vacío → fetch a /api/* (proxy en dev y rewrites en Vercel).
 * VITE_API_URL: definir solo para llamar al backend directo (y CORS debe permitir el origen).
 */

const getApiBaseUrl = (): string => import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

const DEFAULT_TIMEOUT_MS = 30000;

export type ApiClientOptions = RequestInit & {
  /** Timeout en milisegundos (por defecto 30000). El chat de Sara usa ~90000. */
  timeout?: number;
};

function parseErrorMessage(text: string): string {
  if (!text) return "Error desconocido";
  try {
    const json = JSON.parse(text) as {
      message?: string;
      error?: string | { message?: string };
      detail?: string | { message?: string } | Array<{ msg?: string; message?: string }>;
    };
    if (json.message) return json.message;
    if (json.error) {
      return typeof json.error === "string"
        ? json.error
        : json.error.message ?? text;
    }
    if (typeof json.detail === "string") return json.detail;
    if (Array.isArray(json.detail)) {
      return json.detail.map((d) => d.msg || d.message || "").filter(Boolean).join(", ") || text;
    }
    if (json.detail && typeof json.detail === "object" && "message" in json.detail) {
      return String((json.detail as { message?: string }).message ?? text);
    }
  } catch {
    return text;
  }
  return text;
}

export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options ?? {};
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const method = fetchOptions?.method || "GET";
  const hasBody = fetchOptions?.body !== undefined;

  const headers: HeadersInit = {
    Accept: "application/json",
    ...(fetchOptions?.headers ?? {}),
  };
  if ((method === "POST" || method === "PUT" || method === "PATCH") && hasBody) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
      credentials: "omit",
    });

    clearTimeout(timeoutId);

    const text = await response.text();
    if (!response.ok) {
      const errorMessage = parseErrorMessage(text) || response.statusText;
      throw new ApiError(response.status, response.statusText, errorMessage);
    }

    return (text ? JSON.parse(text) : {}) as T;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado. Intente de nuevo.");
    }
    throw err;
  }
}

export const api = {
  post: <T>(endpoint: string, body?: unknown, timeout?: number) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...(timeout != null ? { timeout } : {}),
    }),
};
