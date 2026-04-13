# Landing Page v2 (Inxora)

Sitio público de la landing Inxora: React 19, Vite 6, TypeScript, rutas legales, libro de reclamaciones y asistente **Sara Xora** (API `/api/chat/`).

**Repositorio:** [github.com/inxora/Landing_Page_v2](https://github.com/inxora/Landing_Page_v2)

## Requisitos

- **Node.js** 20 o superior
- **pnpm** (recomendado; el lockfile es `pnpm-lock.yaml`)

## Puesta en marcha

```bash
pnpm install
cp .env.example .env   # opcional; ver abajo
pnpm dev
```

- Desarrollo: [http://localhost:5173](http://localhost:5173) (puerto por defecto de Vite).

## Variables de entorno

Copia `.env.example` a `.env` si necesitas ajustar la API:

| Variable        | Descripción |
|----------------|-------------|
| `VITE_API_URL` | Vacío = peticiones a `/api/*` (proxy en `pnpm dev`, rewrites en Vercel). Solo rellenar para llamar directo al backend (requiere CORS). |

## Scripts

| Comando        | Acción |
|----------------|--------|
| `pnpm dev`     | Servidor de desarrollo |
| `pnpm build`   | `tsc` + build de producción en `build/` |
| `pnpm preview` | Vista previa del build |
| `pnpm lint`    | ESLint |

## Subir a GitHub

Si este directorio ya tiene `git init` y el remoto:

```bash
git remote -v
# origin  https://github.com/inxora/Landing_Page_v2.git

git push -u origin main
```

Si el repositorio remoto está vacío y es la primera subida:

```bash
git branch -M main
git push -u origin main
```

Si GitHub muestra un README o `.gitignore` creados al crear el repo, puede hacer falta integrar primero:

```bash
git pull origin main --allow-unrelated-histories
# resolver conflictos si los hay, luego:
git push -u origin main
```

## Despliegue

El proyecto incluye `vercel.json` para despliegue en Vercel (rewrites `/api/*` según tu configuración actual).
