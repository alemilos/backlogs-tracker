import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      components: "/src/components",
      assets: "/src/assets",
      pages: "/src/pages",
      providers: "/src/providers",
      stores: "/src/stores",
      constants: "/src/constants",
      utils: "/src/utils",
      services: "/src/services",
      hooks: "/src/hooks",
    },
  },
});
