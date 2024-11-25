module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  proseWrap: 'never',
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: ['**/.changeset/*.md', '**/CHANGELOG.md'],
      options: {
        proseWrap: 'never',
      },
    },
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrder: ['^@graphcommerce/(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
