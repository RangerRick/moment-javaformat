const globals = require("globals");
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const prettierRecommended = require("eslint-plugin-prettier/recommended");
const depend = require("eslint-plugin-depend");

return [
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
  prettierRecommended,
  {
    rules: {
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "barrel-files/avoid-barrel-files": "error",
      "barrel-files/avoid-importing-barrel-files": "error",
      "barrel-files/avoid-namespace-import": "error",
      "barrel-files/avoid-re-export-all": "error",
    },
  },
];
