# PLAN — TMI COL v1: sitio web institucional

> Documento de trabajo para ejecutar con Claude Code sobre el repo `bbarrios-ui/tmicol`.
> Fecha: agosto 2026 · Estado: aprobado para ejecución por fases.

---

## 1. Objetivo

Evolucionar la v0 (landing única) hacia un sitio institucional de nivel competitivo en el sector de distribución de tecnologías médicas en Colombia, tomando como referentes visuales y estructurales a **Allers** (allers.com.co) y **Éticos Serrano Gómez** (eticos.com), pero con la identidad de color propia de TMI y una estrategia de posicionamiento diseñada para una empresa **nueva**, sin inventar trayectoria.

## 2. Análisis de referentes

### Allers (allers.com.co)
Qué hacen bien y adoptamos:
- Header con contacto directo y WhatsApp siempre visible.
- Portafolio organizado por categorías y por marcas, con navegación jerárquica clara.
- Sección de ventajas competitivas con iconografía (disponibilidad, entregas, atención, servicio técnico).
- CTAs de cotización repetidos y consistentes ("¡Cotiza ahora!" → WhatsApp).
- Diseño B2B profesional, aireado, orientado a decisores de compras.

Qué usan y NOSOTROS NO podemos usar (y no vamos a imitar):
- "Desde 1955", "7 décadas al servicio".
- Testimonios nominados de clientes con relaciones de 5–20 años.
- "20.000 referencias", "2.500 m² de almacenamiento".
- Muro de logos de marcas internacionales representadas.

### Éticos Serrano Gómez (eticos.com)
Referente de distribuidor farmacéutico de la Costa Caribe: fuerte en logística regional, cobertura e imagen institucional seria. Adoptamos la idea de **identidad regional Caribe como fortaleza** (en nuestro caso: Córdoba y la región) y la seriedad institucional del sector salud. No copiamos cifras de cobertura ni infraestructura.

## 3. Estrategia de posicionamiento (la parte más importante)

**El problema:** Allers y Éticos ganan en trayectoria, clientes, catálogo e infraestructura. Si el sitio de TMI intenta parecer "un Allers chiquito", pierde por comparación directa. Y mentir (inflar cifras, inventar clientes) está descartado.

**La jugada: no competir en el mismo eje.** Ellos venden pasado (décadas, miles de clientes). TMI vende **presente y cercanía**: velocidad, acceso directo al experto, foco regional y transparencia. Todo verificable desde el día uno.

Pilares del mensaje (todos honestos, ninguno depende de antigüedad):

1. **Agilidad real** — "Cotizamos en horas, no en días." Con una operación pequeña, el gerente y el químico farmacéutico están a un WhatsApp de distancia. En un gigante, eres un ticket; en TMI, eres una llamada.
2. **Acceso directo al Químico Farmacéutico** — La consulta especializada no es un call center: es el Director Técnico. Esto ya existe en la v0 y se convierte en diferenciador central.
3. **Foco regional Córdoba** — Conocemos las instituciones, las rutas y las necesidades de la región. Cercanía física = entregas y soporte más rápidos que un despacho desde Bogotá o Barranquilla.
4. **Portafolio curado, no catálogo infinito** — En vez de "20.000 referencias", "te conseguimos lo que necesitas": sourcing dirigido con cumplimiento INVIMA verificado línea por línea.
5. **Transparencia de nacimiento** — La sección de rendición de cuentas existe desde el día uno, no como obligación sino como identidad. Empresa nueva = sin vicios, procesos limpios, documentación al día.

Lenguaje del sitio: en ningún lugar decimos "años de experiencia" ni cifras de clientes. Donde un competidor pondría "desde 1955", nosotros ponemos compromisos medibles: "cotización en menos de 24 horas hábiles", "respuesta directa del Director Técnico", "trazabilidad por lote en el 100% del portafolio".

### Correcciones de honestidad sobre la v0 (obligatorias)

La v0 heredó una sección de contadores con **"150+ clientes institucionales, 40+ proveedores, 25+ marcas"** y pills de "Marca A…G". Para una empresa nueva eso es exactamente el tipo de mentira que acordamos no decir. En la v1:

