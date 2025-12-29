import type { ApolloLink as ApolloLinkType } from '@apollo/client'
import { removeDirectivesFromDocument } from '@apollo/client/utilities/internal'
import type { DocumentNode } from 'graphql'
import { visit } from 'graphql'
import { ApolloLink } from '../apollo'

/**
 * Remove arguments from a GraphQL document. This is a replacement for the removed
 * removeArgumentsFromDocument from Apollo Client.
 */
function removeArgumentsFromDocument(
  args: Array<{ name: string }>,
  doc: DocumentNode,
): DocumentNode | null {
  const argNames = new Set(args.map((a) => a.name))

  return visit(doc, {
    Argument(node) {
      if (argNames.has(node.name.value)) {
        return null
      }
      return undefined
    },
    VariableDefinition(node) {
      if (argNames.has(node.variable.name.value)) {
        return null
      }
      return undefined
    },
  })
}

export class RemovePrivateContextDirectivesLink extends ApolloLink {
  // eslint-disable-next-line class-methods-use-this
  request(operation: ApolloLinkType.Operation, forward?: ApolloLinkType.ForwardFunction) {
    if (!forward) throw new Error('This is not a terminal link!')

    let modifiedQuery = operation.query

    modifiedQuery =
      removeDirectivesFromDocument([{ name: 'privateContext' }], modifiedQuery) ?? modifiedQuery
    modifiedQuery =
      removeArgumentsFromDocument([{ name: 'context' }], modifiedQuery) ?? modifiedQuery

    operation.query = modifiedQuery
    return forward(operation)
  }
}
