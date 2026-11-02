<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# module44-client

Next.js 16.4 App Router frontend for a separate users API. There is no `src/`; `@/*` maps to the repo root (`app/`, `components/`, `lib/`, `hooks/`).

## Commands

- `npm run dev` — dev server (default port 3000).
- `npm run typecheck` — `tsc --noEmit`; verifies TS only (see JS note below).
- `npm run lint` — ESLint flat config. First cold run can take a couple of minutes; not hung.
- `npm run build` — production build; requires the backend (below).
- `npm run format` — Prettier, but only `**/*.{ts,tsx}`; run Prettier directly for `.jsx` files.

There is no test script/test suite and no CI workflow.

## Backend dependency

All data access uses a hardcoded `http://localhost:5000/users` API:

- Server reads: `data()` / `singleData()` in `lib/utils.ts`.
- Client writes: `POST` in `app/users/new/page.jsx`, `PATCH`/`DELETE` in `components/UserCard.tsx`.

Run the API on port 5000 before `npm run dev`. `npm run build` also needs it: Next prerenders `/users` and fails with `ECONNREFUSED ... :5000` when the API is down. Because `/users` is prerendered, its data is baked in at build time; add `export const dynamic = "force-dynamic"` there if it must be fetched per request. Changing the API host requires editing all three files above (no env var exists).

Client writes are cross-origin (`:3000` → `:5000`), so the API must allow CORS; the server-side reads do not need it.

The backend is the sibling directory `../module44-mongodbAtlasSetup`. It has no start script; run `node index.js` there. It listens on port 5000, reads `MONGO_USER` from its `.env`, and may take ~20 seconds to connect to MongoDB Atlas before the port starts listening.

## Structure and conventions

- Routes: `/` → `/users` (server list) → `/users/new` (client form) / `/users/[id]` (server detail). Edit/delete live in the client `UserCard` dialog. Shared user type: `Tuser` in `components/types/type.ts` (`_id` is the key).
- There are no Next.js route handlers or server actions; writes go directly from client components to the external API.
- The project mixes TS and JS: `app/users/new/page.jsx` and `app/users/[id]/page.jsx` are JSX, and `checkJs` is off, so `npm run typecheck` does not validate them. Prefer `.tsx` for new files.
- UI is shadcn/ui `base-nova` on top of Base UI primitives, not Radix. Use `render={<Button ... />}` for composition; `asChild` does not exist here.
- Add UI components with `npx shadcn@latest add <name>`; aliases are `@/components/ui`, `@/lib`, `@/hooks`.
- `cn` comes from the `cn` package; `@/lib/utils` re-exports it. Tailwind v4 styles live in `app/globals.css`, which delegates theme tokens to `shadcn/tailwind.css`.
- Prettier enforces no semicolons, double quotes, LF, 80 columns, and Tailwind class sorting (`cn`/`cva`).
