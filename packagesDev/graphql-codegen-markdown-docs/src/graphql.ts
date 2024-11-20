import {
  type ListTypeNode,
  type NonNullTypeNode,
  type NamedTypeNode,
  type TypeNode,
  type ObjectTypeDefinitionNode,
  Kind,
} from 'graphql'

export const isListType = (typ?: TypeNode): typ is ListTypeNode => typ?.kind === Kind.LIST_TYPE
export const isNonNullType = (typ?: TypeNode): typ is NonNullTypeNode =>
  typ?.kind === Kind.NON_NULL_TYPE
export const isNamedType = (typ?: TypeNode): typ is NamedTypeNode => typ?.kind === Kind.NAMED_TYPE

export const isInput = (kind: string) => kind.includes('Input')

type ObjectTypeDefinitionFn = (node: ObjectTypeDefinitionNode) => unknown

export const ObjectTypeDefinitionBuilder = (
  useObjectTypes: boolean | undefined,
  callback: ObjectTypeDefinitionFn,
): ObjectTypeDefinitionFn | undefined => {
  if (!useObjectTypes) return undefined
  return (node) => {
    if (/^(Query|Mutation|Subscription)$/.test(node.name.value)) {
      return undefined
    }
    return callback(node)
  }
}
