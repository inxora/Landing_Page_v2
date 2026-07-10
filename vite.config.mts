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
      port: 5173,
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
