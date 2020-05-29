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
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
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
    'jsx-a11y/anchor-is-valid': 'off',
    'default-case': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
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
    '@typescript-eslint/explicit-function-return-type': 'off',

    //Magento compatibility
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],

    // Prepare for ESLint 7 release
    '@typescript-eslint/camelcase': 'off',

    /**
     * Because we import Magento's declarations we get a bunch of any declarations.
     * If we don't allow this we get a bunch of errors all over the place.
     */
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
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