- ❌ Eliminar contadores de clientes/proveedores/marcas inventados.
- ✅ Reemplazar por "Nuestros compromisos": 4 promesas medibles (tiempo de cotización, acceso al QF, trazabilidad, cobertura regional).
- ❌ Eliminar pills de marcas placeholder. Si más adelante hay marcas reales autorizadas, se agregan con permiso escrito de cada una.
- ❌ No usar testimonios hasta tener clientes reales que autoricen los suyos.
- ✅ La sección de rendición de cuentas se mantiene, pero los cards de PDFs se marcan "disponible próximamente" hasta tener documentos reales (no links muertos "Descargar PDF" que fingen existir).

## 4. Arquitectura del sitio v1 — multi-página

El sitio deja de ser one-page: **cada área tiene su propia URL** (como eticos.com con `/canales-ventas/distribucion`, `/convenios-institucionales`). Beneficios: SEO por página, links compartibles por WhatsApp que llevan exacto a donde toca, y sensación de sitio institucional completo.

### Mapa de URLs

| URL | Página | Contenido |
|---|---|---|
| `/` | Home | Hero + compromisos + resumen de líneas (cards que enlazan a cada línea) + teaser de consulta QF + CTA cotizar |
| `/nosotros` | Nosotros | Misión, visión, valores, identidad regional honesta |
| `/lineas` | Líneas de venta | Overview de las 4 líneas con cards fotográficas |
| `/lineas/medicamentos` | Medicamentos | Detalle de la línea + subcategorías + CTA cotizar |
| `/lineas/insumos-medico-quirurgicos` | Insumos | ídem |
| `/lineas/equipos-biomedicos` | Equipos biomédicos | ídem (incluye instalación, mantenimiento, calibración) |
| `/lineas/laboratorio-clinico` | Laboratorio clínico | ídem |
| `/consulta-especializada` | Consulta con el QF | Qué es, en qué asesora, CTA agendar por WhatsApp |
| `/como-trabajamos` | Cómo trabajamos | Proceso en 4 pasos: solicitas → cotizamos <24h → validamos INVIMA → entregamos con trazabilidad. Sustituye el "track record" que no tenemos: proceso en lugar de historia |
| `/cotizar` | Cotización | Formulario → WhatsApp |
| `/trabaja-con-nosotros` | Empleo | Postulación por correo |
| `/proveedores` | Proveedores | Invitación y requisitos — para una empresa nueva, atraer proveedores pesa tanto como atraer clientes |
| `/transparencia` | Rendición de cuentas | Informes (marcados "próximamente" hasta tener PDFs reales) |
| `/contacto` | Contacto | Datos, mapa (cuando haya dirección), formulario/WhatsApp |

Todas las páginas comparten header (nav + CTA WhatsApp), footer y botón flotante de WhatsApp. El nav marca la página activa. En móvil: menú hamburguesa con las secciones de primer nivel.

Contenido por página (hereda lo definido antes): la home lleva el hero con foto ultra realista y mensaje "Tecnologías médicas con respuesta inmediata para las instituciones de salud de Córdoba y la región", la barra de compromisos que reemplaza a los contadores falsos, y cards de líneas con fotografía en lugar de emojis. `/consulta-especializada` se eleva con retrato profesional generado (sin nombre falso). Catálogo transaccional y portal B2B quedan para v2.

## 5. Sistema de diseño

**Colores institucionales (ya definidos en la v0, se mantienen):**

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#0B2545` | Fondos principales, header, footer |
| `--navy-2` | `#123a68` | Degradados, hover |
| `--blue` | `#1E6FB8` | Botones, acentos secundarios |
| `--accent` | `#29B6F6` | Acento principal, iconos, highlights |
| `--accent-2` | `#5FD0F3` | Detalles sobre fondo oscuro |
| `--bg` | `#F5F8FB` | Fondo de secciones claras |
| WhatsApp | `#25D366` | Solo CTAs de WhatsApp |

Tipografía: Poppins (se mantiene). Radios, sombras y estilo de cards de la v0 se conservan — la v0 ya tiene un lenguaje visual sólido; la v1 lo puebla con fotografía real y mejor contenido, no lo reinventa.

