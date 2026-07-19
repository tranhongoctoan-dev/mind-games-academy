import { defineConfig } from "@lovable.dev/vite-tanstack-config"

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    base: '/mind-games-academy/',
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    }
  }
})