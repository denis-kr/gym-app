# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start dev server at http://localhost:5173
pnpm build         # Production build
pnpm start         # Serve production build
pnpm typecheck     # Type generation + tsc check
pnpm format        # Prettier format all files
pnpm db:generate   # Regenerate Prisma client
pnpm db:migrate    # Run migrations (dev)
pnpm db:seed       # Seed the database
npx cypress open   # Open Cypress e2e test runner (interactive)
npx cypress run    # Run Cypress e2e tests headlessly
```

## Architecture

This is a **React Router v7** full-stack app (file-based SSR with loaders/actions) using:

- **React Router v7** — routing and data loading via `loader`/`action` exports in route files
- **Prisma 7** with `@prisma/adapter-pg` (PostgreSQL driver adapter) — client lives in `prisma/prisma.ts`, schema in `prisma/schema.prisma`, generated client output at `generated/prisma/`
- **shadcn/ui** — component library scaffolded into `app/components/ui/`; `components.json` is the config
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` plugin, no `tailwind.config.js`
- **HugeIcons** (`@hugeicons/react`) — icon library used throughout
- **TanStack Table** (`@tanstack/react-table`) — used for data tables in route components
- **Cypress** — e2e tests live in `cypress/e2e/`

### Database

Requires a running PostgreSQL instance. `docker-compose.yml` spins one up (user/pass/db: `denis`). Connection string is read from `DATABASE_URL` env var.

The data model: `User` → `Record[]`. A `Record` tracks a single lift attempt (exerciseName, reps, weight, unit). There is no auth yet — routes currently hardcode `alex@example.com`.

### Routing

Routes are declared in `app/routes.ts`. All routes share a layout (`app/layout/index.tsx`) that renders a collapsible sidebar (`AppSidebar`) and a top `Header`, with `<Outlet />` for page content.

| Path         | File                       |
| ------------ | -------------------------- |
| `/`          | `app/routes/home.tsx`      |
| `/dashboard` | `app/routes/dashboard.tsx` |
| `/exercises` | `app/routes/exercises.tsx` |
| `/exercise`  | `app/routes/exercise.tsx`  |
| `/login`     | `app/routes/login.tsx`     |

### Conventions

- Route files export a `loader` function (runs server-side) and a default React component; use `useLoaderData<typeof loader>()` to consume loader data.
- Route files that mutate data export an `action` function; use a hidden `_intent` field to distinguish multiple actions in the same form (e.g. `"add"` vs `"delete"`). Use `useFetcher` for in-page mutations that shouldn't trigger a full navigation.
- Prisma is imported directly in loaders/actions via `import { prisma } from "../../prisma/prisma"`.
- `app/lib/utils.ts` exports the `cn()` helper (clsx + tailwind-merge) used for conditional class names.
- `no-console` is enforced by ESLint — remove debug statements before committing.
