import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, 'app/public/images');
const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10';

// Crear directorio si no existe
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Descargar la imagen
const jacoboPath = path.join(imageDir, 'jacobo.jpeg');
const jacoboAvatarPath = path.join(imageDir, 'jacobo-avatar.jpeg');

console.log('Descargando imagen de Jacobo Grinberg...');

https.get(imageUrl, (response) => {
  let imageData = [];

  response.on('data', (chunk) => {
    imageData.push(chunk);
  });

  response.on('end', () => {
    const buffer = Buffer.concat(imageData);
    
    try {
      // Guardar imagen principal
      fs.writeFileSync(jacoboPath, buffer);
      console.log(`✅ Imagen principal guardada: ${jacoboPath}`);

      // Crear copia como avatar (usaremos la misma imagen por ahora)
      fs.writeFileSync(jacoboAvatarPath, buffer);
      
      console.log(`✅ Avatar guardado: ${jacoboAvatarPath}`);
      console.log('\n¡Imágenes de Jacobo Grinberg descargadas exitosamente!');
    } catch (error) {
      console.error('Error procesando imagen:', error);
    }
  });
}).on('error', (error) => {
  console.error('Error descargando imagen:', error);
});
