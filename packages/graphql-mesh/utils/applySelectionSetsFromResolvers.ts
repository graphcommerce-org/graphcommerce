/* eslint-disable import/no-extraneous-dependencies */
import { Resolver, selectionSetByPath, type Resolvers } from '@graphcommerce/graphql-mesh'
import { parseSelectionSet } from '@graphql-tools/utils'
import {
  Kind,
  FieldNode,
  SelectionNode,
  GraphQLResolveInfo,
  GraphQLObjectType,
  responsePathAsArray,
} from 'graphql'

export function applySelectionSetsFromResolvers(info: GraphQLResolveInfo, resolvers: Resolvers) {
  let name: string
  if (info.returnType instanceof GraphQLObjectType) {
    name = info.returnType.name
  } else throw new Error('Could not determine returnType for selection set')

  const selectionSet = selectionSetByPath(
    info.operation.selectionSet,
    responsePathAsArray(info.path).join('.'),
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.entries(resolvers[name]).forEach(([field, resolverValue]) => {
    const resolver = resolverValue as Resolver<unknown>

    const idx = selectionSet.selections.findIndex(
      (selection) => selection.kind === Kind.FIELD && selection.name.value === field,
    )

    const currentSelectionSet = selectionSet.selections.find(
      (selection) => selection.kind === Kind.FIELD && selection.name.value === field,
    ) as FieldNode | undefined

    let replaceWith: readonly SelectionNode[] = []

    if ('selectionSet' in resolver) {
      if (typeof resolver.selectionSet === 'function' && currentSelectionSet) {
        replaceWith = resolver.selectionSet(currentSelectionSet).selections
      }
      if (typeof resolver.selectionSet === 'string') {
        replaceWith = parseSelectionSet(resolver.selectionSet).selections
      }
    }

    selectionSet.selections = [
      ...selectionSet.selections.slice(0, idx),
      ...replaceWith,
      ...selectionSet.selections.slice(idx + 1),
    ]
  })

  return selectionSet
}
