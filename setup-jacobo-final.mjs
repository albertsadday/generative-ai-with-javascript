import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.join(__dirname, 'app/public/images');
const pageUrl = 'https://fundacionmesaverde.org/informacion-curso-jacobo-grinberg-conciencia-y-realidad/';
const fallbackImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10';

function getAbsoluteUrl(url, base) {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

function extractImageUrl(html, baseUrl) {
  const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (ogImageMatch) {
    return getAbsoluteUrl(ogImageMatch[1], baseUrl);
  }

  const imgMatches = Array.from(html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi));
  for (const match of imgMatches) {
    const src = match[1];
    if (!src.startsWith('data:') && !src.startsWith('javascript:')) {
      return getAbsoluteUrl(src, baseUrl);
    }
  }

  return null;
}

async function downloadFile(url, destination) {
  try {
    execSync(`curl -L -o "${destination}" "${url}"`, { stdio: 'pipe' });
    return true;
  } catch {
    try {
      execSync(`wget -O "${destination}" "${url}"`, { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }
}

async function downloadImage() {
  try {
    await fs.mkdir(imageDir, { recursive: true });

    const jacoboPath = path.join(imageDir, 'jacobo.jpeg');
    const jacoboAvatarPath = path.join(imageDir, 'jacobo-avatar.jpeg');

    console.log('📥 Descargando imagen de Jacobo Grinberg desde la página indicada...');

    let imageUrl = null;
    try {
      const response = await fetch(pageUrl);
      const html = await response.text();
      imageUrl = extractImageUrl(html, pageUrl);
    } catch (fetchError) {
      console.warn('⚠️ No se pudo leer la página directamente:', fetchError.message);
    }

    if (!imageUrl) {
      console.warn('⚠️ No se encontró una imagen directa en la página. Usando URL de imagen de respaldo.');
      imageUrl = fallbackImageUrl;
    }

    console.log(`📷 Usando imagen: ${imageUrl}`);
    const downloaded = await downloadFile(imageUrl, jacoboPath);
    if (!downloaded) {
      console.warn('⚠️ No se pudo descargar la imagen. Usando imagen alternativa local...');
      const adaPath = path.join(imageDir, 'ada.jpeg');
      try {
        await fs.copyFile(adaPath, jacoboPath);
      } catch (e) {
        console.error('❌ No se pudo crear archivo local de respaldo:', e.message);
        process.exit(1);
      }
    }

    await fs.copyFile(jacoboPath, jacoboAvatarPath);

    console.log(`✅ Imagen principal: ${jacoboPath}`);
    console.log(`✅ Avatar: ${jacoboAvatarPath}`);
    console.log('\n✨ ¡Jacobo Grinberg está listo!');
    console.log('   Ejecuta: cd app && npm start');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

downloadImage();
