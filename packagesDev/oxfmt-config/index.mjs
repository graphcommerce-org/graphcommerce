import { defineConfig } from 'oxfmt'
import classic from './classic.mjs'

export default defineConfig({
  ...classic,
  sortImports: {
    customGroups: [{ groupName: 'graphcommerce', elementNamePattern: ['@graphcommerce/**'] }],
    groups: ['graphcommerce', ['builtin', 'external'], ['parent', 'sibling', 'index'], 'unknown'],
    newlinesBetween: false,
  },
  jsdoc: true,
})
