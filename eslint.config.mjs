import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import react from '@eslint-react/eslint-plugin';
import hooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y-x';
import ts from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
  },
  {
    files: ['postcss.config.js'],
    languageOptions: { globals: { module: 'readonly' } },
  },
  ...ts.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ...next.configs['core-web-vitals'],
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...react.configs['recommended-typescript'],
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...hooks.configs.flat.recommended,
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...a11y.configs.recommended,
  },
]);
