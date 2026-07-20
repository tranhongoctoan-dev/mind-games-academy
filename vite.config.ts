import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tanstackStart(),
    tsconfigPaths()
  ]
})