// Generate PWA icons (PNG + SVG) for Velvet Paw.
// Requires sharp (included as Next.js dependency).
// Run: cd velvet-paw && node scripts/generate-icons.mjs

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/icons");

function createSVGIcon(size) {
  const padding = Math.round(size * 0.15);
  const innerSize = size - padding * 2;
  const r = Math.round(innerSize * 0.45);
  const cx = size / 2;
  const cy = size / 2;
  const earSize = Math.round(innerSize * 0.25);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF8C42"/>
      <stop offset="100%" stop-color="#FF6B9D"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="url(#bg)"/>
  <g transform="translate(${cx}, ${cy - Math.round(size * 0.05)})">
    <polygon points="${-r},${-r} ${-r - earSize},${-r - earSize * 1.2} ${-r + Math.round(earSize * 0.3)},${-r + Math.round(earSize * 0.2)}" fill="white" opacity="0.9"/>
    <polygon points="${r},${-r} ${r + earSize},${-r - earSize * 1.2} ${r - Math.round(earSize * 0.3)},${-r + Math.round(earSize * 0.2)}" fill="white" opacity="0.9"/>
    <ellipse cx="0" cy="0" rx="${r}" ry="${Math.round(r * 0.9)}" fill="white"/>
    <ellipse cx="${-Math.round(r * 0.35)}" cy="${-Math.round(r * 0.15)}" rx="${Math.round(r * 0.12)}" ry="${Math.round(r * 0.14)}" fill="#2D2D2D"/>
    <ellipse cx="${Math.round(r * 0.35)}" cy="${-Math.round(r * 0.15)}" rx="${Math.round(r * 0.12)}" ry="${Math.round(r * 0.14)}" fill="#2D2D2D"/>
    <ellipse cx="${-Math.round(r * 0.3)}" cy="${-Math.round(r * 0.2)}" rx="${Math.round(r * 0.04)}" ry="${Math.round(r * 0.04)}" fill="white"/>
    <ellipse cx="${Math.round(r * 0.4)}" cy="${-Math.round(r * 0.2)}" rx="${Math.round(r * 0.04)}" ry="${Math.round(r * 0.04)}" fill="white"/>
    <ellipse cx="0" cy="${Math.round(r * 0.08)}" rx="${Math.round(r * 0.06)}" ry="${Math.round(r * 0.05)}" fill="#FF8C42"/>
    <path d="M ${-Math.round(r * 0.1)} ${Math.round(r * 0.13)} Q 0 ${Math.round(r * 0.22)} ${Math.round(r * 0.1)} ${Math.round(r * 0.13)}" fill="none" stroke="#2D2D2D" stroke-width="${Math.max(1, Math.round(size * 0.008))}" stroke-linecap="round"/>
  </g>
</svg>`;
}

/** Generate maskable icon (larger safe area) — prevents cropping issues on Android */
function createMaskableSVG(size) {
  const pad = Math.round(size * 0.15);
  const inner = size - pad * 2;
  const r = Math.round(inner * 0.48);
  const cx = size / 2;
  const cy = cx; // center vertically for maskable
  const earSize = Math.round(inner * 0.28);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#FF8C42"/>
  <g transform="translate(${cx}, ${cy})">
    <polygon points="${-r},${-r} ${-r - earSize},${-r - earSize * 1.2} ${-r + Math.round(earSize * 0.3)},${-r + Math.round(earSize * 0.2)}" fill="white" opacity="0.95"/>
    <polygon points="${r},${-r} ${r + earSize},${-r - earSize * 1.2} ${r - Math.round(earSize * 0.3)},${-r + Math.round(earSize * 0.2)}" fill="white" opacity="0.95"/>
    <ellipse cx="0" cy="0" rx="${r}" ry="${Math.round(r * 0.9)}" fill="white"/>
    <ellipse cx="${-Math.round(r * 0.35)}" cy="${-Math.round(r * 0.15)}" rx="${Math.round(r * 0.12)}" ry="${Math.round(r * 0.14)}" fill="#2D2D2D"/>
    <ellipse cx="${Math.round(r * 0.35)}" cy="${-Math.round(r * 0.15)}" rx="${Math.round(r * 0.12)}" ry="${Math.round(r * 0.14)}" fill="#2D2D2D"/>
    <ellipse cx="0" cy="${Math.round(r * 0.08)}" rx="${Math.round(r * 0.06)}" ry="${Math.round(r * 0.05)}" fill="#FF8C42"/>
  </g>
</svg>`;
}

const ICON_SIZES = [
  { size: 48, name: "icon-48.png" },
  { size: 72, name: "icon-72.png" },
  { size: 96, name: "icon-96.png" },
  { size: 144, name: "icon-144.png" },
  { size: 152, name: "icon-152.png" }, // iPad
  { size: 167, name: "icon-167.png" }, // iPad Pro
  { size: 180, name: "icon-180.png" }, // iPhone
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
  { size: 512, name: "icon-maskable-512.png" }, // Android maskable
];

async function main() {
  for (const { size, name } of ICON_SIZES) {
    const svgStr = name.includes("maskable") ? createMaskableSVG(size) : createSVGIcon(size);
    const out = resolve(OUT, name);
    await sharp(Buffer.from(svgStr)).resize(size, size).png().toFile(out);
    console.log(`  ✓ ${name.padEnd(24)} ${size}×${size}`);
  }

  // Also write SVGs (manifest fallback + dev use)
  const svg192 = createSVGIcon(192);
  writeFileSync(resolve(OUT, "icon-192.svg"), svg192);
  console.log("  ✓ icon-192.svg");
  const svg512 = createSVGIcon(512);
  writeFileSync(resolve(OUT, "icon-512.svg"), svg512);
  console.log("  ✓ icon-512.svg");

  console.log(`\nDone — ${ICON_SIZES.length} PNGs + 2 SVGs`);
}

main().catch((e) => {
  console.error("Icon generation failed:", e);
  process.exit(1);
});
