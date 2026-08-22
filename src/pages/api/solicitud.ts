// Endpoint único para los formularios del sitio. Recibe la solicitud, la valida
// y la envía por correo (Resend) al buzón que corresponda según `tipo`.
//
// El destino por tipo vive en DESTINOS (lado servidor, el cliente no puede
// elegir buzón arbitrario). Cuando existan más formularios, se agrega aquí la
// entrada; si esto crece, se convierte en el mini backend de administración.
//
// Requiere RESEND_API_KEY (Resend, gratis hasta 3.000 correos/mes) en .env
// local y en las variables de entorno del proyecto en Vercel. Mientras el
// dominio tmicol.co no esté verificado en Resend, el remitente debe ser el de
// pruebas de Resend (RESEND_FROM opcional para configurarlo).
export const prerender = false;

import type { APIRoute } from 'astro';

const DESTINOS: Record<string, { correo: string; asunto: (d: Solicitud) => string }> = {
  cotizacion: {
    correo: 'gerencia@tmicol.co',
    asunto: (d) => `Nueva solicitud de cotización — ${d.nombre}${d.empresa ? ` (${d.empresa})` : ''}`,
  },
  // Futuro: proveedores → compras@, consulta técnica → director.tecnico@, empleo → gerencia@.
};

interface Solicitud {
  tipo: string;
  nombre: string;
  telefono: string;
  empresa?: string;
  correo?: string;
  linea?: string;
  mensaje?: string;
  autorizacion?: boolean;
  sitioWeb?: string; // honeypot: los humanos no lo ven; si llega lleno, es un bot
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let data: Solicitud;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Cuerpo inválido' });
  }

  // Honeypot: responder "ok" sin enviar nada para no dar pistas al bot.
  if (data.sitioWeb) return json(200, { ok: true });

  const destino = DESTINOS[data.tipo];
  if (!destino) return json(400, { ok: false, error: 'Tipo de solicitud desconocido' });
  if (!data.nombre?.trim() || !data.telefono?.trim()) {
    return json(400, { ok: false, error: 'Nombre y teléfono son obligatorios' });
  }
  if (!data.autorizacion) {
    return json(400, { ok: false, error: 'Falta la autorización de tratamiento de datos' });
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada');
    return json(503, { ok: false, error: 'Servicio de envío no disponible' });
  }

  const fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  const fila = (label: string, valor?: string) =>
    valor
      ? `<tr><td style="padding:6px 12px;color:#5b6b7e;white-space:nowrap;">${label}</td><td style="padding:6px 12px;color:#1f2937;"><strong>${esc(valor)}</strong></td></tr>`
      : '';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;">
      <h2 style="color:#0B2545;">Nueva solicitud desde el sitio web</h2>
      <table style="border-collapse:collapse;background:#f5f8fb;border-radius:8px;width:100%;">
        ${fila('Nombre', data.nombre)}
        ${fila('Empresa / institución', data.empresa)}
        ${fila('Teléfono / WhatsApp', data.telefono)}
        ${fila('Correo', data.correo)}
        ${fila('Línea de interés', data.linea)}
        ${fila('Detalle', data.mensaje)}
        ${fila('Recibida', fecha)}
      </table>
      <p style="color:#5b6b7e;font-size:13px;">
        El titular otorgó autorización para el tratamiento de sus datos personales mediante la
        casilla del formulario web (política AS-PO-01), el ${fecha}. Conservar este correo como
        constancia de la autorización.
      </p>
    </div>`;

  const from = import.meta.env.RESEND_FROM ?? process.env.RESEND_FROM ?? 'TMI Sitio Web <onboarding@resend.dev>';

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [destino.correo],
      subject: destino.asunto(data),
      html,
      ...(data.correo ? { reply_to: data.correo } : {}),
    }),
  });

  if (!r.ok) {
    console.error('Resend error', r.status, await r.text());
    return json(502, { ok: false, error: 'No se pudo enviar la solicitud' });
  }

  return json(200, { ok: true });
};
