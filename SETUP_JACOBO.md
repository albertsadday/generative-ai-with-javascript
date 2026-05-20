# Configuración de Jacobo Grinberg

## Estado Actual ✅

Jacobo Grinberg ha sido agregado exitosamente a `characters.json` con:
- **Nombre**: Jacobo Grinberg
- **ID**: jacobo
- **Voz**: 266
- **Descripción**: Neurofisiólogo y psicólogo mexicano, especialista en conciencia y percepción

## Pasos Finales: Agregar Imágenes

Para que Jacobo aparezca completamente en la app, necesitas agregar dos imágenes al directorio `app/public/images/`:

### Opción 1: Descargar automáticamente (recomendado)

Ejecuta desde la raíz del proyecto:

```bash
# Usando Python (Linux/Mac)
python3 setup-jacobo.py

# O usando el script bash
bash setup-jacobo.sh

# O usando Node.js
node setup-jacobo.js
```

### Opción 2: Descargar manualmente

1. Descarga la imagen de Jacobo desde: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10

2. Guarda como: `app/public/images/jacobo.jpeg`

3. Haz una copia para el avatar: `app/public/images/jacobo-avatar.jpeg`

### Opción 3: Copiar desde otra imagen (temporal)

```bash
cp app/public/images/ada.jpeg app/public/images/jacobo.jpeg
cp app/public/images/jacobo.jpeg app/public/images/jacobo-avatar.jpeg
```

## Verificar que todo está correcto

Ejecuta:
```bash
ls -la app/public/images/ | grep jacobo
```

Deberías ver:
- jacobo.jpeg
- jacobo-avatar.jpeg

## Iniciar la app

```bash
cd app
npm start
```

¡Ahora Jacobo Grinberg debería aparecer en la lista de personajes! 🎉
