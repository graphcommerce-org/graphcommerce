import { defineConfig } from 'oxfmt'

export default defineConfig({
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  proseWrap: 'never',
  sortPackageJson: false,
  ignorePatterns: ['**/dist/**', '**/build/**', '**/generated/**', '**/.storyblok/**', '**/.yarn/**', 'docs/framework/config.md'],
  overrides: [
    { files: ['*.md', '*.mdx'], options: { printWidth: 80, proseWrap: 'always' } },
    { files: ['**/.changeset/*.md', '**/CHANGELOG.md', '**/llm/*.md'], options: { proseWrap: 'never' } },
  ],
})
