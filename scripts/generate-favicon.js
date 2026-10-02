import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// High-resolution SVG for AU Monogram with Cyan & Purple theme
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="65%" fx="30%" fy="30%">
      <stop offset="0%" stop-color="#141424"/>
      <stop offset="60%" stop-color="#09090f"/>
      <stop offset="100%" stop-color="#040408"/>
    </radialGradient>

    <!-- Main Cyan to Purple Gradient -->
    <linearGradient id="auGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="35%" stop-color="#06b6d4" />
      <stop offset="70%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#d946ef" />
    </linearGradient>

    <!-- Border Ring Gradient -->
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ec4899" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Subtle Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#06b6d4" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="8" stdDeviation="24" flood-color="#a855f7" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Base Rounded Container with Sleek Curvature -->
  <rect width="512" height="512" rx="128" fill="url(#bgGlow)"/>
  
  <!-- Outer Accent Border -->
  <rect x="12" y="12" width="488" height="488" rx="116" fill="none" stroke="url(#borderGradient)" stroke-width="14" stroke-opacity="0.85"/>
  
  <!-- Subtle Inner Ring Highlight -->
  <rect x="24" y="24" width="464" height="464" rx="104" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.1"/>

  <!-- Glowing Initial Monogram AU -->
  <g filter="url(#glow)">
    <!-- Letter A -->
    <path d="M 125 365 L 210 145 L 262 145 L 262 365 L 208 365 L 208 210 L 155 365 Z" fill="url(#auGradient)" />
    <!-- Horizontal Crossbar for A -->
    <rect x="162" y="282" width="68" height="38" rx="6" fill="url(#auGradient)" />

    <!-- Letter U -->
    <path d="M 278 145 L 332 145 L 332 280 C 332 315 348 330 376 330 C 404 330 420 315 420 280 L 420 145 L 474 145 L 474 282 C 474 346 432 372 376 372 C 320 372 278 346 278 282 Z" fill="url(#auGradient)" />
  </g>
  
  <!-- Tech Accent Dot at top-right of U -->
  <circle cx="447" cy="118" r="16" fill="#22d3ee" opacity="0.9" />
</svg>`;

async function generateFavicons() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sourceImagePath = path.join(publicDir, 'favicon.webp');
  if (!fs.existsSync(sourceImagePath)) {
    console.error('Source favicon.webp not found at:', sourceImagePath);
    process.exit(1);
  }

  console.log('Using uploaded user photo from:', sourceImagePath);
  const imageBuffer = fs.readFileSync(sourceImagePath);

  // 1. Generate PNG 48x48 (exact requested size for favicon.png and favicon-48x48.png)
  const png48Buffer = await sharp(imageBuffer)
    .resize(48, 48, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon.png'), png48Buffer);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48Buffer);
  console.log('Saved public/favicon.png (48x48)');
  console.log('Saved public/favicon-48x48.png (48x48)');

  // 2. Generate PNG 32x32 & 16x16
  const png32Buffer = await sharp(imageBuffer)
    .resize(32, 32, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32Buffer);
  console.log('Saved public/favicon-32x32.png (32x32)');

  const png16Buffer = await sharp(imageBuffer)
    .resize(16, 16, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16Buffer);
  console.log('Saved public/favicon-16x16.png (16x16)');

  // 3. Generate Apple Touch Icon (180x180)
  const png180Buffer = await sharp(imageBuffer)
    .resize(180, 180, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180Buffer);
  console.log('Saved public/apple-touch-icon.png (180x180)');

  // 4. Generate standard ICO file embedding multiple sizes (16, 32, 48)
  const icoBuffer = createIco([
    { size: 16, buffer: png16Buffer },
    { size: 32, buffer: png32Buffer },
    { size: 48, buffer: png48Buffer }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.resolve('app-favicon.ico'), icoBuffer);
  console.log('Saved public/favicon.ico & app-favicon.ico (Multi-res ICO)');
}

// Function to construct standard valid Windows ICO containing PNG images
function createIco(images) {
  const numImages = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + (dirEntrySize * numImages);

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved (0)
  header.writeUInt16LE(1, 2); // Image type: 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  const entries = [];
  const imageBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    const size = img.size >= 256 ? 0 : img.size;
    entry.writeUInt8(size, 0); // Width
    entry.writeUInt8(size, 1); // Height
    entry.writeUInt8(0, 2);    // Color palette
    entry.writeUInt8(0, 3);    // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6);// Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image data size in bytes
    entry.writeUInt32LE(offset, 12); // Offset to image data

    entries.push(entry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
