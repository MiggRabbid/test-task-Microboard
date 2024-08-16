import js from '@eslint/js';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  reactPlugin.configs.recommended,
  prettierPlugin.configs.recommended,
  typescriptPlugin.configs.recommended,
  {
    ignores: ['dist/*', 'node_modules/*', '.vscode/*'],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: typescriptEslintParser,
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: {
      reactHooksPlugin,
      reactRefreshPlugin,
      typescriptEslintPlugin,
      reactPlugin,
      prettierPlugin
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        '1',
        { allowConstantExport: true },
      ],
      'prettier/prettier': ['error'],
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'react/prop-types': 0,
      'no-console': '1',
      'no-extra-boolean-cast': 0,
      'react/react-in-jsx-scope': 0,
      'react/function-component-definition': [
        2,
        { namedComponents: 'arrow-function' },
      ],
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'no-case-declarations': '0',
      'react-hooks/exhaustive-deps': '1',
      'no-shadow': ['1'],
    },
  },
];


