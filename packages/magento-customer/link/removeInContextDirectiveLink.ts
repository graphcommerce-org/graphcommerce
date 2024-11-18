import {
  ApolloLink,
  NextLink,
  Operation,
  removeArgumentsFromDocument,
  removeDirectivesFromDocument,
} from '@graphcommerce/graphql'

export class RemoveInContextDirectivesLink extends ApolloLink {
  // eslint-disable-next-line class-methods-use-this
  request(operation: Operation, forward?: NextLink) {
    if (!forward) throw new Error('This is not a terminal link!')

    let modifiedQuery = operation.query

    modifiedQuery =
      removeDirectivesFromDocument([{ name: 'inContext' }], modifiedQuery) ?? modifiedQuery
    modifiedQuery =
      removeArgumentsFromDocument([{ name: 'context' }], modifiedQuery) ?? modifiedQuery

    operation.query = modifiedQuery
    return forward(operation)
  }
}
