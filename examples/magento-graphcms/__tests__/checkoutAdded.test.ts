import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

describe('pages/checkout/added', () => {
  // A scrolling focus() puts the overlay in its open position before OverlayBase animates it.
  it.each(['magento-graphcms', 'magento-open-source', 'magento-storyblok'])(
    '%s focuses the heading without a scroll',
    (example) => {
      const file = fileURLToPath(
        new URL(`../../${example}/pages/checkout/added.tsx`, import.meta.url),
      )
      const source = ts.createSourceFile(
        file,
        readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      )

      const focusOptions: (string | undefined)[] = []
      const visit = (node: ts.Node) => {
        if (
          ts.isCallExpression(node) &&
          ts.isPropertyAccessExpression(node.expression) &&
          node.expression.name.text === 'focus'
        )
          focusOptions.push(node.arguments[0]?.getText(source))
        ts.forEachChild(node, visit)
      }
      visit(source)

      expect(focusOptions).toEqual(['{ preventScroll: true }'])
    },
  )
})
