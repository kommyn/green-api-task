import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

export default defineConfig([
  {
    ignores: ["build/**", "node_modules/**/*", ".react-router/**/*"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "19",
      },
      settings: {
        "import-x/resolver-next": [
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            project: "./tsconfig.json",
          }),
        ],
      },
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  eslintPluginPrettier,
]);
