import { fileURLToPath } from 'node:url'
import { defineConfig } from 'oxlint'

export default defineConfig({
  jsPlugins: [fileURLToPath(new URL('./plugin.mjs', import.meta.url))],
  plugins: ['react', 'import', 'jsx-a11y', 'nextjs'],
  categories: {
    correctness: 'off',
  },
  env: {
    builtin: true,
    browser: true,
    es2024: true,
    node: true,
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/.mesh/**',
    '**/generated/**',
    '**/*.interceptor.tsx',
    '**/*.interceptor.ts',
  ],
  rules: {
    'import/namespace': 'error',
    'import/default': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-duplicates': 'warn',
    'react/display-name': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
        canvas: ['img'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onError',
          'onLoad',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
        alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
        body: ['onError', 'onLoad'],
        dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
        iframe: ['onError', 'onLoad'],
        img: ['onError', 'onLoad'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'menuitemradio', 'menuitemcheckbox', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
        fieldset: ['radiogroup', 'presentation'],
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: [],
        roles: ['tabpanel'],
        allowExpressionValues: true,
      },
    ],
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        allowExpressionValues: true,
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename', '__type', '_N_X', '_N_Y', '__N', '__NEXT'],
      },
    ],
    'react/jsx-no-useless-fragment': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'react/self-closing-comp': ['warn'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
      },
    ],
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(useIsomorphicLayoutEffect|useMemoDeep)',
      },
    ],
    'react/static-components': 'error',
    'react/use-memo': 'error',
    'react/preserve-manual-memoization': 'error',
    'react/incompatible-library': 'warn',
    'react/immutability': 'error',
    'react/globals': 'error',
    'react/refs': 'error',
    'react/set-state-in-effect': 'error',
    'react/error-boundaries': 'error',
    'react/purity': 'error',
    'react/set-state-in-render': 'error',
    'react/unsupported-syntax': 'warn',
    'graphcommerce/no-restricted-syntax': [
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
    'graphcommerce/no-extraneous-dependencies': 'error',
    'graphcommerce/no-relative-packages': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-array-constructor': 'error',
        'no-unused-expressions': 'error',
        'no-unused-vars': 'error',
        'import/no-duplicates': 'off',
        'no-restricted-imports': [
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
                message:
                  "Please use `import { SelectElement, TextFieldElement, etc } from '@graphcommerce/ecommerce-ui'` for usage in forms. https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/ecommerce-ui/components/FormComponents You can add '// eslint-disable-next-line @typescript-eslint/no-restricted-imports' comment if you're sure you want to use it.",
              },
              {
                name: '@mui/material',
                importNames: ['useMediaQuery'],
                message:
                  "useMediaQuery can cause large CLS/LCP issues when used to render a specific UI on a breakpoint. See https://mui.com/system/display/#hiding-elements for alternatives. You can add '// eslint-disable-next-line @typescript-eslint/no-restricted-imports' comment if you're sure you want to use it.",
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
        'typescript/ban-ts-comment': 'error',
        'typescript/no-duplicate-enum-values': 'error',
        'typescript/no-empty-object-type': 'error',
        'typescript/no-explicit-any': 'error',
        'typescript/no-extra-non-null-assertion': 'error',
        'typescript/no-misused-new': 'error',
        'typescript/no-namespace': 'error',
        'typescript/no-non-null-asserted-optional-chain': 'error',
        'typescript/no-require-imports': 'error',
        'typescript/no-this-alias': 'error',
        'typescript/no-unnecessary-type-constraint': 'error',
        'typescript/no-unsafe-declaration-merging': 'error',
        'typescript/no-unsafe-function-type': 'error',
        'typescript/no-wrapper-object-types': 'error',
        'typescript/prefer-as-const': 'error',
        'typescript/prefer-namespace-keyword': 'error',
        'typescript/triple-slash-reference': 'error',
        'typescript/explicit-function-return-type': 'off',
        'typescript/no-unsafe-assignment': 'off',
        'typescript/no-unsafe-call': 'off',
        'typescript/no-unsafe-member-access': 'off',
        'typescript/no-unsafe-return': 'off',
        'typescript/restrict-template-expressions': 'off',
        'typescript/explicit-module-boundary-types': 'off',
        'typescript/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
        'typescript/consistent-type-imports': 'warn',
      },
      plugins: ['typescript'],
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'import/no-default-export': 'error',
      },
    },
    {
      files: ['**/pages/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: [
        'next.config.js',
        'next.config.ts',
        '**/test/**',
        '**/*.d.ts',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/__tests__/**',
      ],
      rules: {
        'graphcommerce/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/__tests__/**', 'scripts/**', 'test/**'],
      env: {
        jest: true,
      },
      rules: {
        'graphcommerce/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/copy/**/*.tsx'],
      rules: {
        'graphcommerce/no-extraneous-dependencies': 'off',
      },
    },
  ],
})
