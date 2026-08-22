// Endpoint único para los formularios del sitio.
//
// - tipo "cotizacion": correo simple al equipo comercial.
// - tipos "vinculacion-cliente" / "vinculacion-proveedor": llena la plantilla
//   oficial de Excel (FO-VC-001 / CA-FO-01) con exceljs y la envía adjunta al
//   área correspondiente, con copia al solicitante para firma.
//
// El destino por tipo vive en DESTINOS (lado servidor, el cliente no puede
// elegir buzón arbitrario). Requiere RESEND_API_KEY en .env local y en las
// variables de entorno del proyecto en Vercel; RESEND_FROM opcional (remitente
// propio cuando el dominio esté verificado en Resend). Las plantillas se
// empaquetan en la función vía `includeFiles` (astro.config.mjs).
export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ExcelJS from 'exceljs';
import { FORMULARIOS } from '../../lib/vinculacion';

const DESTINOS: Record<string, string> = {
  cotizacion: 'gerencia@tmicol.co',
  'vinculacion-cliente': 'gerencia@tmicol.co',
  'vinculacion-proveedor': 'compras@tmicol.co',
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const fechaBogota = () => new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

const constancia = (fecha: string) => `
  <p style="color:#5b6b7e;font-size:13px;">
    El titular otorgó autorización para el tratamiento de sus datos personales mediante la
    casilla del formulario web (política AS-PO-01), el ${fecha}. Conservar este correo como
    constancia de la autorización.
  </p>`;

interface Envio {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  cc?: string;
  attachment?: { filename: string; contentBase64: string };
}

async function enviarCorreo(apiKey: string, e: Envio): Promise<Response> {
  const from = import.meta.env.RESEND_FROM ?? process.env.RESEND_FROM ?? 'TMI Sitio Web <onboarding@resend.dev>';
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [e.to],
      subject: e.subject,
      html: e.html,
      ...(e.replyTo ? { reply_to: e.replyTo } : {}),
      ...(e.cc ? { cc: [e.cc] } : {}),
      ...(e.attachment
        ? { attachments: [{ filename: e.attachment.filename, content: e.attachment.contentBase64 }] }
        : {}),
    }),
  });
}

// ---------- cotización (correo simple) ----------

interface SolicitudCotizacion {
  tipo: string;
  nombre: string;
  telefono: string;
  empresa?: string;
  correo?: string;
  linea?: string;
  mensaje?: string;
  autorizacion?: boolean;
  sitioWeb?: string; // honeypot
}

function correoCotizacion(data: SolicitudCotizacion): Envio {
  const fecha = fechaBogota();
  const fila = (label: string, valor?: string) =>
    valor
      ? `<tr><td style="padding:6px 12px;color:#5b6b7e;white-space:nowrap;">${label}</td><td style="padding:6px 12px;color:#1f2937;"><strong>${esc(valor)}</strong></td></tr>`
      : '';
  return {
    to: DESTINOS.cotizacion,
    subject: `Nueva solicitud de cotización — ${data.nombre}${data.empresa ? ` (${data.empresa})` : ''}`,
    replyTo: data.correo || undefined,
    html: `
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
        ${constancia(fecha)}
      </div>`,
  };
}

// ---------- vinculación (plantilla de Excel adjunta) ----------

