import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfigAll from "eslint-plugin-react/configs/all.js"
import pluginReactConfigJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReactConfigAll,
    rules: {
      ...pluginReactConfigAll.rules,
      "react/jsx-max-depth": 0,
      "react/jsx-filename-extension": 0,
      "react/forbid-component-props": 0,
      "react/require-default-props": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-newline": 0,
      "react/jsx-no-literals": 0,
      "react/jsx-no-bind": 0,
      "react/jsx-props-no-spreading": 0,
      "react/no-multi-comp": 0,
      "react/require-optimization": 0,
      "react/jsx-indent": [
        2,
        2,
        { checkAttributes: true, indentLogicalExpressions: true },
      ],
      "react/jsx-indent-props": [2, 2],
      "react/jsx-max-props-per-line": [2, { when: "multiline" }],
      "react/jsx-sort-props": [
        2,
        {
          noSortAlphabetically: true,
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
        },
      ],
    },
  },
  pluginReactConfigJsxRuntime,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
]
