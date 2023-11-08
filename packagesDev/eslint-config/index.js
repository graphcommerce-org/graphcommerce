module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
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
    // eslint
    'default-case': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-console': [1, { allow: ['warn', 'error', 'info'] }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-underscore-dangle': [
      'error',
      { allow: ['__typename', '__type', '_N_X', '_N_Y', '__N', '__NEXT'] },
    ],
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

    // plugin:import/recommended & plugin:import/typescript
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'next.config.js',
          '**/test/**',
          '**/*.d.ts',
          '**/*.spec.ts',
          '**/__tests__/**',
        ],
      },
    ],
    'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    'import/no-relative-packages': 'error',

    // next
    '@next/next/no-html-link-for-pages': 'off',

    // jsx-a11y
    'jsx-a11y/anchor-is-valid': 'off',

    // react
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react-hooks/exhaustive-deps': [
      'error',
      { additionalHooks: '(useIsomorphicLayoutEffect|useMemoDeep)' },
    ],
    'react/self-closing-comp': ['warn'],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/function-component-definition': 'off',

    // typescript
    // '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-unbound-method': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'next/image',
            message: "Please use `import { Image } from '@graphcommerce/image'` instead.",
          },
          {
            name: '@mui/system',
            message: "Please use `@mui/material'` instead.",
          },
          {
            name: '@mui/material',
            importNames: [
              'Autocomplete',
              'Checkbox',
              'Radio',
              'Select',
              'Slider',
              'Switch',
              'TextField',
              'ToggleButtonGroup',
            ],
            message: `Please use \`import { SelectElement, TextFieldElement, etc } from '@graphcommerce/ecommerce-ui'\` for usage in forms. https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/ecommerce-ui/components/FormComponents You can add '// eslint-disable-next-line @typescript-eslint/no-restricted-imports' comment if you're sure you want to use it.`,
          },
          {
            name: '@mui/material',
            importNames: ['useMediaQuery'],
            message: `useMediaQuery can cause large CLS/LCP issues when used to render a specific UI on a breakpoint. See https://mui.com/system/display/#hiding-elements for alternatives. You can add '// eslint-disable-next-line @typescript-eslint/no-restricted-imports' comment if you're sure you want to use it.`,
          },
          {
            name: '@emotion/react',
            importNames: ['Theme', 'GlobalProps', 'ThemeContext'],
            message: 'Import from @mui/material instead of @emotion/react.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: { 'import/no-default-export': ['error'] },
    },
    {
      files: ['**/pages/**/*.tsx'],
      rules: { 'import/no-default-export': 'off' },
    },
    {
      files: ['**/*.interceptor.tsx'],
      rules: {
        'import/export': 'off',
        'import/first': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['generated/*'],
      rules: {
        '@typescript-eslint/camelcase': 'off',
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
    },
  ],
}
