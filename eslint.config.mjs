import antfu from '@antfu/eslint-config'
import eslintPluginNext from '@next/eslint-plugin-next'
import eslintPluginQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import eslintPluginSonarjs from 'eslint-plugin-sonarjs'

export default antfu(
  {
    react: true,
    typescript: true,

    lessOpinionated: true,
    isInEditor: false,

    formatters: {
      css: 'prettier',
    },

    ignores: ['*.md'],
  },
  {
    plugins: {
      '@next/next': eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
    },
  },
  eslintPluginPrettier,
  eslintConfigPrettier,
  eslintPluginSonarjs.configs.recommended,
  eslintPluginQuery.configs['flat/recommended'],
  {
    rules: {
      // antfu
      'antfu/consistent-chaining': 'off',
      'antfu/no-top-level-await': 'off',

      // node
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',

      // ts
      'ts/no-misused-promises': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],

      // react
      'react/no-forward-ref': 'off',
      'react/no-array-index-key': 'off',

      // next
      '@next/next/no-img-element': 'off',

      // stylistic
      'style/semi': ['error', 'never'],
      'style/quotes': ['error', 'single', { avoidEscape: true }],
      'style/jsx-sort-props': ['error', { shorthandFirst: true, noSortAlphabetically: true, callbacksLast: true }],
    },
  }
)
