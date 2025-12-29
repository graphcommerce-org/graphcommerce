import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { ErrorLink } from '@apollo/client/link/error'

export const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    console.error(
      `[GraphQL errors]: ${error.errors
        .map(({ message, path }) => `${message} ${path?.join(',')}`)
        .join(', ')}`,
    )
  } else if (error) {
    console.error(`[Graphql error]: ${error}`)
  }

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
