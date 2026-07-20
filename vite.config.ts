import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// NOTE: This project builds via vinxi (see app.config.ts using
// @tanstack/start-config). This vite.config.ts is kept only for tooling that
// probes a Vite config; the real build entry is app.config.ts.
export default defineConfig({
  plugins: [tsconfigPaths()],
})
