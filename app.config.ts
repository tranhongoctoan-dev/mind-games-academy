import { defineConfig } from '@tanstack/start-config'

export default defineConfig({
  server: {
    preset: 'vercel',
  },
  tsr: {
    routesDirectory: './src/routes',
    generatedRouteTree: './src/routeTree.gen.ts',
  },
})
