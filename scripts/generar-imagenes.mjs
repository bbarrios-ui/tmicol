// Fase 2 — genera las imágenes del sitio con la Image API de OpenRouter
// (PLAN.md §6, adaptado de Higgsfield a OpenRouter) y las optimiza a WebP.
//
// Uso: node scripts/generar-imagenes.mjs [--solo nombre1,nombre2]
// Requiere OPENROUTER_API_KEY en .env (raíz del repo). Salida: public/img/*.webp
//
// Reglas de honestidad (CLAUDE.md / PLAN.md §6): imágenes ilustrativas del
// sector, sin texto ni logos ni marcas, sin presentar personas con nombre.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'public/img');

const envLine = readFileSync(resolve(ROOT, '.env'), 'utf8')
  .split('\n')
  .find((l) => l.startsWith('OPENROUTER_API_KEY='));
if (!envLine) {
  console.error('Falta OPENROUTER_API_KEY en .env');
  process.exit(1);
}
const API_KEY = envLine.split('=')[1].trim();

const MODEL = 'google/gemini-3-pro-image';

// Estilo global (PLAN.md §6): fotografía corporativa ultra realista, luz
// natural fría-limpia, paleta azul/blanco coherente con la marca, sin texto
// ni logos, fenotipo colombiano/caribeño cuando aparezcan personas.
const STYLE =
  'Ultra realistic corporate editorial photograph, cool clean natural lighting, ' +
  'color palette dominated by whites and blues (deep navy #0B2545 and light blue #29B6F6 accents), ' +
  'sharp focus, professional healthcare-industry setting. ' +
  'Strictly NO visible text, NO logos, NO brand names, NO watermarks anywhere in the image.';

const IMAGES = [
  {
    name: 'hero-bodega',
    aspect_ratio: '16:9',
    resolution: '2K',
    width: 1920,
    prompt:
      'Interior of a modern pharmaceutical distribution warehouse, tall organized metal shelves stocked with plain white and blue cardboard boxes, one clean wide aisle in one-point perspective, polished light-grey floor, daylight from high windows, spotless and orderly, no people.',
  },
  {
    name: 'linea-medicamentos',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Generic unlabeled medicine blister packs with white pills and plain white pill bottles without any labels, arranged neatly on a clean white clinical surface, soft shallow depth of field, subtle blue background tones.',
  },
  {
    name: 'linea-insumos-medico-quirurgicos',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Sterile surgical supplies on a clean stainless steel medical tray: folded white gauze pads, syringes in transparent neutral packaging, a pair of blue nitrile gloves, bright clinical lighting.',
  },
  {
    name: 'linea-equipos-biomedicos',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Modern patient monitoring equipment with a generic dark switched-off screen beside a hospital bed in a bright modern clinical room, white walls with light blue accents, no patients.',
  },
  {
    name: 'linea-laboratorio-clinico',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Clinical laboratory scene: hands in blue nitrile gloves holding a rack of blood sample test tubes, generic white laboratory analyzer machine softly blurred in the background, bright clean light.',
  },
  {
    name: 'consulta-quimico',
    aspect_ratio: '3:4',
    resolution: '1K',
    width: 960,
    prompt:
      'Environmental portrait of a Colombian Caribbean woman pharmacist in her early forties wearing a clean white lab coat, reviewing inventory on a tablet inside a pharmaceutical storage room with shelves of plain white boxes, confident warm expression, natural window light.',
  },
  {
    name: 'entrega-cadena-frio',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Close-up of hands handing over a plain white rigid thermal cooler box used for cold-chain medical transport, a generic white delivery van softly blurred in the background without license plates, outdoor daylight.',
  },
  {
    name: 'nosotros-equipo',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Small team of three Colombian professionals collaborating around a laptop at a table in a modern bright office with light blue accents, photographed from the side so no face is prominent in the foreground, natural light, candid working atmosphere.',
  },
  {
    name: 'trabaja-equipo',
    aspect_ratio: '4:3',
    resolution: '1K',
    width: 1280,
    prompt:
      'Two Colombian professionals in business casual reviewing documents while standing in a modern office corridor with glass walls, photographed from behind at a slight angle so faces are not prominent, cool daylight, blue and white tones.',
  },
];

async function generate(img) {
  const res = await fetch('https://openrouter.ai/api/v1/images', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: `${STYLE} ${img.prompt}`,
      aspect_ratio: img.aspect_ratio,
      resolution: img.resolution,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`Respuesta sin imagen: ${JSON.stringify(json).slice(0, 300)}`);
  return { buffer: Buffer.from(b64, 'base64'), cost: json.usage?.cost ?? null };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const solo = process.argv.includes('--solo')
    ? process.argv[process.argv.indexOf('--solo') + 1].split(',')
    : null;
  const queue = solo ? IMAGES.filter((i) => solo.includes(i.name)) : IMAGES;
  let total = 0;

  for (const img of queue) {
    process.stdout.write(`→ ${img.name} (${img.aspect_ratio}) ... `);
    try {
      const { buffer, cost } = await generate(img);
      const out = resolve(OUT_DIR, `${img.name}.webp`);
      const webp = await sharp(buffer)
        .resize({ width: img.width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
      writeFileSync(out, webp);
      total += cost ?? 0;
      console.log(`OK ${(webp.length / 1024).toFixed(0)} KB${cost ? ` — $${cost.toFixed(3)}` : ''}`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }
  console.log(`\nCosto total: $${total.toFixed(2)}`);
}

main();
