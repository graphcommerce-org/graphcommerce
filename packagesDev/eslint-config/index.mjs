import nextPlugin from '@next/eslint-plugin-next'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Flat configs from plugins
  reactHooksPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  jsxA11yPlugin.flatConfigs.recommended,

  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/.mesh/**',
      '**/generated/**',
      '**/*.interceptor.tsx',
      '**/*.interceptor.ts',
    ],
  },

  // Base config for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
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
        {
          selector: 'TSTypeReference[typeName.name="SxProps"]:not([typeArguments])',
          message: 'SxProps must have Theme parameter to avoid significant compiler slowdown.',
        },
        {
          selector: 'TSTypeReference[typeName.name="Components"]:not([typeArguments])',
          message: 'Components must have Theme parameter to avoid significant compiler slowdown.',
        },
      ],

      // import
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'next.config.js',
            'next.config.ts',
            '**/test/**',
            '**/*.d.ts',
            '**/*.spec.ts',
            '**/__tests__/**',
          ],
        },
      ],
      'import/order': 'off',
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
      'react/self-closing-comp': ['warn'],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

      // react-hooks (base rules come from flat config below, we just customize exhaustive-deps)
      'react-hooks/exhaustive-deps': [
        'error',
        { additionalHooks: '(useIsomorphicLayoutEffect|useMemoDeep)' },
      ],
    },
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
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
          patterns: [
            {
              group: ['*.interceptor'],
              message: 'Importing *.interceptor is NOT allowed',
            },
          ],
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
      'import/no-duplicates': 'off',
    },
  },

  // TSX files - no default export
  {
    files: ['**/*.tsx'],
    rules: { 'import/no-default-export': 'error' },
  },

  // Copy files - relax rules
  {
    files: ['**/copy/**/*.tsx'],
    rules: { 'import/no-extraneous-dependencies': 'off' },
  },

  // Pages - allow default export
  {
    files: ['**/pages/**/*.tsx'],
    rules: { 'import/no-default-export': 'off' },
  },

  // Test files
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/__tests__/**', 'scripts/**', 'test/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    rules: {
      semi: 'off',
    },
  },
]
