import next from '@next/eslint-plugin-next';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import babelParser from '@babel/eslint-parser';

export default [
  {
    // Core configuration
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['next/babel']
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    // Next.js rules
    plugins: {
      '@next/next': next,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    rules: {
      ...next.configs.recommended.rules,
      '@next/next/no-html-link-for-pages': 'off'
    }
  },
  {
    // React rules
    ...reactRecommended,
    rules: {
      ...reactRecommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn'
    }
  },
  {
    ignores: ['node_modules/', '.next/', 'coverage/']
  }
];