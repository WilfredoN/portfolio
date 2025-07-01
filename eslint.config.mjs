import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: false,
  stylistic: false,

  rules: {
    'antfu/no-top-level-await': 'off',
    'curly': ['error', 'all'],
    'node/no-process-env': 'off',
    'node/prefer-global/process': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'perfectionist/sort-imports': ['error', {
      internalPattern: ['^@/'],
    }],
    'antfu/top-level-function': 'off',
    'prefer-arrow-callback': ['error'],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
})
