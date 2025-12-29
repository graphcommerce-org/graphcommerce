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
        importOrder: [],
      },
    },
    {
      files: ['**/.changeset/*.md', '**/CHANGELOG.md', '**/llm/*.md'],
      options: {
        proseWrap: 'never',
        importOrder: [],
      },
    },
  ],
  importOrder: ['^@graphcommerce/(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-jsdoc'),
  ],
}
