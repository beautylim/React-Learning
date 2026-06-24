# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React 19 + TypeScript + Vite learning project (a "day 3" exercise) practicing Redux Toolkit. The app renders a Meituan-style restaurant ordering page (Chinese UI). Comments and UI strings are in Chinese.

## Commands

```bash
npm run dev      # Vite dev server (HMR)
npm run build    # tsc -b && vite build  — type-checks ALL projects, then builds
npm run lint     # ESLint (flat config). react-hooks rules are errors, not warnings
npm run preview  # serve the production build
npm run serve    # json-server mock API on http://localhost:3004
```

There is no test runner configured. To type-check without building, run `npx tsc -b`.

The app's async thunks fetch from `http://localhost:3004`, so **`npm run serve` must be running** alongside `npm run dev` for data to load.

## Mock API gotcha

`npm run serve` serves `serve/data.json`, which exposes only the `/categories` endpoint (used by the `foods` slice). The `channel` slice fetches `/list`, which lives in the separate `db.json` at the repo root. Only one of these mock sources is wired up at a time — to exercise the channel demo, point json-server at `db.json` instead.

## Architecture

- **Entry**: `src/main.tsx` wraps the app in the Redux `<Provider>` and renders `RestaurantDetail` directly (`App.tsx` is a thin wrapper; the `1.Redux` counter demo is not currently mounted anywhere).
- **Store**: `src/store/index.ts` combines three slices — `counter`, `channel`, `foods`. It exports `RootState` and `AppDispatch` types derived from the store.
- **Typed Redux hooks**: always use `useAppSelector` / `useAppDispatch` from `src/store/hooks.ts`, never the raw react-redux hooks. This is what gives selectors and dispatch their types.
- **Slices** live in `src/store/modules/`. Each slice owns its domain types and a typed `initialState` (e.g. `takeaway.ts` exports `Category` / `MenuItem`, which the component imports rather than redefining). Reducers type their `action` as `PayloadAction<T>`. Async thunks are plain thunk functions typed `(dispatch: AppDispatch) => ...` (not `createAsyncThunk`); they import `AppDispatch` via `import type` to avoid a runtime circular dependency with `index.ts`.
- **Components** in `src/component/` are numbered exercises (`1.Redux`, `2.meituan`). The cart in `2.meituan` is intentionally local `useState`, not Redux — only the menu data comes from the store.

## Conventions

- Derive values during render instead of mirroring them into state via `useEffect` — the `react-hooks/set-state-in-effect` lint rule is enforced as an error. (e.g. `isCheckoutReady` and the active-category fallback are computed inline, not stored.)
- React 19: ref callbacks must not return a value — use a block body (`ref={(el) => { refs.current[id] = el; }}`), not a concise arrow returning the assignment.
- When adding a new slice's state, give it an explicit typed `initialState`; an untyped `[]` infers as `never[]` and breaks `RootState`.
