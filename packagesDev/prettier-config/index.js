module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  proseWrap: 'always',
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80,
      },
    },
  ],
}
