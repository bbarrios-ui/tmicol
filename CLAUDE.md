# CLAUDE.md — repo tmicol

Sitio web institucional de **TECNOLOGÍAS MÉDICAS INTEGRALES COLOMBIA SAS** (sigla estatutaria **TMI SAS**; marca "TMI"), distribuidora de tecnologías médicas con domicilio en Montería, Córdoba (Colombia). Datos legales confirmados por estatutos: dirección Cra. 35 N° 44-16 Montería, teléfono 301 380 4160. Sitio **multi-página con Astro** (salida estática), desplegado en Vercel. El mapa de URLs y la estructura de `src/` están en PLAN.md §4 y §7 — cada sección del sitio tiene su propia URL (`/nosotros`, `/lineas/medicamentos`, `/cotizar`, etc.); el layout compartido vive en `src/layouts/Base.astro`. Diseño moderno, fresco y mobile-first.

> La v0 era un `index.html` único; sirve como referencia de estilos y contenido durante la migración y se elimina al terminar la Fase 1.

## Regla de oro: honestidad

TMI es una **empresa nueva**. Está PROHIBIDO en todo el sitio:
- Cifras inventadas de clientes, proveedores, marcas, años de experiencia o metros de bodega.
- Testimonios ficticios o marcas de terceros sin autorización.
- Presentar imágenes generadas por IA como instalaciones o empleados reales con nombre.
- Links "Descargar" que no llevan a ningún documento real (usar "próximamente").

En su lugar: compromisos medibles (tiempo de cotización, acceso directo al Químico Farmacéutico, trazabilidad, cobertura regional). Ver PLAN.md §3.

## Identidad visual

Colores en variables CSS de `:root` (no hardcodear hex nuevos): `--navy #0B2545`, `--navy-2 #123a68`, `--blue #1E6FB8`, `--accent #29B6F6`, `--accent-2 #5FD0F3`, `--bg #F5F8FB`. Verde `#25D366` SOLO para CTAs de WhatsApp. Tipografía: Poppins. Idioma: español (Colombia), `lang="es-CO"`. Tono: profesional B2B sector salud, cercano, sin superlativos vacíos.

En v1 no se usan emojis como iconografía: SVGs de una sola familia (stroke 1.5–2px) e imágenes WebP en `assets/img/`.

## Datos reales pendientes (NO inventar)

Toda la información faltante del negocio está inventariada en **PENDIENTES.md** (WhatsApp comercial, NIT, correos, permisos INVIMA, misión/visión oficiales, dominio, etc.). Regla: si un dato está en PENDIENTES.md sin responder, en el código va placeholder + comentario `TODO`; nunca un valor inventado. El WhatsApp actual `573000000000` es placeholder.

## Flujo de trabajo

- Nunca commitear directo a `main`: rama `v1/<tema>` + PR. Cada PR genera Preview Deployment en Vercel.
- Commits en español, mensaje corto tipo `v1: <qué cambió>`.
- El plan de trabajo por fases está en PLAN.md §8 — seguirlo en orden.
