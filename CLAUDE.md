# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TecnoCore Guatemala — academic e-commerce (UMG, Desarrollo Web). Active branch: `Tarea4`. Two independent npm projects in one repo:

- **Root (`/`)** — React 18 + Vite 5 frontend, React-Bootstrap, React Router 6.
- **`backend/`** — Node.js (ESM) + Express 4 + Mongoose 8 REST API on MongoDB Atlas.

Both are deployed together to the Netlify site `erashong-tarea4-tecnocore` (https://erashong-tarea4-tecnocore.netlify.app). Each Tarea/HojaTrabajo has its own Netlify site — don't redeploy older ones. The folder is linked via `.netlify/state.json` (not connected to GitHub, so deploy manually).

Code, identifiers, comments, UI text and API messages are in **Spanish**.

## Commands

```bash
# Frontend (repo root)
npm run dev        # Vite dev server, http://localhost:5173
npm run build      # -> dist/
npm run lint       # ESLint (flat config, eslint.config.js)
npm run preview
npx netlify-cli deploy --build --prod   # build frontend + bundle API function and publish

# Backend (cd backend)
npm run dev        # nodemon src/server.js, http://localhost:4000
npm start          # node src/server.js
npm run seed       # upserts the 20 seed products by `code`
```

No test suite exists. Endpoints are exercised with `postman_collection.json` (variables `baseUrl`, `productoId`).

## Environment

- Frontend: `VITE_API_URL` in `.env.development` (`http://localhost:4000/api`) / `.env.production` (`/api`, same origin on Netlify). All requests go through `src/services/api.js`, which prefixes `VITE_API_URL`.
- Backend: `backend/.env` (template `backend/.env.example`) — `MONGODB_URI` (must include the database name, `...mongodb.net/tecnocore?...`; without it Mongoose silently uses the empty `test` database), `PORT` (default 4000), `CORS_ORIGIN` (comma-separated; empty = allow all).
- `server.js` forces DNS to 8.8.8.8/1.1.1.1 so `mongodb+srv` SRV lookups work on restrictive networks; outbound port 27017 may still be blocked on corporate networks.
- Netlify: `MONGODB_URI` is a site env var (the free plan doesn't allow secret/scoped vars; it's not `VITE_`-prefixed so it never reaches the bundle). `CORS_ORIGIN` isn't needed in production because the API is same-origin.
- `.gitignore` excludes `.env`, `.env.local`, `.netlify` and `node_modules/`. The frontend `.env.development` / `.env.production` are tracked on purpose (they only hold the public API URL) — never put secrets in them.

## Backend architecture

`src/app.js` builds the Express app (no `listen`). Two entry points use it:
- `src/server.js` — local: loads dotenv, connects, listens.
- `netlify/functions/api.js` — Netlify Function wrapped with `serverless-http`; `netlify.toml` rewrites `/api/*` → `/.netlify/functions/api/:splat` (must stay before the SPA `/*` fallback), and `app.js` strips that prefix back to `/api`. Build command runs `npm ci --prefix backend` so the function can bundle backend deps; `mongoose` is marked external.

`connectDB()` caches its promise so warm function invocations reuse the Mongo connection.

Request flow: `app.js` → `routes/` → `controllers/` (wrapped in `asyncHandler`) → Mongoose `models/`. Errors thrown in controllers are mapped centrally in `middleware/errorHandler.js`: `CastError` → 404, duplicate key `11000` → 409, `ValidationError` → 400, else 500. All error bodies are `{ message }`.

Routes (mounted under `/api`):
- `GET /api` — health check
- `POST /api/auth/register` `{nombre, correo, password}` → 201 `{message, user}` (always `rol: 'cliente'`)
- `POST /api/auth/login` `{correo, password}` → 200 `{message, user}`
- `/api/recursos` — products CRUD: `GET /` (query `categoria`, `q`, `featured`, `disponibilidad`), `GET /:id`, `POST /`, `PUT|PATCH /:id`, `DELETE /:id`

Important details:
- **No tokens/sessions.** Login just returns the user object; the API has no auth middleware, so product CRUD is public. The `admin` role is only enforced client-side (`RequireAdmin`). There is no admin seed/endpoint — promote a user by editing `rol` in MongoDB.
- Both models use a `toJSON` transform: `_id` → `id` (string), `__v` removed; `User` also strips `password` (`select: false`, bcrypt hash in a `pre('save')` hook). The frontend relies on `id`, never `_id`.
- `Producto.availability` enum: `'En existencia' | 'Últimas unidades' | 'Agotado'`. `category` holds a slug matching `categories` in `src/data/products.js`.

## Frontend architecture

Provider order in `main.jsx`: `AuthProvider` → `ProductsProvider` → `CartProvider` (Cart depends on Products). All routes are children of `components/Layout` in `App.jsx`; `/perfil` is wrapped in `RequireAuth`, `/admin/productos` in `RequireAdmin`.

- `AuthContext` (`useReducer`) persists the logged-in user in `localStorage` key `tc_auth_user`; `loading` starts `true` until hydrated, and guards render `null` while loading.
- `ProductsContext` loads `/recursos` on mount; every create/update/delete re-fetches the full list (`refresh`).
- `CartContext` is in-memory only (`{productId, quantity}`, quantity clamped 1–5), joined against `products` by `id`; checkout is simulated.
- `src/data/products.js` still exists for static data (categories, etc.) imported by several pages; products themselves come from the API.
- Product images: `thumbnail` is a **filename** resolved by `getProductThumbnail()` in `src/utils/productImages.js` via `import.meta.glob` over `src/img/products/`. New images must be added to that folder with the exact filename stored in MongoDB.
- Global styles: `bootstrap.min.css` + `src/styles/theme.css`.
