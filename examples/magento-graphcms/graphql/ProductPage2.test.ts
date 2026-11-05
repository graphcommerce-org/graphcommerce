import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { FieldNode, OperationDefinitionNode, SelectionSetNode } from 'graphql'
import { Kind, parse } from 'graphql'
import { describe, expect, it } from 'vitest'

const fields = (selectionSet?: SelectionSetNode) =>
  (selectionSet?.selections ?? []).filter((s): s is FieldNode => s.kind === Kind.FIELD)

describe('ProductPage2', () => {
  // `products` and `relatedUpsells` write to one cache field. Without `id` in both, Apollo Client
  // keeps one of the two, and reading the query back misses the related products and reviews.
  it.each(['magento-graphcms', 'magento-open-source', 'magento-storyblok'])(
    '%s requests the id in relatedUpsells',
    (example) => {
      const file = new URL(`../../${example}/graphql/ProductPage2.graphql`, import.meta.url)
      const [query] = parse(readFileSync(fileURLToPath(file), 'utf8'))
        .definitions as OperationDefinitionNode[]

      const relatedUpsells = fields(query.selectionSet).find(
        (field) => field.alias?.value === 'relatedUpsells',
      )
      const items = fields(relatedUpsells?.selectionSet).find((f) => f.name.value === 'items')

      expect(fields(items?.selectionSet).map((field) => field.name.value)).toContain('id')
    },
  )
})
