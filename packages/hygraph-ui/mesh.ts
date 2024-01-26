/* eslint-disable import/no-extraneous-dependencies */
import type { Resolvers } from '@graphcommerce/graphql-mesh'
import { parseSelectionSet } from '@graphql-tools/utils'
import { Kind, FieldNode, SelectionSetNode } from 'graphql'

function selectionSetFromPath(path: string[], selectionSet: SelectionSetNode) {
  const [fieldName, ...rest] = path

  const selection = selectionSet.selections.find(
    (s) => s.kind === Kind.FIELD && s.name.value === fieldName,
  ) as FieldNode

  if (!selection.selectionSet) return undefined
  if (rest.length === 0) return selection.selectionSet

  return selectionSetFromPath(rest, selection.selectionSet)
}

function mergeSelectionSetNodes(
  node1: SelectionSetNode | undefined,
  node2: SelectionSetNode | undefined,
): SelectionSetNode {
  const selections = [...(node1?.selections ?? []), ...(node2?.selections ?? [])]

  return {
    kind: Kind.SELECTION_SET,
    selections,
  }
}

export const resolvers: Resolvers = {
  Query: {
    pageContent: async (root, { input }, context, info) => {
      const selectionSet = mergeSelectionSetNodes(
        selectionSetFromPath(['pageContent', 'hygraphPage'], info.operation.selectionSet),
        parseSelectionSet(`{ title metaTitle metaDescription }`, { noLocation: true }),
      )

      const pages = await context.hygraph.Query.pages({
        root,
        args: { where: input },
        context,
        info,
        selectionSet,
      })

      const hygraphPage = pages?.[0]
      if (!hygraphPage) return null

      const { title, metaTitle, metaDescription } = hygraphPage
      return {
        title,
        meta: { title: metaTitle, description: metaDescription },
        hygraphPage,
      }
    },
  },
}
