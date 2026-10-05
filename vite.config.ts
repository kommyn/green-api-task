import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { patchCssModules } from "vite-css-modules";

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss(), reactRouter(), patchCssModules()].filter(Boolean),
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: command === "build" ? ["redux-persist"] : [],
  },
}));
