# Tarea 6 — Estrategia de despliegue Blue-Green con Docker

Manual técnico completo en [`docs/manual-tecnico.md`](docs/manual-tecnico.md).

## Estructura

- `apps/api-tarea4/` — API de la Tarea 4 (Express + MongoDB), instrumentada con `/health` y versión.
- `apps/tienda-tarea5/backend/` y `apps/tienda-tarea5/frontend/` — aplicación de la Tarea 5 (TecnoCore Guatemala).
- `despliegues/blue-green-api-tarea4/` — escenario Blue-Green sobre la API de Tarea 4.
- `despliegues/blue-green-frontend-tarea5/` — escenario Blue-Green sobre el frontend+backend de Tarea 5.

## Inicio rápido

```bash
# Construir imágenes (ver docs/manual-tecnico.md sección 7.1)

cd despliegues/blue-green-api-tarea4
docker compose up -d
curl http://localhost:8081/api/v1
./switch.sh green

cd ../blue-green-frontend-tarea5
docker compose up -d
docker compose exec backend npm run seed
# abrir http://localhost:8082
./switch.sh green
```

No se incluyen credenciales reales; cada app trae su propio `.env.example`.
