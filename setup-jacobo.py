#!/usr/bin/env python3
"""
Script para descargar imagen de Jacobo Grinberg y configurarla
Uso: python3 setup-jacobo.py
"""

import urllib.request
import os
import shutil
from pathlib import Path

def download_image():
    image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqXLJUaznDHpoZGnAbu4WzXBE5nufMAXh1tn6P8itOyjzoyZxgnkgrCO52ZXGw-C5eZGx5MY7qxy9IfBMBvbbDjFQQIkrCuvTJjAwnw&s=10"
    
    image_dir = Path(__file__).parent / "app" / "public" / "images"
    image_dir.mkdir(parents=True, exist_ok=True)
    
    jacobo_path = image_dir / "jacobo.jpeg"
    jacobo_avatar_path = image_dir / "jacobo-avatar.jpeg"
    
    print("📥 Descargando imagen de Jacobo Grinberg...")
    
    try:
        # Descargar imagen
        urllib.request.urlretrieve(image_url, jacobo_path)
        print(f"✅ Imagen principal guardada: {jacobo_path}")
        
        # Copiar como avatar
        shutil.copy(jacobo_path, jacobo_avatar_path)
        print(f"✅ Avatar guardado: {jacobo_avatar_path}")
        
        print("\n✨ ¡Imágenes de Jacobo Grinberg configuradas exitosamente!")
        print("   Ahora puedes ejecutar: cd app && npm start")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = download_image()
    exit(0 if success else 1)
