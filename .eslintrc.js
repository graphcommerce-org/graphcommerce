module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-typescript', 'prettier'],
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
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.stories.tsx'] },
    ],
    'no-param-reassign': ['error', { props: false }],
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'] }],
    'default-case': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    '@typescript-eslint/semi': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
  },
  overrides: [
    {
      files: ['generated/*'],
      rules: {
        '@typescript-eslint/camelcase': 'off',
      },
    },
  ],
}
