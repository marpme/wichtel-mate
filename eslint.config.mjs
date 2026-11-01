import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import react from "eslint-plugin-react";
import tanstackQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  globalIgnores([
    "node_modules/",
    ".next/",
    "out/",
    "cypress/downloads/",
    "cypress/screenshots/",
    "cypress/videos/",
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  ...tanstackQuery.configs["flat/recommended"],
  {
    settings: { react: { version: "detect" } },
    rules: {
      // mount-only effects are used deliberately to avoid hydration mismatches
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
