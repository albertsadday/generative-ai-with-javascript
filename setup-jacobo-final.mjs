import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.join(__dirname, 'app/public/images');
const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10';

async function downloadImage() {
  try {
    await fs.mkdir(imageDir, { recursive: true });
    
    const jacoboPath = path.join(imageDir, 'jacobo.jpeg');
    const jacoboAvatarPath = path.join(imageDir, 'jacobo-avatar.jpeg');
    
    console.log('📥 Descargando imagen de Jacobo Grinberg...');
    
    // Intentar con curl
    try {
      execSync(`curl -L -o "${jacoboPath}" "${imageUrl}"`, { stdio: 'pipe' });
    } catch {
      // Si curl falla, intentar con wget
      try {
        execSync(`wget -O "${jacoboPath}" "${imageUrl}"`, { stdio: 'pipe' });
      } catch {
        // Si ambos fallan, copiar desde una imagen existente
        console.log('⚠️  No se pudo descargar. Usando imagen alternativa...');
        const adaPath = path.join(imageDir, 'ada.jpeg');
        try {
          await fs.copyFile(adaPath, jacoboPath);
        } catch (e) {
          console.error('❌ No se pudo crear archivo:', e.message);
          process.exit(1);
        }
      }
    }
    
    // Copiar como avatar
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
