import graphcommerceConfig from '@graphcommerce/eslint-config-pwa'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...graphcommerceConfig,
  {
    // Next.js App Router requires default exports for pages, layouts, etc.
    files: ['app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
