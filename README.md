# Atalaya

Prototipo visual de gestión sindical — delegación central. Frontend mock sin backend, listo para demo y deploy en Vercel.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- react-router-dom
- lucide-react
- recharts

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy en Vercel

1. Importá el repo [salazjuan67/atalaya](https://github.com/salazjuan67/atalaya) en Vercel.
2. Vercel detecta Vite automáticamente:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. El archivo `vercel.json` incluye rewrites para react-router (SPA).

## Rutas

| Ruta | Pantalla |
|------|----------|
| `/login` | Inicio de sesión (mock) |
| `/tablero` | Vista macro gerencial |
| `/empresas` | Listado de empresas |
| `/empresas/:id` | Empresa 360 |
| `/cargar-visita` | Carga operativa de visita |
| `/afiliados` | Afiliados |
| `/cursos` | Cursos |
