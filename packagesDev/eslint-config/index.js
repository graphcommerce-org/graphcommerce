module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@next/eslint-plugin-next/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', '@next/eslint-plugin-next'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['next.config.js', '**/__tests__/**', '**/_playwright/**'],
      },
    ],
    'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    'no-param-reassign': ['error', { props: false }],
    'jsx-a11y/anchor-is-valid': 'off',
    'default-case': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useIsomorphicLayoutEffect)' }],
    'no-console': [1, { allow: ['warn', 'error', 'info'] }],
    '@typescript-eslint/semi': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],

    'no-underscore-dangle': [
      'error',
      { allow: ['__typename', '__type', '_N_X', '_N_Y', '__N', '__NEXT'] },
    ],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/require-default-props': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-plusplus': 0,
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // Remove when fixed: https://github.com/react-hook-form/react-hook-form/issues/2887
    '@typescript-eslint/unbound-method': 'off',

    'import/no-relative-packages': 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['generated/*'],
      rules: {
        '@typescript-eslint/camelcase': 'off',
      },
    },
  ],
}
