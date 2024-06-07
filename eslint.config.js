import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    ignores: [
      '**/dist/*',
      "**/*.config.js",
      "**/*.config.ts",
      'tsconfig.json',
    ]
  },
  { 
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      semi: ['warn', 'always', { omitLastInOneLineBlock: false }],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/ban-types': ['error', {
        types: {
          Function: false,
        },
        extendDefaults: true,
      }],
      'max-len': ['warn', { code: 140, ignoreComments: true, ignoreUrls: true }],
      'indent': ["error", 2],
    }
  }
];