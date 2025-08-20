import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import depend from "eslint-plugin-depend";
import { defineConfig } from "eslint/config";
import noBarrelFiles from "eslint-plugin-no-barrel-files";

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  depend.configs["flat/recommended"],
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  noBarrelFiles.flat,
  {
    rules: {
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-barrel-files/no-barrel-files": "error",
      "depend/ban-dependencies": [
        "error",
        {
          allowed: ["moment"],
        },
      ],
    },
  },
]);
