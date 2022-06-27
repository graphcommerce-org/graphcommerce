import { onError } from '@apollo/client/link/error'

export const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors)
    console.error(
      `[GraphQL errors]: ${graphQLErrors
        .map(({ message, path }) => `${message} ${path?.join(',')}`)
        .join(', ')}`,
    )

  if (networkError)
    console.error(`[Graphql error]: ${networkError}`)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ;(async () => {
    const graphql = await import('graphql')

    const gqlString = graphql
      .print(operation.query)
      .toString()
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/\s\s+/g, ' ')

    console.error(`[GraphQL operation]: ${gqlString}`)
    console.error(`[GraphQL variables]: ${JSON.stringify(operation.variables)}`)
  })()
})
