# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TecnoCore Guatemala — academic e-commerce (UMG, Desarrollo Web). Active branch: `Tarea5` (builds on `Tarea4`, which stays as the pre-JWT snapshot). Two independent npm projects in one repo:

- **Root (`/`)** — React 18 + Vite 5 frontend, React-Bootstrap, React Router 6.
- **`backend/`** — Node.js (ESM) + Express 4 + Mongoose 8 REST API on MongoDB Atlas.

Both are deployed together to the Netlify site `erashong-tarea5-tecnocore` (https://erashong-tarea5-tecnocore.netlify.app). The pre-JWT `Tarea4` branch is still live at `erashong-tarea4-tecnocore`. Each Tarea/HojaTrabajo has its own Netlify site — don't redeploy older ones. The folder is linked via `.netlify/state.json` (gitignored, not connected to GitHub, so deploy manually with `netlify deploy --build --prod` — install `netlify-cli` globally and call the `netlify` binary directly; invoking it through `npx` re-exports this machine's global `allow-scripts` npmrc setting as an env var to child processes, which makes the nested `npm ci` in `build.command` fail with `EALLOWSCRIPTS`).

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
- Backend: `backend/.env` (template `backend/.env.example`) — `MONGODB_URI` (must include the database name, `...mongodb.net/tecnocore?...`; without it Mongoose silently uses the empty `test` database), `PORT` (default 4000), `CORS_ORIGIN` (comma-separated; empty = allow all), `JWT_SECRET` (signing key) and `JWT_EXPIRES_IN` (token lifetime — `5m` per the Tarea 5 requirement; never hardcode this in code, only read it from env).
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
- `POST /api/auth/register` `{nombre, correo, password}` → 201 `{message, token, user}` (always `rol: 'cliente'`)
- `POST /api/auth/login` `{correo, password}` → 200 `{message, token, user}`
- `/api/recursos` — products CRUD: `GET /` (query `categoria`, `q`, `featured`, `disponibilidad`), `GET /:id` are public; `POST /`, `PUT|PATCH /:id`, `DELETE /:id` require `requireAuth`

Important details:
- **Stateless JWT auth (Tarea 5).** `authController.js` signs `jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })` in both `login` and `register`. `middleware/auth.js` (`requireAuth`) reads `Authorization: Bearer <token>`, verifies it, and attaches the decoded payload to `req.user`. It's mounted only on the mutating `/api/recursos` routes (`productoRoutes.js`) — reads stay public since the storefront browses the catalog without logging in. Rejections are always `401`: missing/malformed header → `{error: 'unauthorized'}`, `TokenExpiredError` → `{error: 'token_expired', message: '...'}` (exact message required by the assignment), any other verify failure → `{error: 'invalid_token'}`.
- The `admin` role is only enforced client-side (`RequireAdmin`); the backend only checks that the JWT is valid, not the `role` claim. There is no admin seed/endpoint — promote a user by editing `rol` in MongoDB.
- Both models use a `toJSON` transform: `_id` → `id` (string), `__v` removed; `User` also strips `password` (`select: false`, bcrypt hash in a `pre('save')` hook). The frontend relies on `id`, never `_id`.
- `Producto.availability` enum: `'En existencia' | 'Últimas unidades' | 'Agotado'`. `category` holds a slug matching `categories` in `src/data/products.js`.

## Frontend architecture

Provider order in `main.jsx`: `AuthProvider` → `ProductsProvider` → `CartProvider` (Cart depends on Products). All routes are children of `components/Layout` in `App.jsx`; `/perfil` is wrapped in `RequireAuth`, `/admin/productos` in `RequireAdmin`.

- `AuthContext` (`useReducer`) persists the logged-in user in `localStorage` key `tc_auth_user`; `loading` starts `true` until hydrated, and guards render `null` while loading. It also calls `useNavigate()` (must stay inside `BrowserRouter`, which it is in `main.jsx`) and listens for the `auth:session-expired` window event dispatched by `services/api.js` to clear state and redirect to `/login`.
- `services/api.js` is the single `fetch` wrapper: it attaches `Authorization: Bearer <token>` (token in `localStorage` key `tc_auth_token`, via `setAuthToken`/`clearAuthToken`) to every request, and on a `401` *that included a token* dispatches `auth:session-expired` (a `401` with no token attached — e.g. a failed login — is not treated as a session expiry).
- `Layout.jsx` renders a `Toast` (react-bootstrap) bound to `AuthContext`'s `sessionMessage`, shown app-wide whenever the session-expired interceptor fires.
- `ProductsContext` loads `/recursos` on mount; every create/update/delete re-fetches the full list (`refresh`). Mutating calls now require a valid token (attached automatically); if it's missing or expired, the fetch wrapper triggers the session-expired flow above instead of returning data.
- `CartContext` is in-memory only (`{productId, quantity}`, quantity clamped 1–5), joined against `products` by `id`; checkout is simulated.
- `src/data/products.js` still exists for static data (categories, etc.) imported by several pages; products themselves come from the API.
- Product images: `thumbnail` is a **filename** resolved by `getProductThumbnail()` in `src/utils/productImages.js` via `import.meta.glob` over `src/img/products/`. New images must be added to that folder with the exact filename stored in MongoDB.
- Global styles: `bootstrap.min.css` + `src/styles/theme.css`.
