#!/bin/bash
# Script para descargar la imagen de Jacobo Grinberg

cd "$(dirname "$0")" || exit 1

IMAGE_DIR="app/public/images"
IMAGE_URL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10"

# Crear directorio si no existe
mkdir -p "$IMAGE_DIR"

echo "📥 Descargando imagen de Jacobo Grinberg..."

# Descargar imagen
if command -v wget &> /dev/null; then
    wget -O "$IMAGE_DIR/jacobo.jpeg" "$IMAGE_URL" 2>/dev/null
elif command -v curl &> /dev/null; then
    curl -L -o "$IMAGE_DIR/jacobo.jpeg" "$IMAGE_URL" 2>/dev/null
else
    echo "❌ No se encontró wget ni curl"
    exit 1
fi

# Copiar como avatar
if [ -f "$IMAGE_DIR/jacobo.jpeg" ]; then
    cp "$IMAGE_DIR/jacobo.jpeg" "$IMAGE_DIR/jacobo-avatar.jpeg"
    echo "✅ Imagen principal guardada: $IMAGE_DIR/jacobo.jpeg"
    echo "✅ Avatar guardado: $IMAGE_DIR/jacobo-avatar.jpeg"
    echo "✨ ¡Listo! Ahora puedes ejecutar: npm start en la carpeta app/"
else
    echo "❌ No se pudo descargar la imagen"
    exit 1
fi
