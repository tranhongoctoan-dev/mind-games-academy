// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStartVite } from "@tanstack/start/vite";
import tsconfigPaths from "vite-tsconfig-paths";
var vite_config_default = defineConfig({
  plugins: [
    tanstackStartVite(),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
