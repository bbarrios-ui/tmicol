// Datos globales del sitio — ÚNICA fuente de verdad para contactos y navegación.
// Regla (CLAUDE.md): si un dato está en PENDIENTES.md sin responder, aquí va
// placeholder + TODO. Nunca un valor inventado.

// Razón social según estatutos (Art. 1): TECNOLOGÍAS MÉDICAS INTEGRALES
// COLOMBIA SAS, sigla TMI SAS.
export const RAZON_SOCIAL = 'Tecnologías Médicas Integrales Colombia SAS';
export const NIT = 'NIT 902.088.438-2';

// WhatsApp comercial confirmado por gerencia (ago 2026): atiende todo por ahora.
export const WHATSAPP = '573012936547';
export const WHATSAPP_DISPLAY = '+57 301 293 6547';

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const WA_COTIZAR = waLink('Hola TMI, quiero cotizar un producto');
export const WA_CONSULTA = waLink(
  'Hola, quiero agendar una consulta con el químico farmacéutico de TMI'
);

// Buzones confirmados por gerencia (ago 2026). No existe buzón de RRHH:
// las hojas de vida llegan a gerencia.
export const EMAIL_CONTACTO = 'gerencia@tmicol.co';
export const EMAIL_EMPLEO = 'gerencia@tmicol.co';
export const EMAIL_PROVEEDORES = 'compras@tmicol.co';
export const EMAIL_DIRECTOR_TECNICO = 'director.tecnico@tmicol.co';

// Teléfono y domicilio según estatutos (Art. 2).
// TODO(PENDIENTES.md §1): confirmar horarios de atención.
export const TELEFONO_DISPLAY = '+57 301 380 4160';
export const CIUDAD = 'Montería, Córdoba — Colombia';
export const DIRECCION = 'Cra. 35 N° 44-16';

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
