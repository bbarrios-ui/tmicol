# PENDIENTES.md — Información que falta para terminar el sitio

Lista de preguntas para la persona encargada del sitio en TMI COL S.A.S. Mientras un dato no esté respondido aquí, en el código va un placeholder marcado con `TODO` — **nada de esta lista se inventa**.

## 1. Contacto (bloquea el lanzamiento)

- [ ] **Número de WhatsApp comercial** (el sitio entero cotiza por ahí; hoy hay un placeholder `573000000000`). ¿Es un número dedicado al negocio o el personal de alguien? ¿Quién lo va a responder y en qué horario?
- [ ] **Teléfono fijo o celular de contacto general** (si es distinto al WhatsApp).
- [ ] **Dirección física** (ciudad, dirección exacta). ¿Se quiere mostrar en el sitio con mapa de Google, o solo ciudad?
- [ ] **Horarios de atención**.
- [ ] **Correos**: ¿existen ya los buzones `contacto@`, `empleo@`, `proveedores@`, `director.tecnico@` en el dominio? ¿Cuál dominio de correo es el real (tmicol.co u otro)?

## 2. Legal y regulatorio (bloquea el lanzamiento)

- [ ] **Razón social exacta y NIT** para el footer (¿"TMI COL S.A.S." es la razón social registrada tal cual?). *Nota (ago 2026): el logo oficial entregado dice "TMI COLOMBIA S.A.S" — confirmar cuál es la razón social registrada y unificar en todo el sitio.*
- [ ] **Registros/permisos sanitarios**: ¿la empresa ya cuenta con los permisos INVIMA / resolución de la entidad territorial de salud para comercializar medicamentos y dispositivos médicos? ¿Cuáles números de registro se pueden publicar? (El sitio menciona "registro sanitario INVIMA vigente" — hay que respaldarlo o quitarlo.)
- [ ] **Director Técnico / Químico Farmacéutico**: ¿ya está contratado y registrado? ¿Autoriza que su nombre y tarjeta profesional aparezcan en el sitio, o preferimos mencionar solo el cargo?
- [ ] **Política de tratamiento de datos personales** (Ley 1581 de 2012 — obligatoria si el formulario recoge nombre y teléfono): ¿existe el documento? ¿Quién es el responsable del tratamiento?
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

- [x] **Logo oficial**: recibido como imagen (render) en ago 2026 y vectorizado en `src/components/Logo.astro`. *Pendiente: archivo fuente vectorial oficial (.svg/.ai) si existe, y colocar el render original en el repo para OG images (guardarlo como `public/img/logo-original.png`).*
- [ ] **Manual de marca o al menos confirmación de colores**: los azules actuales (#0B2545 / #29B6F6) ¿son los institucionales definitivos?
- [ ] **Fotos reales**: ¿hay o habrá fotos de bodega, oficina o equipo humano reales? Mientras tanto usamos imágenes generadas con IA marcadas como ilustrativas — ¿gerencia está de acuerdo?
- [ ] **Marcas/laboratorios aliados**: ¿hay alguna marca que ya autorice por escrito usar su logo en el sitio?

## 5. Transparencia

- [ ] **Informes de rendición de cuentas**: ¿existen ya PDFs reales (gestión, financiero, sostenibilidad)? Si no, la sección queda en "próximamente" — ¿está bien o se oculta la sección hasta tenerlos?

## 6. Digital / técnico

- [ ] **Dominio**: ¿ya se compró tmicol.co (u otro)? ¿Quién tiene acceso al registrador para apuntarlo a Vercel?
- [ ] **Redes sociales**: ¿qué redes existen realmente (Instagram, Facebook, LinkedIn)? URLs exactas. Las que no existan se quitan del footer.
- [ ] **Google Business Profile**: ¿se quiere crear para aparecer en Maps?
- [ ] **Correo de recepción de hojas de vida y de propuestas de proveedores**: ¿mismo buzón o separados? ¿Quién los revisa?
- [ ] **Analítica**: ¿quieren medir visitas (Google Analytics / Vercel Analytics)? Si sí, hay que mencionarlo en la política de datos.

---

**Cómo usar este documento:** la persona encargada responde cada punto (puede ser directamente sobre este archivo). Cada respuesta se integra al sitio y se marca el checkbox. Cuando las secciones 1 y 2 estén completas, el sitio puede salir a producción; las demás pueden completarse después sin bloquear el lanzamiento.
