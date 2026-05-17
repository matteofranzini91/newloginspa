import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/config/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.github/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.md',
      '**/*.d.ts',
    ],
  },

  // Base recommended rules
  js.configs.recommended,

  // TypeScript + React files (note: @typescript-eslint plugin is not compatible
  // with ESLint 10 — this is a pre-existing scaffolding constraint.
  // Type safety is enforced by TypeScript compiler during build.)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      semi: [2, 'always'],
      'no-extra-parens': 'off',
      'max-len': 'off',
      'no-multi-spaces': 'error',
      'no-console': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      indent: 'off',
      // TypeScript handles these:
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
