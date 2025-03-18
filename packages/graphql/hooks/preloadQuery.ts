export function preloadQuery<TData, TVariables extends OperationVariables>(
  client: ApolloClient<NormalizedCacheObject>,
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
) {
  return client.query({ query })
}
