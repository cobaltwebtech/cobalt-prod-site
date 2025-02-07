import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ...tseslint.configs.recommendedTypeChecked,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    ...astroPlugin.configs.recommended,
    parser: 'astro-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.astro'],
    },
    rules: {
      'astro/no-set-html-directive': 'error',
    },
  },
];
