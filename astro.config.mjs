// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Dominio canónico: producción sirve en www (el apex redirige a www).
  site: 'https://www.tmicol.co',
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
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
