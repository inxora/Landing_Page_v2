/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  /** URL del portal SaaS (proveedores / productos). Opcional; por defecto app.inxora.com */
  readonly VITE_INXORA_SAAS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
