#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'app/public/images');
const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10';

// Crear directorio si no existe
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
  console.log(`✅ Directorio creado: ${imageDir}`);
}

const jacoboPath = path.join(imageDir, 'jacobo.jpeg');
const jacoboAvatarPath = path.join(imageDir, 'jacobo-avatar.jpeg');

console.log('📥 Descargando imagen de Jacobo Grinberg...');

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

      // Guardar como avatar
      fs.writeFileSync(jacoboAvatarPath, buffer);
      console.log(`✅ Avatar guardado: ${jacoboAvatarPath}`);
      
      console.log('\n✨ ¡Imágenes de Jacobo Grinberg descargadas exitosamente!');
      console.log('   Ahora puedes ejecutar: npm start');
    } catch (error) {
      console.error('❌ Error procesando imagen:', error.message);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('❌ Error descargando imagen:', error.message);
  process.exit(1);
});