**Cambio clave de la v1: reemplazar emojis por fotografía e iconos SVG.** Los referentes no usan emojis; usan fotos de producto e iconografía consistente. Los emojis de la v0 (💊🩹🩺🧪) se sustituyen por imágenes generadas + set de iconos SVG de una sola familia (líneas, stroke 1.5–2px, color `--blue`/`--accent`).

## 6. Plan de imágenes (Higgsfield, ultra realistas)

Estilo global para TODOS los prompts: fotografía corporativa ultra realista, iluminación natural fría-limpia, paleta dominada por azules/blancos (coherente con `#0B2545`/`#29B6F6`), sin texto ni logos visibles en la imagen, personas de fenotipo colombiano/caribeño cuando aparezcan, formato 16:9 para hero y 4:3 para cards.

| # | Imagen | Uso | Prompt base (resumen) |
|---|---|---|---|
| 1 | Bodega farmacéutica moderna, estantes ordenados con cajas blancas/azules, pasillo limpio | Hero | "ultra realistic photo, modern pharmaceutical distribution warehouse, clean blue and white boxes on organized shelves, cool natural lighting, no visible text or logos, 16:9" |
| 2 | Blísteres/frascos de medicamentos genéricos sin marca sobre superficie clínica | Card Medicamentos | genérico, sin marcas legibles |
| 3 | Insumos quirúrgicos estériles (gasas, jeringas, guantes) en empaque neutro | Card Insumos | neutro, sin marcas |
| 4 | Monitor de signos vitales / equipo biomédico en sala clínica moderna | Card Equipos | pantalla apagada o genérica, sin marca |
| 5 | Laboratorio clínico: tubos de ensayo, analizador, manos con guantes azules | Card Laboratorio | sin marcas |
| 6 | Químico farmacéutico (hombre o mujer ~35-45, bata blanca) revisando inventario con tablet | Sección Consulta QF | retrato profesional de ambiente, NO se presenta como persona nombrada |
| 7 | Manos entregando caja térmica de cadena de frío / furgón de reparto genérico | Sección Cómo trabajamos | sin placas ni logos |
| 8 | Equipo pequeño (2-3 personas) en reunión en oficina moderna | Sección Nosotros / Trabaja | ambiente, sin rostros protagonistas en primer plano |

Reglas de honestidad para imágenes:
- Las imágenes son **ilustrativas del sector**, no se presentan como "nuestras instalaciones" ni "nuestro equipo" con nombres. Los pies de foto y el alt text lo reflejan (ej. alt="Bodega de distribución farmacéutica" y no "Nuestra bodega de 2.500 m²").
- Ninguna imagen generada de una persona se asocia a un nombre propio ni a un cargo con nombre.
- Sin logos ni marcas de terceros en ninguna imagen.

Flujo técnico: generar en Higgsfield → descargar → optimizar (WebP, ≤200KB cards, ≤400KB hero) → guardar en `assets/img/` del repo.

## 7. Plan técnico

- **Stack: Astro** (sitio estático generado). Razón: con ~14 páginas que comparten header/footer/nav, HTML puro obliga a duplicar el layout en cada archivo y cada cambio de menú se vuelve una edición en 14 archivos. Astro resuelve esto con layouts y componentes, genera HTML estático puro (cero JS innecesario, rendimiento excelente) y Vercel lo detecta automáticamente (el preset del proyecto pasa de "Other" a "Astro" solo, o se cambia en Settings → Build & Development).
- **URLs limpias:** Astro las da por estructura (`src/pages/nosotros.astro` → `/nosotros`).
- **Estructura de archivos v1:**
  ```
  /
  ├── src/
  │   ├── layouts/Base.astro        # <head>, header/nav, footer, WhatsApp flotante
  │   ├── components/               # Card línea, barra compromisos, CTA, formulario
  │   ├── pages/
  │   │   ├── index.astro
  │   │   ├── nosotros.astro
  │   │   ├── lineas/
  │   │   │   ├── index.astro
  │   │   │   ├── medicamentos.astro
  │   │   │   ├── insumos-medico-quirurgicos.astro
  │   │   │   ├── equipos-biomedicos.astro
  │   │   │   └── laboratorio-clinico.astro
  │   │   ├── consulta-especializada.astro
  │   │   ├── como-trabajamos.astro
  │   │   ├── cotizar.astro
  │   │   ├── trabaja-con-nosotros.astro
  │   │   ├── proveedores.astro
  │   │   ├── transparencia.astro
  │   │   └── contacto.astro
  │   └── styles/global.css         # tokens de color y estilos base (migrados de la v0)
  ├── public/
  │   └── img/                      # imágenes Higgsfield optimizadas (webp)
  ├── CLAUDE.md
  ├── PLAN.md
  ├── PENDIENTES.md                 # deudas de información del negocio
  └── README.md
  ```
