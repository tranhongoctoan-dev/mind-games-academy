// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";
var vite_config_default = defineConfig({
  plugins: [
    tanstackStart(),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
