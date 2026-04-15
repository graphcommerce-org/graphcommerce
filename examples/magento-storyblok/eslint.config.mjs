import graphcommerceConfig from '@graphcommerce/eslint-config-pwa'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...graphcommerceConfig,
  {
    rules: {
      'no-underscore-dangle': ['error', { allow: ['_uid', '_editable'] }],
    },
  },
]
