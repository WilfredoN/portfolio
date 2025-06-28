import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'antfu/no-top-level-await': 'off',
    'style/no-tabs': 'off',
    'style/jsx-quotes': 'off',
    'style/comma-dangle': 'off',
    'curly': ['error', 'all'],
    'style/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var', 'if', 'for', 'while', 'switch', 'block', 'block-like'], next: 'if' },
    ],
    'node/no-process-env': 'off',
    'node/prefer-global/process': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'perfectionist/sort-imports': ['error', {
      internalPattern: ['^@/'],
    }],
    'antfu/top-level-function': 'off',
    'prefer-arrow-callback': ['error'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

  },
})
