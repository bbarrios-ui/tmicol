// Genera el video de fondo del hero con la Video API de OpenRouter
// (image-to-video: anima la foto hero-bodega.webp para mantener coherencia).
//
// Uso: node scripts/generar-video-hero.mjs
// Requiere OPENROUTER_API_KEY en .env. Salida cruda: scratch → luego ffmpeg
// produce public/video/hero-bodega.mp4 (bucle palíndromo, sin audio).

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const API_KEY = readFileSync(resolve(ROOT, '.env'), 'utf8')
  .split('\n')
  .find((l) => l.startsWith('OPENROUTER_API_KEY='))
  .split('=')[1]
  .trim();

const MODEL = 'google/veo-3.1-fast';

const PROMPT =
  'Very slow, smooth cinematic dolly forward through the center aisle of a modern pharmaceutical ' +
  'distribution warehouse with tall organized shelves of plain white and blue boxes. Subtle, calm ' +
  'camera motion only; nothing else moves. Cool clean daylight, blue and white palette. ' +
  'No people, no visible text, no logos, no brand names, no watermarks.';

async function main() {
  // Primer frame: la foto actual del hero (a JPEG, que todos los providers aceptan).
  const jpeg = await sharp(resolve(ROOT, 'public/img/hero-bodega.webp')).jpeg({ quality: 92 }).toBuffer();
  const dataUrl = `data:image/jpeg;base64,${jpeg.toString('base64')}`;

  const submit = await fetch('https://openrouter.ai/api/v1/videos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt: PROMPT,
      duration: 8,
      resolution: '1080p',
      aspect_ratio: '16:9',
      generate_audio: false,
      frame_images: [
        { type: 'image_url', image_url: { url: dataUrl }, frame_type: 'first_frame' },
      ],
    }),
  });
  if (!submit.ok) throw new Error(`HTTP ${submit.status}: ${(await submit.text()).slice(0, 400)}`);
  const job = await submit.json();
  console.log(`Job ${job.id}: ${job.status}`);

  while (true) {
    await new Promise((r) => setTimeout(r, 15000));
    const poll = await fetch(job.polling_url, { headers: { Authorization: `Bearer ${API_KEY}` } });
    const status = await poll.json();
    console.log(`  → ${status.status}`);
    if (status.status === 'completed') {
      // La URL de contenido también exige el header de autorización.
      const video = await fetch(status.unsigned_urls[0], {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      const buf = Buffer.from(await video.arrayBuffer());
      const out = process.env.VIDEO_OUT || resolve(ROOT, 'hero-raw.mp4');
      writeFileSync(out, buf);
      console.log(`Guardado: ${out} (${(buf.length / 1048576).toFixed(1)} MB) — costo $${status.usage?.cost ?? '?'}`);
      break;
    }
    if (status.status === 'failed') throw new Error(`Falló: ${JSON.stringify(status.error ?? status).slice(0, 400)}`);
  }
}

main();