async function generarFormato(tipo: string, campos: Record<string, string>) {
  const form = FORMULARIOS[tipo];
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(readFileSync(join(process.cwd(), form.plantilla)).buffer as ArrayBuffer);
  const ws = wb.getWorksheet('Formato Vinculación');
  if (!ws) throw new Error('Plantilla sin hoja "Formato Vinculación"');

  for (const paso of form.pasos) {
    // Un paso condicional que no aplica no se escribe (evita arrastrar datos
    // de Persona Natural en una solicitud de Persona Jurídica o viceversa).
    if (paso.condicion && campos[paso.condicion.campo] !== paso.condicion.valor) continue;
    for (const c of paso.campos) {
      const v = campos[c.id]?.trim?.() ?? '';
      if (!v) continue;
      if (c.tipo === 'checkbox') {
        if (v === '1') ws.getCell(c.cell).value = c.valorSi ?? 'Sí';
      } else if (c.tipo === 'date') {
        const d = new Date(`${v}T00:00:00-05:00`);
        if (!Number.isNaN(d.getTime())) ws.getCell(c.cell).value = d;
      } else if (c.tipo === 'number') {
        const n = Number(v);
        ws.getCell(c.cell).value = Number.isNaN(n) ? v : n;
      } else {
        ws.getCell(c.cell).value = v;
      }
    }
  }
  ws.getCell(form.celdaFecha).value = new Date();

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

function validarVinculacion(tipo: string, campos: Record<string, string>): string | null {
  const form = FORMULARIOS[tipo];
  for (const paso of form.pasos) {
    if (paso.condicion && campos[paso.condicion.campo] !== paso.condicion.valor) continue;
    for (const c of paso.campos) {
      if (!c.req) continue;
      const v = campos[c.id] ?? '';
      if (c.tipo === 'checkbox' ? v !== '1' : !v.trim()) return `Falta el campo obligatorio "${c.label}"`;
    }
  }
  return null;
}

// ---------- handler ----------

export const POST: APIRoute = async ({ request }) => {
  let data: { tipo?: string; campos?: Record<string, string> } & SolicitudCotizacion;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Cuerpo inválido' });
  }

  // Honeypot: responder "ok" sin enviar nada para no dar pistas al bot.
  if (data.sitioWeb) return json(200, { ok: true });

  const tipo = data.tipo ?? '';
  if (!DESTINOS[tipo]) return json(400, { ok: false, error: 'Tipo de solicitud desconocido' });

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada');
    return json(503, { ok: false, error: 'Servicio de envío no disponible' });
  }

  let envio: Envio;

  if (tipo === 'cotizacion') {
    if (!data.nombre?.trim() || !data.telefono?.trim()) {
      return json(400, { ok: false, error: 'Nombre y teléfono son obligatorios' });
    }
    if (!data.autorizacion) {
      return json(400, { ok: false, error: 'Falta la autorización de tratamiento de datos' });
    }
    envio = correoCotizacion(data);
  } else {
    const campos = data.campos ?? {};
    const faltante = validarVinculacion(tipo, campos);
    if (faltante) return json(400, { ok: false, error: faltante });

    const form = FORMULARIOS[tipo];
    let adjunto: Buffer;
    try {
      adjunto = await generarFormato(tipo, campos);
    } catch (err) {
      console.error('Error generando formato', err);
      return json(500, { ok: false, error: 'No se pudo generar el formato' });
    }

    if (import.meta.env.DEV) {
      const { writeFileSync } = await import('node:fs');
      writeFileSync(join(process.cwd(), '.dev-ultima-vinculacion.xlsx'), adjunto);
    }

    const fecha = fechaBogota();
    const nombre = campos[form.campoNombre] ?? 'Sin nombre';
    const copia = campos[form.campoCopia]?.includes('@') ? campos[form.campoCopia] : undefined;
    envio = {
      to: DESTINOS[tipo],
      subject: `${form.titulo} — ${nombre} (${campos.tipoSolicitud ?? ''})`,
      replyTo: copia,
      cc: copia,
      attachment: { filename: form.adjunto, contentBase64: adjunto.toString('base64') },
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;">
          <h2 style="color:#0B2545;">${form.titulo} desde el sitio web</h2>
          <p style="color:#1f2937;">
            <strong>${esc(nombre)}</strong> diligenció el asistente de ${form.titulo.toLowerCase()}
            el ${fecha}. Se adjunta el formato oficial <strong>${form.codigo}</strong> generado con
            sus datos.
          </p>
          <p style="color:#5b6b7e;font-size:14px;">
            Copia enviada al solicitante${copia ? ` (${esc(copia)})` : ''} para que firme el
            formato y lo devuelva junto con los documentos anexos.
          </p>
          ${constancia(fecha)}
        </div>`,
    };
  }

  const r = await enviarCorreo(apiKey, envio);
  if (!r.ok) {
    console.error('Resend error', r.status, await r.text());
    return json(502, { ok: false, error: 'No se pudo enviar la solicitud' });
  }
  return json(200, { ok: true });
};
