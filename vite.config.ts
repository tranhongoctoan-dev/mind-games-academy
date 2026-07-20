import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// Actual build entry is app.config.ts (vinxi + @tanstack/start-config).
// This file exists only for tooling that probes a vite.config.
export default defineConfig({
  plugins: [tsconfigPaths()],
})
