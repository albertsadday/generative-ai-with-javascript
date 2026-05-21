#!/usr/bin/env bash
set -euo pipefail

# Uso: download-jacobo-avatar.sh <image-url>
IMAGE_URL="$1"
IMAGE_DIR="app/public/images"

if [ -z "$IMAGE_URL" ]; then
  echo "Usage: $0 <image-url>"
  exit 1
fi

mkdir -p "$IMAGE_DIR"

echo "📥 Descargando avatar desde: $IMAGE_URL"

# Intentar descargar con curl, fallback wget
if command -v curl >/dev/null 2>&1; then
  curl -L --fail -o "$IMAGE_DIR/jacobo-avatar.jpeg" "$IMAGE_URL"
elif command -v wget >/dev/null 2>&1; then
  wget -O "$IMAGE_DIR/jacobo-avatar.jpeg" "$IMAGE_URL"
else
  echo "Error: ni curl ni wget están disponibles en el entorno. Ejecuta manualmente la descarga." >&2
  exit 2
fi

echo "✅ Avatar reemplazado: $IMAGE_DIR/jacobo-avatar.jpeg"
