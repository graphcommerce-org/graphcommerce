import { DocumentNode, print } from 'graphql'

export default function createTabs(queries: DocumentNode[], endpoint: string) {
  return Object.entries(queries)
    .filter(([name]) => name.endsWith('Document'))
    .map(([name, gql]) => ({
      name: name.replace('Document', ''),
      query: print(gql),
      endpoint,
    }))
    .filter(({ query }) => query.includes('@client') === false)
}
