# PENDIENTES.md — Información que falta para terminar el sitio

Lista de preguntas para la persona encargada del sitio en TMI SAS. Mientras un dato no esté respondido aquí, en el código va un placeholder marcado con `TODO` — **nada de esta lista se inventa**.

## 1. Contacto (bloquea el lanzamiento)

- [x] **Número de WhatsApp comercial**: +57 301 293 6547 (confirmado por gerencia, ago 2026 — "para todo" por ahora). Ya está en el sitio. *Queda abierto: ¿quién lo responde y en qué horario?*
- [x] **Teléfono de contacto general**: 301 380 4160 (estatutos, Art. 2). Ya está en el sitio.
- [x] **Dirección física**: Cra. 35 N° 44-16, Montería, Córdoba (estatutos, Art. 2). Ya está en el sitio. *Pendiente decidir: ¿se agrega mapa de Google en /contacto?*
- [ ] **Horarios de atención**.
- [x] **Correos** (confirmados ago 2026): `gerencia@tmicol.co` (contacto general y hojas de vida), `compras@tmicol.co` (proveedores), `director.tecnico@tmicol.co` (consulta especializada). No hay buzón de RRHH ni `contacto@`.

## 2. Legal y regulatorio (bloquea el lanzamiento)

- [x] **Razón social y NIT**: TECNOLOGÍAS MÉDICAS INTEGRALES COLOMBIA SAS, sigla TMI SAS (estatutos, Art. 1). NIT 902.088.438-2 (confirmado ago 2026). Ambos en el footer.
- [ ] **Registros/permisos sanitarios**: ¿la empresa ya cuenta con los permisos INVIMA / resolución de la entidad territorial de salud para comercializar medicamentos y dispositivos médicos? ¿Cuáles números de registro se pueden publicar? (El sitio menciona "registro sanitario INVIMA vigente" — hay que respaldarlo o quitarlo.)
- [ ] **Director Técnico / Químico Farmacéutico**: ¿ya está contratado y registrado? ¿Autoriza que su nombre y tarjeta profesional aparezcan en el sitio, o preferimos mencionar solo el cargo?
- [x] **Política de tratamiento de datos personales** (Ley 1581 de 2012): documento oficial AS-PO-01 v00 (vigente 20/08/2026) entregado por gerencia. Publicada en `/politica-de-datos` + PDF descargable + casilla de autorización obligatoria en el formulario de cotización (Anexo 2). Representante legal: Natalia Padilla Torres. *Recordatorio operativo: verificar anualmente el umbral de 100.000 UVT para inscripción en el RNBD (numeral XIX).*
- [ ] **Términos y condiciones / aviso legal**: ¿hay abogado que los revise o se redacta un borrador estándar?

## 3. Identidad y contenido

- [ ] **Misión y visión**: los textos actuales del sitio ¿son los oficiales aprobados por gerencia, o son borrador? ¿Alguien debe validarlos?
- [ ] **Valores**: hoy son Integridad, Calidad, Innovación, Compromiso. ¿Confirmados?
- [ ] **Historia mínima honesta**: año de constitución, por qué nace la empresa, quiénes la fundan (¿se quiere contar o no?).
- [ ] **Cobertura real**: ¿a qué municipios/departamentos se entrega hoy de verdad? ("Córdoba y la región" — definir qué es "la región".)
- [ ] **Compromisos medibles**: el sitio promete "cotización en menos de 24 horas hábiles". ¿La operación puede cumplirlo? ¿Qué otras promesas sí se pueden garantizar (entrega en X horas en Montería, etc.)?
- [ ] **Subcategorías por línea**: lista real de lo que sí se puede vender hoy en cada línea (medicamentos, insumos, equipos, laboratorio). ¿Hay líneas que aún no tienen proveedor y no deberían publicarse?
- [ ] **Servicios de equipos biomédicos**: el sitio dice "instalación, mantenimiento, calibración y soporte posventa". ¿TMI ya puede prestar esos servicios (personal/certificaciones) o se retira ese texto por ahora?

## 4. Marca y material gráfico

- [x] **Logo oficial**: recibido como imagen (render) en ago 2026, vectorizado en `src/components/Logo.astro`; el render original está en `public/img/logo-original.jpg` (para OG images). *Pendiente: archivo fuente vectorial oficial (.svg/.ai) si existe.*
- [ ] **Manual de marca o al menos confirmación de colores**: los azules actuales (#0B2545 / #29B6F6) ¿son los institucionales definitivos?
- [ ] **Fotos reales**: ¿hay o habrá fotos de bodega, oficina o equipo humano reales? Mientras tanto usamos imágenes generadas con IA marcadas como ilustrativas — ¿gerencia está de acuerdo?
- [ ] **Marcas/laboratorios aliados**: ¿hay alguna marca que ya autorice por escrito usar su logo en el sitio?

## 5. Transparencia

- [ ] **Informes de rendición de cuentas**: ¿existen ya PDFs reales (gestión, financiero, sostenibilidad)? Si no, la sección queda en "próximamente" — ¿está bien o se oculta la sección hasta tenerlos?

## 6. Digital / técnico

- [x] **Resend (envío de formularios por correo)**: cuenta creada, API key en `.env` local y dominio **updates.tmicol.co verificado** (DKIM/SPF en verde) — remitente `TMI <notificaciones@updates.tmicol.co>`. Probado en real (ago 2026): cotización, OTP y vinculación con Excel adjunto entregados. **Pendiente operativo: agregar `RESEND_API_KEY` y `RESEND_FROM` en Vercel → Settings → Environment Variables antes del deploy** (sin eso, los formularios en producción muestran su respaldo).
- [x] **Vinculación con firma electrónica**: implementada con código OTP al correo del solicitante (ago 2026). El asistente exige validar un código de 6 dígitos (vence en 10 min) antes de finalizar; el Excel generado queda con la constancia "Firmado electrónicamente mediante código de verificación (OTP)... (Ley 527 de 1999)". Sin base de datos: tokens HMAC firmados por el servidor. *Opcional: definir `OTP_SECRET` en Vercel como secreto dedicado (si no existe, deriva de la API key de Resend).*

- [ ] **Dominio**: ¿ya se compró tmicol.co (u otro)? ¿Quién tiene acceso al registrador para apuntarlo a Vercel?
- [x] **Redes sociales**: LinkedIn (linkedin.com/in/tmicolsas2026) e Instagram (@tmi.col), confirmadas por gerencia ago 2026. Ya están en el footer. *Nota: el LinkedIn es un perfil personal (/in/); considerar migrar a página de empresa (/company/) más adelante.*
- [ ] **Google Business Profile**: ¿se quiere crear para aparecer en Maps?
- [ ] **Correo de recepción de hojas de vida y de propuestas de proveedores**: ¿mismo buzón o separados? ¿Quién los revisa?
- [ ] **Analítica**: ¿quieren medir visitas (Google Analytics / Vercel Analytics)? Si sí, hay que mencionarlo en la política de datos.

---

**Cómo usar este documento:** la persona encargada responde cada punto (puede ser directamente sobre este archivo). Cada respuesta se integra al sitio y se marca el checkbox. Cuando las secciones 1 y 2 estén completas, el sitio puede salir a producción; las demás pueden completarse después sin bloquear el lanzamiento.
