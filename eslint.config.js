import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: ts,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: true,
        document: true,
        console: true,
      },
    },
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...prettier.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
