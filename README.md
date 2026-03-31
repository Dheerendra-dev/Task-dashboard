# Task Dashboard Frontend

React + Vite task management dashboard with:
- Task listing, filtering, sorting, and layout toggle
- Create/Edit/Delete task flows
- Redux Toolkit state management
- Local storage persistence
- Optional API-backed task sync (DummyJSON)

## Tech Stack

- React 18
- Vite
- Redux Toolkit + React Redux
- React Router
- Tailwind CSS
- Axios

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start local dev server
- `npm run lint` - Run ESLint
- `npm run build` - Production build
- `npm run preview` - Preview built app
- `npm run test` - Runs lint + build checks

## Environment Variables

Create a `.env` file (optional):

```env
VITE_TASKS_API_BASE_URL=https://dummyjson.com
```

If not provided, the app defaults to `https://dummyjson.com`.

## Project Structure

```text
src/
  api/            # API layer
  components/     # UI components
  components/task-form/ # Task form subcomponents/config
  constants/      # Shared constants
  data/           # Static seed/default data
  hooks/          # Custom React hooks
  pages/          # Route-level pages
  services/       # HTTP service setup
  store/          # Redux store, slice, thunks
  utils/          # Reusable utility helpers
```

## Notes

- Tasks are persisted in browser local storage.
- API failures gracefully fall back to local behavior for updates/deletes where applicable.
