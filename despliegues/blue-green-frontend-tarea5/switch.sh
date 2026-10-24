#!/usr/bin/env bash
# Cambia el tráfico del proxy entre el entorno "blue" (v1) y "green" (v2)
# sin detener ningún contenedor: solo se reemplaza la configuración activa
# de Nginx y se recarga (nginx -s reload), lo que no corta conexiones en curso.
set -euo pipefail
TARGET="${1:?Uso: ./switch.sh blue|green}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

case "$TARGET" in
  blue|green) ;;
  *) echo "Uso: ./switch.sh blue|green" >&2; exit 1 ;;
esac

cp "$DIR/nginx/upstream-$TARGET.conf" "$DIR/nginx/active.conf"
docker compose -f "$DIR/docker-compose.yml" exec proxy nginx -s reload
echo "Tráfico apuntando ahora a: $TARGET"
