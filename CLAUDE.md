# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (Vite)
npm run build      # Production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

No test runner is configured.

## Commit Conventions

Commitlint is enforced via Husky pre-commit hooks. Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `add`, `modify`. Subject case is not enforced (Japanese subjects are supported).

Pre-commit hooks also run ESLint + Prettier on staged files automatically.

## Architecture

**Shogun Tours Dashboard** — admin dashboard for a tour booking management system targeting Japan tourism operators.

**Stack:** React 19 + TypeScript/JSX, Vite 6, Tailwind CSS v4, React Router v7, TanStack React Query v5, MUI, Axios.

**Path aliases** (configured in `vite.config.ts`):
- `@` → `src/`
- `@components` → `src/components/`

### Feature Module Structure

Each major feature (`tour`, `blog`, `book`, `employee`, `chat`) follows this pattern:
```
src/components/<feature>/
  context/        # React Context providers + custom hooks
  list/           # List view component
  create/ or operator/  # Create/edit form
```

Features use their own Context providers for local state. Global state is handled by three root-level contexts in `src/context/`:
- **CommonContext** — app-wide error/success handling, modal state, account info
- **ThemeContext** — dark/light mode
- **SidebarContext** — sidebar expand/collapse, active menu tracking

### API Integration

- **Base URL:** `https://shoguntoursjapan.com/api` (configured in `src/config/config.js`)
- **Image storage:** `https://shoguntoursjapan.com/storage`
- **ApiClient** (`src/components/services/ApiClient.js`) — thin Axios wrapper with two methods:
  - `fetchGet(url)` — GET with Bearer token from localStorage
  - `fetchPost(url, data)` — POST as `multipart/form-data` with Bearer token
- All endpoint paths are centralized in `src/config/config.js`

### Authentication

Token-based auth — Bearer token stored in `localStorage`. `PrivateRoute` component wraps all dashboard routes. Public routes are `/signin` and `/signup/:token` (sign-up requires a secret token in the URL).

### Routing

React Router v7 with two layouts:
1. **Auth layout** — sign-in/sign-up pages
2. **App layout** (`AppLayout`) — sidebar + header wrapping all protected dashboard pages

### Styling

Tailwind CSS v4 using `@tailwindcss/postcss`. Custom theme (breakpoints, color palette, typography) is defined in `src/index.css` using `@theme` layer — not in a separate `tailwind.config.js`. Outfit font from Google Fonts.

### Mixed TypeScript/JSX

Core layout files (`AppLayout`, `AppSidebar`, contexts) are `.tsx`. Most feature components are `.jsx`. Both coexist without issue.
