// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// TODO(PENDIENTES.md §6): cuando exista dominio propio, configurar `site: 'https://tmicol.co'`
// para sitemap y URLs canónicas (Fase 3).
export default defineConfig({
  // Salida estática con adaptador: las páginas se prerenderizan como siempre y
  // solo las rutas con `prerender = false` (p. ej. /api/solicitud) corren como
  // funciones serverless en Vercel.
  adapter: vercel(),
});