- **Diseño moderno, fresco y mobile-first:** mantener el lenguaje visual de la v0 (navy + celeste, cards con sombra suave, radios generosos) pero con más aire (espaciado amplio), jerarquía tipográfica clara, microinteracciones sutiles (hover, reveal on scroll) y navegación pensada primero para móvil: menú hamburguesa limpio, CTAs de pulgar (botón WhatsApp accesible con una mano), formularios cortos, tap targets ≥44px.
- **SEO/metadata:** Open Graph + Twitter cards con imagen hero, `lang="es-CO"`, favicon real (generar isotipo TMI), sitemap.xml y robots.txt básicos.
- **Rendimiento:** imágenes WebP con `loading="lazy"` (salvo hero), `font-display:swap`, objetivo Lighthouse ≥90 en móvil.
- **Accesibilidad:** contraste AA sobre navy, alt text honesto en todas las imágenes, foco visible en formulario.
- **Datos pendientes del negocio** (bloquean el lanzamiento, no el desarrollo): número real de WhatsApp (hoy placeholder `573000000000`), correos reales `@tmicol.co`, dirección física, redes sociales.

## 8. Fases de ejecución en Claude Code

Trabajar SIEMPRE en rama + PR (el repo ya está en GitHub y conectado a Vercel: cada PR genera un Preview Deployment para revisar antes de mergear a `main`).

**Fase 1 — rama `v1/estructura`:** scaffolding de Astro, layout base (header/nav/footer/WhatsApp flotante), migrar tokens de color y estilos de la v0 a `global.css`, y crear las 14 páginas del mapa de URLs (§4) con su contenido inicial migrado de la v0. Corrección de honestidad incluida: quitar contadores y marcas falsas, crear barra de compromisos y página "Cómo trabajamos". Sin imágenes aún (placeholders grises con la proporción correcta).

**Fase 2 — rama `v1/imagenes`:** generar las 8 imágenes en Higgsfield según §6, optimizar (WebP) e integrar en `public/img/`. Sustituir emojis por SVGs.

**Fase 3 — rama `v1/contenido`:** afinar el copy de cada página con los pilares de §3, revisar tono, SEO/metadata por página (title/description únicos), OG images, sitemap.

**Fase 4 — rama `v1/pulido`:** responsive fino, Lighthouse, accesibilidad, QA en móvil real, y carga de datos reales de contacto cuando estén (ver PENDIENTES.md).

Prompt sugerido para arrancar en Claude Code:
> "Lee PLAN.md, CLAUDE.md y PENDIENTES.md. Crea la rama v1/estructura y ejecuta la Fase 1 del plan (scaffolding Astro + 14 páginas). No inventes datos de la empresa: donde falte un dato real, usa el placeholder documentado en PENDIENTES.md con un comentario TODO."

## 9. Checklist pre-lanzamiento

- [ ] PENDIENTES.md resuelto con la persona encargada (teléfonos, dirección, permisos, textos)
- [ ] Número de WhatsApp real en todos los puntos donde aparece
- [ ] Correos reales verificados (contacto, empleo, proveedores)
- [ ] Cero cifras inventadas en todo el sitio (buscar: "150", "40+", "25+", "Marca A")
- [ ] Alt text honesto en todas las imágenes generadas
- [ ] PDFs de transparencia reales o marcados "próximamente" (sin links muertos)
- [ ] Lighthouse móvil ≥90 / OG cards funcionando al compartir por WhatsApp
- [ ] Dominio propio configurado en Vercel (si aplica)
