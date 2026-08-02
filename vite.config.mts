import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Target del proxy `/api/*`. Por default apunta al backend dev local
  // (http://localhost:8000); en dev remoto o para probar contra prod
  // se sobreescribe con `VITE_PROXY_TARGET=https://apisaas.inxora.com`
  // en `.env.development.local` (git-ignored).
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget =
    env.VITE_PROXY_TARGET?.trim() || "http://localhost:8000";
  const proxyIsHttps = proxyTarget.startsWith("https://");

  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    server: {
      host: true,
      // Landing en 5174 — reservamos 5173 para el app-inxora (SaaS) para
      // que ambos puedan correr simultáneos en dev sin chocar. `strictPort`
      // hace que Vite falle si 5174 está ocupado en vez de saltar a otro
      // puerto random (evita URLs sorpresa en el callback SSO).
      port: 5174,
      strictPort: true,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: proxyIsHttps,
        },
      },
    },
  };
});
