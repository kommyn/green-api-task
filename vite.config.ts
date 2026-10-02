import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { patchCssModules } from "vite-css-modules";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    reactRouter(),
    devtoolsJson(),
    patchCssModules(),
    mode === "development" && basicSsl(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
}));
