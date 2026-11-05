// scripts/generate-icons.js
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPng(width, height, isMaskable = false) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data with scanlines
  const rawBytes = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  // White background with Royal Blue border and BG in German Flag colors
  for (let y = 0; y < height; y++) {
    rawBytes[offset++] = 0; // Filter byte: None
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;

      // Base background: Crisp white with very soft blue-gray gradient
      let r = 255;
      let g = 255;
      let b = 255;
      let a = 255;

      const cx = (nx - 0.5);
      const cy = (ny - 0.5);
      const rx = Math.abs(cx);
      const ry = Math.abs(cy);

      // Outer Royal Blue border
      if (!isMaskable && (rx > 0.44 || ry > 0.44)) {
        r = 37; g = 99; b = 235; // Royal Blue #2563eb
      } else if (!isMaskable && (rx > 0.41 || ry > 0.41)) {
        r = 241; g = 245; b = 249; // Slate-100
      }

      // Top German Flag Stripe
      if (ny > 0.16 && ny < 0.22 && nx > 0.28 && nx < 0.72) {
        if (ny < 0.18) { r = 24; g = 24; b = 27; } // Black
        else if (ny < 0.20) { r = 225; g = 29; b = 72; } // Red
        else { r = 250; g = 204; b = 21; } // Gold
      }

      // "BG" letters representation in center with German Flag Tricolor
      // Center box for 'B' (left) and 'G' (right)
      if (ny > 0.32 && ny < 0.72) {
        const inB = nx > 0.22 && nx < 0.48;
        const inG = nx > 0.52 && nx < 0.78;

        if (inB || inG) {
          // Fill BG with German Flag Tricolor:
          // Top third: Black #18181b
          // Middle third: Red #e11d48
          // Bottom third: Gold #facc15
          if (ny < 0.45) {
            r = 24; g = 24; b = 27; // Schwarz (Black)
          } else if (ny < 0.58) {
            r = 225; g = 29; b = 72; // Rot (Red)
          } else {
            r = 250; g = 204; b = 21; // Gold
          }
        }
      }

      // Bottom Royal Blue ribbon bar
      if (ny > 0.78 && ny < 0.86 && nx > 0.24 && nx < 0.76) {
        r = 30; g = 64; b = 175; // Royal Blue #1e40af
      }

      rawBytes[offset++] = r;
      rawBytes[offset++] = g;
      rawBytes[offset++] = b;
      rawBytes[offset++] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawBytes, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.png'), createPng(48, 48, false));

console.log('Successfully generated all PWA PNG icons!');
