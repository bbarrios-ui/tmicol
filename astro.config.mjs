// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// TODO(PENDIENTES.md §6): cuando exista dominio propio, configurar `site: 'https://tmicol.co'`
// para sitemap y URLs canónicas (Fase 3).
export default defineConfig({
  // Salida estática con adaptador: las páginas se prerenderizan como siempre y
  // solo las rutas con `prerender = false` (p. ej. /api/solicitud) corren como
  // funciones serverless en Vercel. includeFiles empaqueta las plantillas de
  // vinculación dentro de la función para llenarlas con exceljs.
  adapter: vercel({
    includeFiles: [
      './docs/formatos/FO-VC-001-vinculacion-clientes.xlsx',
      './docs/formatos/CA-FO-01-vinculacion-proveedores.xlsx',
    ],
  }),
});
