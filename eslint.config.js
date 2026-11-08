// @ts-check
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    ".next/**",
    ".open-next/**",
    ".wrangler/**",
    "node_modules/**",
    "next-env.d.ts",
    "cloudflare-env.d.ts",
    "src/generated/**",
  ]),
  ...nextVitals,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      // New in eslint-plugin-react-hooks 7. The existing "mounted" hydration
      // guards and shadcn's carousel trip it; behaviour is fine, so warn only.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      // These opinionated rules are enabled in stylistic-type-checked above.
      // Feel free to reconfigure them to your own preference.
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
    },
  },
]);
