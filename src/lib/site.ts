// Datos globales del sitio — ÚNICA fuente de verdad para contactos y navegación.
// Regla (CLAUDE.md): si un dato está en PENDIENTES.md sin responder, aquí va
// placeholder + TODO. Nunca un valor inventado.

// TODO(PENDIENTES.md §1): reemplazar por el número de WhatsApp comercial real.
export const WHATSAPP = '573000000000';

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const WA_COTIZAR = waLink('Hola TMI, quiero cotizar un producto');
export const WA_CONSULTA = waLink(
  'Hola, quiero agendar una consulta con el químico farmacéutico de TMI'
);

// TODO(PENDIENTES.md §1): confirmar dominio de correo real y buzones existentes.
export const EMAIL_CONTACTO = 'contacto@tmicol.co';
export const EMAIL_EMPLEO = 'empleo@tmicol.co';
export const EMAIL_PROVEEDORES = 'proveedores@tmicol.co';

// TODO(PENDIENTES.md §1): teléfono y dirección reales.
export const TELEFONO_DISPLAY = '+57 300 000 0000';
export const CIUDAD = 'Córdoba, Colombia';

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/lineas', label: 'Líneas de venta' },
  { href: '/consulta-especializada', label: 'Consulta especializada' },
  { href: '/como-trabajamos', label: 'Cómo trabajamos' },
  { href: '/transparencia', label: 'Transparencia' },
  { href: '/contacto', label: 'Contacto' },
];

export interface Linea {
  slug: string;
  titulo: string;
  corta: string;
  icon: string;
}

export const LINEAS: Linea[] = [
  {
    slug: 'medicamentos',
    titulo: 'Medicamentos',
    corta:
      'Portafolio con registro sanitario INVIMA vigente, condiciones de conservación controladas y trazabilidad completa por lote.',
    icon: 'pill',
  },
  {
    slug: 'insumos-medico-quirurgicos',
    titulo: 'Insumos médico-quirúrgicos',
    corta:
      'Material médico-quirúrgico y dispositivos médicos de uso hospitalario, con disponibilidad y entrega oportuna.',
    icon: 'bandage',
  },
  {
    slug: 'equipos-biomedicos',
    titulo: 'Equipos biomédicos',
    corta:
      'Venta, instalación, mantenimiento, calibración y soporte técnico posventa para equipos biomédicos.',
    icon: 'monitor',
  },
  {
    slug: 'laboratorio-clinico',
    titulo: 'Laboratorio clínico',
    corta:
      'Reactivos, insumos y equipos para laboratorio clínico, con acompañamiento técnico especializado.',
    icon: 'flask',
  },
];

// Compromisos medibles — sustituyen a los contadores inventados de la v0 (PLAN.md §3).
// TODO(PENDIENTES.md §3): validar con la operación que cada promesa se puede cumplir.
export const COMPROMISOS = [
  {
    icon: 'clock',
    titulo: 'Cotización en menos de 24 h hábiles',
    texto: 'Respondemos tu solicitud el mismo día hábil, directo por WhatsApp.',
  },
  {
    icon: 'user-check',
    titulo: 'Acceso directo al Químico Farmacéutico',
    texto: 'Tu consulta la responde el Director Técnico, no un call center.',
  },
  {
    icon: 'shield-check',
    titulo: 'Trazabilidad por lote',
    texto: 'Cumplimiento INVIMA verificado línea por línea, en todo el portafolio.',
  },
  {
    icon: 'map-pin',
    titulo: 'Cobertura Córdoba y la región',
    texto: 'Cercanía física: entregas y soporte más rápidos para tu institución.',
  },
];
